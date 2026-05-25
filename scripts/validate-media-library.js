#!/usr/bin/env node
/**
 * ChanonaTKD - Validador de incorporaciones a la biblioteca de medios
 *
 * Revisa que los archivos listados en `approved_additions_files`:
 * - tengan estructura válida;
 * - no reutilicen URLs ni IDs de Drive ya activos;
 * - no repitan títulos exactos activos o dentro de la misma carga;
 * - mantengan tipos y secciones permitidas;
 * - no usen URLs históricas bloqueadas.
 *
 * Este script NO modifica archivos ni planes.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ALLOWED_TYPES = new Set(['video', 'audio', 'folder']);
const ALLOWED_SECTIONS = new Set(['chanonaflex', 'isometrico', 'pateoTecnico', 'poomsae']);
const REQUIRED_ADDITION_FIELDS = [
  'title', 'media_type', 'default_section', 'recommended_level',
  'related_technique', 'technical_objective', 'recommended_usage',
  'url', 'is_replacement', 'approval_status'
];

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(2);
}

function readJson(relativePath) {
  const fullPath = path.resolve(ROOT, relativePath);
  try {
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  } catch (error) {
    fail(`No se pudo leer JSON en ${relativePath}: ${error.message}`);
  }
}

function isText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function normalizeTitle(value) {
  return value.trim().toLocaleLowerCase('es-MX');
}

function driveId(url) {
  const fileMatch = /drive\.google\.com\/file\/d\/([^/]+)/.exec(url);
  if (fileMatch) return fileMatch[1];
  const openMatch = /drive\.google\.com\/open\?[^#]*\bid=([^&]+)/.exec(url);
  if (openMatch) return openMatch[1];
  return null;
}

function mediaIdentity(url) {
  return driveId(url) || url.trim();
}

function removeUrlRecords(recordsByIdentity, url) {
  recordsByIdentity.delete(mediaIdentity(url));
}

function addRecord(recordsByIdentity, titleRecords, resource, source, override = false) {
  const identity = mediaIdentity(resource.url);
  if (override) {
    const previous = recordsByIdentity.get(identity);
    if (previous) titleRecords.delete(normalizeTitle(previous.title));
    recordsByIdentity.delete(identity);
  }
  recordsByIdentity.set(identity, { title: resource.title, url: resource.url, source });
  titleRecords.set(normalizeTitle(resource.title), { title: resource.title, url: resource.url, source });
}

function buildExistingActiveLibrary(base, review) {
  const byIdentity = new Map();
  const byTitle = new Map();
  const blockedIdentities = new Set();

  Object.values(base.categories_provided_by_bryan || {}).forEach((category) => {
    (category.items || []).forEach(([title, url]) => {
      addRecord(byIdentity, byTitle, { title, url }, 'data/media-library.json');
    });
  });

  (review.decisions || []).forEach((decision) => {
    const resources = decision.canonical_resources || (decision.canonical_resource ? [decision.canonical_resource] : []);
    resources.forEach((resource) => addRecord(byIdentity, byTitle, resource, 'data/media-library-review.json', true));
    (decision.historical_urls_blocked_for_automatic_assignment || []).forEach((url) => {
      const identity = mediaIdentity(url);
      blockedIdentities.add(identity);
      removeUrlRecords(byIdentity, url);
    });
  });

  (review.approved_resources_previously_pending || []).forEach((resource) => {
    addRecord(byIdentity, byTitle, resource, 'data/media-library-review.json', true);
  });

  return { byIdentity, byTitle, blockedIdentities };
}

function validateAdditionFile(relativePath, active, errors) {
  const addition = readJson(relativePath);
  if (!Array.isArray(addition.resources) || addition.resources.length === 0) {
    errors.push(`${relativePath}: debe contener un array resources con al menos un recurso.`);
    return 0;
  }

  const newByIdentity = new Map();
  const newByTitle = new Map();

  addition.resources.forEach((resource, index) => {
    const location = `${relativePath}.resources[${index}]`;
    if (!resource || typeof resource !== 'object' || Array.isArray(resource)) {
      errors.push(`${location}: debe ser un objeto.`);
      return;
    }

    REQUIRED_ADDITION_FIELDS.forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(resource, field)) {
        errors.push(`${location}: falta el campo obligatorio "${field}".`);
      }
    });

    ['title', 'media_type', 'default_section', 'recommended_level', 'related_technique', 'technical_objective', 'recommended_usage', 'url', 'approval_status'].forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(resource, field) && !isText(resource[field])) {
        errors.push(`${location}.${field}: debe ser texto no vacío.`);
      }
    });
    if (typeof resource.is_replacement !== 'boolean') {
      errors.push(`${location}.is_replacement: debe ser true o false.`);
    }
    if (resource.title !== resource.title.trim()) {
      errors.push(`${location}.title: contiene espacios al inicio o final; limpiar el título antes de aprobar.`);
    }
    if (!ALLOWED_TYPES.has(resource.media_type)) {
      errors.push(`${location}.media_type: tipo no permitido. Usar video, audio o folder.`);
    }
    if (!ALLOWED_SECTIONS.has(resource.default_section)) {
      errors.push(`${location}.default_section: sección no permitida.`);
    }
    if (resource.media_type === 'audio' && resource.default_section !== 'poomsae') {
      errors.push(`${location}: los audios deben asignarse solamente a poomsae.`);
    }
    if (!isText(resource.title) || !isText(resource.url)) return;

    const identity = mediaIdentity(resource.url);
    const normalizedTitle = normalizeTitle(resource.title);
    const oldIdentity = active.byIdentity.get(identity);
    const oldTitle = active.byTitle.get(normalizedTitle);
    const newIdentity = newByIdentity.get(identity);
    const newTitle = newByTitle.get(normalizedTitle);

    if (active.blockedIdentities.has(identity)) {
      errors.push(`${location}.url: intenta reutilizar una URL o ID de Drive previamente bloqueado.`);
    }
    if (oldIdentity && !resource.is_replacement) {
      errors.push(`${location}.url: el enlace o archivo de Drive ya existe en el banco activo como "${oldIdentity.title}".`);
    }
    if (oldTitle && !resource.is_replacement) {
      errors.push(`${location}.title: el título ya existe en el banco activo con la URL ${oldTitle.url}.`);
    }
    if (newIdentity) {
      errors.push(`${location}.url: duplicado dentro de la carga; ya fue usado por "${newIdentity.title}".`);
    }
    if (newTitle) {
      errors.push(`${location}.title: título duplicado dentro de la carga; ya fue usado en otro recurso.`);
    }

    newByIdentity.set(identity, resource);
    newByTitle.set(normalizedTitle, resource);
  });

  return addition.resources.length;
}

function main() {
  const base = readJson('data/media-library.json');
  const review = readJson('data/media-library-review.json');
  const additionFiles = review.approved_additions_files || [];
  const errors = [];
  const active = buildExistingActiveLibrary(base, review);
  let additionsCount = 0;

  if (!Array.isArray(additionFiles) || additionFiles.length === 0) {
    errors.push('data/media-library-review.json: no hay approved_additions_files para validar.');
  } else {
    additionFiles.forEach((relativePath) => {
      additionsCount += validateAdditionFile(relativePath, active, errors);
    });
  }

  console.log('\nValidación de biblioteca ChanonaTKD');
  console.log(`Recursos nuevos revisados: ${additionsCount}`);
  console.log(`URLs/IDs históricos bloqueados: ${active.blockedIdentities.size}`);

  if (errors.length > 0) {
    console.error('\nVALIDACIÓN FALLIDA:');
    errors.forEach((error) => console.error(`- ${error}`));
    console.error(`\nResultado: ${errors.length} error(es).`);
    process.exit(1);
  }

  console.log('VALIDACIÓN APROBADA: no hay títulos exactos ni URLs duplicadas en la incorporación.');
}

main();
