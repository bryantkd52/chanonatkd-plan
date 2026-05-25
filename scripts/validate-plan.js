#!/usr/bin/env node
/**
 * ChanonaTKD Plan Validator
 *
 * Valida planes nuevos o modificados antes de publicarlos.
 * Uso:
 *   node scripts/validate-plan.js data/planes/plan_alumno.json
 *
 * Este script no modifica archivos. Solo reporta errores y advertencias.
 * Lee:
 *   - data/media-library.json          (catálogo base entregado por Bryan)
 *   - data/media-library-review.json   (correcciones y aprobaciones oficiales)
 *   - schemas/training-plan.schema.json (contrato documental del formato)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REQUIRED_PLAN_KEYS = [
  'updated_at', 'nivel', 'ciclo', 'enfoque_corto', 'enfoque',
  'chanonaflexDias', 'chanonaflex', 'isometricoDias', 'isometrico',
  'pateoDias', 'pateoTecnico', 'poomsaeDias', 'poomsae',
  'apuntes', 'notasFinales'
];
const OPTIONAL_PLAN_KEYS = ['extras'];
const RESOURCE_SECTIONS = ['chanonaflex', 'isometrico', 'pateoTecnico', 'poomsae', 'extras'];
const TEXT_ARRAY_KEYS = ['apuntes', 'notasFinales'];
const RESOURCE_REQUIRED_KEYS = ['titulo', 'tipo', 'url'];
const RESOURCE_OPTIONAL_KEYS = ['dia', 'enfoque', 'reps', 'tags'];
const ALLOWED_TYPES = new Set(['video', 'audio', 'folder']);

const SENSITIVE_PATTERNS = [
  { label: 'correo electrónico', regex: /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/i },
  { label: 'teléfono o WhatsApp', regex: /(?:whats?app|tel[eé]fono|\+?52\s*)?(?:\d[\s-]?){10,}/i },
  { label: 'pago o datos bancarios', regex: /\b(?:pago|clabe|transferencia|paypal|tarjeta|banco)\b/i },
  { label: 'suscripción o renovación', regex: /\b(?:suscripci[oó]n|renovaci[oó]n|mensualidad)\b/i },
  { label: 'dato médico identificable', regex: /\b(?:diagn[oó]stico|cirug[ií]a|postoperatori[oa]|operad[oa]|reconstrucci[oó]n\s+de\s+lca|ligamento\s+cruzado|menisco)\b/i }
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

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function resourceKey(title, url, mediaType) {
  return `${title}\u0000${url}\u0000${mediaType}`;
}

function pushError(errors, location, message) {
  errors.push(`${location}: ${message}`);
}

function walkStrings(value, location, visit) {
  if (typeof value === 'string') {
    visit(value, location);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkStrings(item, `${location}[${index}]`, visit));
    return;
  }
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, nested]) => walkStrings(nested, `${location}.${key}`, visit));
  }
}

function buildMediaPolicy() {
  const base = readJson('data/media-library.json');
  const review = readJson('data/media-library-review.json');
  const allowedResources = new Set();
  const resourcesByUrl = new Map();
  const blockedUrls = new Set();

  function removeUrlRegistrations(url) {
    const previous = resourcesByUrl.get(url) || [];
    previous.forEach((resource) => allowedResources.delete(resourceKey(resource.title, url, resource.mediaType)));
    resourcesByUrl.delete(url);
  }

  function addAllowed(title, url, mediaType, canonicalOverride = false) {
    if (canonicalOverride) removeUrlRegistrations(url);
    const registered = resourcesByUrl.get(url) || [];
    if (!registered.some((item) => item.title === title && item.mediaType === mediaType)) {
      registered.push({ title, mediaType });
      resourcesByUrl.set(url, registered);
    }
    allowedResources.add(resourceKey(title, url, mediaType));
  }

  Object.values(base.categories_provided_by_bryan || {}).forEach((category) => {
    (category.items || []).forEach(([title, url]) => addAllowed(title, url, category.media_type));
  });

  (review.decisions || []).forEach((decision) => {
    const resources = decision.canonical_resources || (decision.canonical_resource ? [decision.canonical_resource] : []);
    resources.forEach((resource) => addAllowed(resource.title, resource.url, resource.media_type, true));
    (decision.historical_urls_blocked_for_automatic_assignment || []).forEach((url) => blockedUrls.add(url));
  });

  (review.approved_resources_previously_pending || []).forEach((resource) => {
    addAllowed(resource.title, resource.url, resource.media_type, true);
  });

  blockedUrls.forEach((url) => removeUrlRegistrations(url));

  return { allowedResources, resourcesByUrl, blockedUrls };
}

function validateTopLevel(plan, errors) {
  if (!plan || typeof plan !== 'object' || Array.isArray(plan)) {
    pushError(errors, '$', 'el plan debe ser un objeto JSON.');
    return;
  }

  REQUIRED_PLAN_KEYS.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(plan, key)) {
      pushError(errors, '$', `falta la llave obligatoria "${key}".`);
    }
  });

  Object.keys(plan).forEach((key) => {
    if (!REQUIRED_PLAN_KEYS.includes(key) && !OPTIONAL_PLAN_KEYS.includes(key)) {
      pushError(errors, `$.${key}`, 'llave no reconocida por el contrato del plan.');
    }
  });

  ['updated_at', 'nivel', 'ciclo', 'enfoque_corto', 'enfoque', 'chanonaflexDias', 'isometricoDias', 'pateoDias', 'poomsaeDias'].forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(plan, key) && !isNonEmptyString(plan[key])) {
      pushError(errors, `$.${key}`, 'debe ser un texto no vacío.');
    }
  });

  [...RESOURCE_SECTIONS, ...TEXT_ARRAY_KEYS].forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(plan, key) && !Array.isArray(plan[key])) {
      pushError(errors, `$.${key}`, 'debe ser un array.');
    }
  });

  TEXT_ARRAY_KEYS.forEach((key) => {
    if (!Array.isArray(plan[key])) return;
    plan[key].forEach((item, index) => {
      if (!isNonEmptyString(item)) {
        pushError(errors, `$.${key}[${index}]`, 'debe ser un texto no vacío; no usar strings vacíos.');
      }
    });
  });
}

function validateResource(resource, section, index, mediaPolicy, errors) {
  const location = `$.${section}[${index}]`;
  if (!resource || typeof resource !== 'object' || Array.isArray(resource) || Object.keys(resource).length === 0) {
    pushError(errors, location, 'debe ser un objeto de recurso completo; no usar objetos vacíos.');
    return;
  }

  RESOURCE_REQUIRED_KEYS.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(resource, key)) {
      pushError(errors, location, `falta la llave obligatoria "${key}".`);
    } else if (!isNonEmptyString(resource[key])) {
      pushError(errors, `${location}.${key}`, 'debe ser un texto no vacío.');
    }
  });

  Object.keys(resource).forEach((key) => {
    if (!RESOURCE_REQUIRED_KEYS.includes(key) && !RESOURCE_OPTIONAL_KEYS.includes(key)) {
      pushError(errors, `${location}.${key}`, 'llave de recurso no reconocida.');
    }
  });

  ['dia', 'enfoque', 'reps'].forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(resource, key) && !isNonEmptyString(resource[key])) {
      pushError(errors, `${location}.${key}`, 'debe ser un texto no vacío cuando se incluye.');
    }
  });

  if (Object.prototype.hasOwnProperty.call(resource, 'tags')) {
    if (!Array.isArray(resource.tags)) {
      pushError(errors, `${location}.tags`, 'debe ser un array.');
    } else {
      resource.tags.forEach((tag, tagIndex) => {
        if (!isNonEmptyString(tag)) pushError(errors, `${location}.tags[${tagIndex}]`, 'debe ser texto no vacío.');
      });
    }
  }

  if (isNonEmptyString(resource.tipo) && !ALLOWED_TYPES.has(resource.tipo)) {
    pushError(errors, `${location}.tipo`, `tipo "${resource.tipo}" no permitido. Usar video, audio o folder.`);
  }

  if (!isNonEmptyString(resource.url) || !isNonEmptyString(resource.titulo) || !isNonEmptyString(resource.tipo)) return;

  if (mediaPolicy.blockedUrls.has(resource.url)) {
    pushError(errors, `${location}.url`, 'URL histórica bloqueada; existe una versión canónica aprobada por Bryan.');
    return;
  }

  const registeredForUrl = mediaPolicy.resourcesByUrl.get(resource.url);
  if (!registeredForUrl) {
    pushError(errors, `${location}.url`, 'URL no autorizada en la biblioteca oficial/revisión aprobada.');
    return;
  }

  if (!mediaPolicy.allowedResources.has(resourceKey(resource.titulo, resource.url, resource.tipo))) {
    const registeredText = registeredForUrl.map((item) => `"${item.title}" (${item.mediaType})`).join(' | ');
    pushError(errors, location, `la URL existe, pero no está aprobada con este título y tipo. Recurso(s) autorizado(s): ${registeredText}.`);
  }

  const isAudio = registeredForUrl.some((item) => item.mediaType === 'audio');
  if ((resource.tipo === 'audio' || isAudio) && section !== 'poomsae') {
    pushError(errors, location, 'los audios de timing solo pueden asignarse dentro de la sección poomsae.');
  }
}

function validatePrivacy(plan, errors) {
  walkStrings(plan, '$', (text, location) => {
    SENSITIVE_PATTERNS.forEach(({ label, regex }) => {
      if (regex.test(text)) {
        pushError(errors, location, `posible ${label} en un repositorio público; revisar o retirar antes de publicar.`);
      }
    });
  });
}

function main() {
  const planArg = process.argv[2];
  if (!planArg) {
    console.error('Uso: node scripts/validate-plan.js data/planes/plan_alumno.json');
    process.exit(2);
  }

  const relativePlanPath = path.normalize(planArg).replace(/^\.\//, '');
  if (!relativePlanPath.startsWith(`data${path.sep}planes${path.sep}`) || !relativePlanPath.endsWith('.json')) {
    fail('Solo se validan archivos JSON dentro de data/planes/.');
  }

  const plan = readJson(relativePlanPath);
  const mediaPolicy = buildMediaPolicy();
  const errors = [];

  validateTopLevel(plan, errors);
  RESOURCE_SECTIONS.forEach((section) => {
    if (!Array.isArray(plan[section])) return;
    plan[section].forEach((resource, index) => validateResource(resource, section, index, mediaPolicy, errors));
  });
  validatePrivacy(plan, errors);

  console.log(`\nValidación ChanonaTKD: ${relativePlanPath}`);
  console.log(`Recursos autorizados activos: ${mediaPolicy.allowedResources.size}`);
  console.log(`URLs históricas bloqueadas: ${mediaPolicy.blockedUrls.size}\n`);

  if (errors.length > 0) {
    console.error('VALIDACIÓN FALLIDA:');
    errors.forEach((error) => console.error(`- ${error}`));
    console.error(`\nResultado: ${errors.length} error(es).`);
    process.exit(1);
  }

  console.log('VALIDACIÓN APROBADA: 0 errores.');
  process.exit(0);
}

main();
