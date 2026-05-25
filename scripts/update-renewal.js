#!/usr/bin/env node
/**
 * ChanonaTKD - Actualizador controlado de renovaciones
 *
 * Modifica UNICAMENTE `suscripcion_activa` del alumno indicado en
 * `data/alumnos.json`, conservando el resto del archivo sin re-formatearlo.
 *
 * Uso seguro:
 *   node scripts/update-renewal.js <clave_alumno> <AAAA-MM-DD> --dry-run
 *   node scripts/update-renewal.js <clave_alumno> <AAAA-MM-DD>
 *
 * Ejemplo:
 *   node scripts/update-renewal.js patricio_leigh 2026-06-21 --dry-run
 *
 * La fecha se guarda como:
 *   Próxima renovación 21 de junio de 2026
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ALUMNOS_PATH = path.join(ROOT, 'data', 'alumnos.json');
const MONTHS_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

function stop(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function readJson(raw, fileLabel) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    stop(`El archivo ${fileLabel} no contiene JSON válido: ${error.message}`);
  }
}

function parseIsoDate(dateText) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateText);
  if (!match) stop('La fecha debe escribirse en formato AAAA-MM-DD, por ejemplo 2026-06-21.');

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    year < 2020 || year > 2100 ||
    month < 1 || month > 12 ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    stop(`La fecha "${dateText}" no es válida.`);
  }

  return { year, month, day };
}

function formatRenewal({ year, month, day }) {
  return `Próxima renovación ${day} de ${MONTHS_ES[month - 1]} de ${year}`;
}

function findObjectEnd(raw, openBraceIndex) {
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = openBraceIndex; index < raw.length; index += 1) {
    const character = raw[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (character === '\\') {
        escaped = true;
      } else if (character === '"') {
        inString = false;
      }
      continue;
    }

    if (character === '"') {
      inString = true;
    } else if (character === '{') {
      depth += 1;
    } else if (character === '}') {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  stop('No se pudo localizar correctamente el bloque del alumno en data/alumnos.json.');
}

function changeOnlyRenewal(originalData, changedData, studentId) {
  const beforeWithoutRenewal = JSON.parse(JSON.stringify(originalData));
  const afterWithoutRenewal = JSON.parse(JSON.stringify(changedData));
  delete beforeWithoutRenewal[studentId].suscripcion_activa;
  delete afterWithoutRenewal[studentId].suscripcion_activa;

  return JSON.stringify(beforeWithoutRenewal) === JSON.stringify(afterWithoutRenewal);
}

function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  const cleanArgs = args.filter((arg) => arg !== '--dry-run');

  if (cleanArgs.length !== 2) {
    console.error('Uso: node scripts/update-renewal.js <clave_alumno> <AAAA-MM-DD> [--dry-run]');
    process.exit(2);
  }

  const [studentId, isoDate] = cleanArgs;
  if (!/^[a-z0-9_]+$/.test(studentId)) {
    stop('La clave del alumno contiene caracteres no permitidos. Usa la clave exacta de data/alumnos.json.');
  }

  const date = parseIsoDate(isoDate);
  const newRenewal = formatRenewal(date);
  const originalRaw = fs.readFileSync(ALUMNOS_PATH, 'utf8');
  const originalData = readJson(originalRaw, 'data/alumnos.json');
  const student = originalData[studentId];

  if (!student) {
    const suggestions = Object.keys(originalData)
      .filter((key) => key.includes(studentId) || studentId.includes(key))
      .slice(0, 5);
    const hint = suggestions.length ? ` Posibles coincidencias: ${suggestions.join(', ')}.` : '';
    stop(`No existe el alumno con clave "${studentId}".${hint}`);
  }

  const previousRenewal = student.suscripcion_activa;
  if (typeof previousRenewal !== 'string') {
    stop(`El alumno "${studentId}" no tiene un campo suscripcion_activa válido.`);
  }

  const keyNeedle = `${JSON.stringify(studentId)}:`;
  const keyIndex = originalRaw.indexOf(keyNeedle);
  if (keyIndex === -1) stop(`No se pudo localizar el bloque textual de "${studentId}".`);

  const openBraceIndex = originalRaw.indexOf('{', keyIndex + keyNeedle.length);
  if (openBraceIndex === -1) stop(`No se pudo localizar el inicio del registro de "${studentId}".`);
  const closeBraceIndex = findObjectEnd(originalRaw, openBraceIndex);
  const studentBlock = originalRaw.slice(openBraceIndex, closeBraceIndex + 1);
  const fieldPattern = /(\"suscripcion_activa\"\s*:\s*)\"(?:[^\"\\]|\\.)*\"/;

  if (!fieldPattern.test(studentBlock)) {
    stop(`No se pudo localizar suscripcion_activa en el registro de "${studentId}".`);
  }

  const changedStudentBlock = studentBlock.replace(fieldPattern, `$1${JSON.stringify(newRenewal)}`);
  const changedRaw = originalRaw.slice(0, openBraceIndex) + changedStudentBlock + originalRaw.slice(closeBraceIndex + 1);
  const changedData = readJson(changedRaw, 'data/alumnos.json actualizado');

  if (!changeOnlyRenewal(originalData, changedData, studentId)) {
    stop('La operación intentó modificar otro contenido además de suscripcion_activa. No se guardó ningún cambio.');
  }

  console.log('Actualización de renovación preparada:');
  console.log(`- Alumno: ${student.nombre} (${studentId})`);
  console.log(`- Anterior: ${previousRenewal}`);
  console.log(`- Nuevo: ${newRenewal}`);

  if (previousRenewal === newRenewal) {
    console.log('- Resultado: la fecha ya estaba registrada; no hay cambios que guardar.');
    return;
  }

  if (isDryRun) {
    console.log('- Resultado: modo prueba; no se modificó data/alumnos.json.');
    return;
  }

  fs.writeFileSync(ALUMNOS_PATH, changedRaw, 'utf8');
  console.log('- Resultado: data/alumnos.json actualizado. Revisa el diff y ejecuta validate-students.js antes de publicar.');
}

main();
