#!/usr/bin/env node
/**
 * ChanonaTKD - Validador del directorio de alumnos
 *
 * Revisa que data/alumnos.json conserve la estructura necesaria para la página
 * y que las fechas de renovación no estén vacías ni contengan información de pago.
 *
 * Uso:
 *   node scripts/validate-students.js
 *
 * Comparación administrativa estricta (ideal para PR):
 *   node scripts/validate-students.js --compare <archivo_base.json>
 *
 * Al comparar, solo permite modificar el campo `suscripcion_activa` de registros
 * ya existentes; cualquier cambio de nombre, plan, objetivo o alumno falla.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CURRENT_PATH = path.join(ROOT, 'data', 'alumnos.json');
const REQUIRED_FIELDS = ['nombre', 'plan', 'plan_activo', 'suscripcion_activa', 'objetivo_proximo'];
const ALLOWED_FIELDS = new Set([...REQUIRED_FIELDS, 'alumno_desde']);
const RENEWAL_PROHIBITED = [
  { label: 'monto', regex: /(?:\$|mxn|usd|eur|pesos?|d[oó]lares?)/i },
  { label: 'cuenta bancaria o CLABE', regex: /(?:clabe|cuenta\s+bancaria|transferencia|banco)/i },
  { label: 'enlace o medio de pago', regex: /(?:paypal|https?:\/\/)/i },
  { label: 'teléfono o WhatsApp', regex: /(?:whats?app|tel[eé]fono|\+?52\s*)?(?:\d[\s-]?){10,}/i }
];

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`ERROR: No se pudo leer ${label}: ${error.message}`);
    process.exit(2);
  }
}

function isText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function error(errors, location, message) {
  errors.push(`${location}: ${message}`);
}

function validateCurrentDirectory(students, errors) {
  if (!students || typeof students !== 'object' || Array.isArray(students)) {
    error(errors, '$', 'data/alumnos.json debe ser un objeto de alumnos.');
    return;
  }

  const seenPlans = new Map();
  Object.entries(students).forEach(([studentId, student]) => {
    const location = `$.${studentId}`;
    if (!/^[a-z0-9_]+$/.test(studentId)) {
      error(errors, location, 'la clave debe contener solo minúsculas, números y guiones bajos.');
    }
    if (!student || typeof student !== 'object' || Array.isArray(student)) {
      error(errors, location, 'el registro debe ser un objeto.');
      return;
    }

    REQUIRED_FIELDS.forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(student, field)) {
        error(errors, location, `falta el campo obligatorio "${field}".`);
      } else if (!isText(student[field])) {
        error(errors, `${location}.${field}`, 'debe ser texto no vacío.');
      }
    });

    Object.keys(student).forEach((field) => {
      if (!ALLOWED_FIELDS.has(field)) {
        error(errors, `${location}.${field}`, 'campo no reconocido; revisar antes de publicar.');
      }
    });

    if (isText(student.plan)) {
      if (!/^plan_[a-z0-9_]+\.json$/.test(student.plan)) {
        error(errors, `${location}.plan`, 'debe apuntar a un archivo con formato plan_nombre.json.');
      }
      if (seenPlans.has(student.plan)) {
        error(errors, `${location}.plan`, `el mismo plan ya está asignado a ${seenPlans.get(student.plan)}.`);
      } else {
        seenPlans.set(student.plan, studentId);
      }
    }

    if (isText(student.suscripcion_activa)) {
      RENEWAL_PROHIBITED.forEach(({ label, regex }) => {
        if (regex.test(student.suscripcion_activa)) {
          error(errors, `${location}.suscripcion_activa`, `no debe contener ${label}; solo estado o próxima fecha de renovación.`);
        }
      });
    }
  });
}

function validateOnlyRenewalsChanged(base, current, errors) {
  const baseIds = Object.keys(base).sort();
  const currentIds = Object.keys(current).sort();
  if (JSON.stringify(baseIds) !== JSON.stringify(currentIds)) {
    error(errors, '$', 'en una actualización administrativa de renovación no se permite agregar ni eliminar alumnos.');
    return;
  }

  currentIds.forEach((studentId) => {
    const before = base[studentId];
    const after = current[studentId];
    if (!before || !after) return;

    const allFields = new Set([...Object.keys(before), ...Object.keys(after)]);
    allFields.forEach((field) => {
      if (field === 'suscripcion_activa') return;
      if (JSON.stringify(before[field]) !== JSON.stringify(after[field])) {
        error(errors, `$.${studentId}.${field}`, 'no se puede modificar durante una actualización exclusiva de renovaciones.');
      }
    });
  });
}

function main() {
  const args = process.argv.slice(2);
  let basePath = null;
  if (args.length > 0) {
    if (args.length !== 2 || args[0] !== '--compare') {
      console.error('Uso: node scripts/validate-students.js [--compare <archivo_base.json>]');
      process.exit(2);
    }
    basePath = path.resolve(ROOT, args[1]);
  }

  const current = readJson(CURRENT_PATH, 'data/alumnos.json');
  const errors = [];
  validateCurrentDirectory(current, errors);

  if (basePath) {
    const base = readJson(basePath, args[1]);
    validateOnlyRenewalsChanged(base, current, errors);
  }

  console.log(`\nValidación del directorio ChanonaTKD: data/alumnos.json`);
  console.log(`Alumnos revisados: ${Object.keys(current).length}`);

  if (errors.length > 0) {
    console.error('\nVALIDACIÓN FALLIDA:');
    errors.forEach((item) => console.error(`- ${item}`));
    console.error(`\nResultado: ${errors.length} error(es).`);
    process.exit(1);
  }

  if (basePath) {
    console.log('VALIDACIÓN APROBADA: estructura correcta y únicamente se modificaron renovaciones.');
  } else {
    console.log('VALIDACIÓN APROBADA: estructura del directorio correcta.');
  }
}

main();
