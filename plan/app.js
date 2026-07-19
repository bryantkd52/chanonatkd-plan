function qs(name){
  const url = new URL(location.href);
  return url.searchParams.get(name) || "";
}

async function loadJson(path){
  const r = await fetch(path, { cache: "no-store" });
  if(!r.ok) throw new Error(`No se pudo cargar: ${path}`);
  return await r.json();
}

function safeText(s){ return String(s ?? ""); }
function safeHtml(s){
  const div = document.createElement("div");
  div.textContent = safeText(s);
  return div.innerHTML;
}
function slugText(s){ return safeText(s).toLowerCase().replace(/[^a-z0-9áéíóúñü]+/gi,"-").slice(0,80); }

const LOGO_URL = "https://bryantkd52.github.io/chanonatkd-plan/assets/logo-chanonatkd.png";
const THEME_KEY = "chanonatkd-theme";
let alumnoId = "";
let alumnoActual = null;
let planActual = null;
let timerSeconds = 30;
let remainingSeconds = 30;
let timerInterval = null;
let audioCtx = null;

const DIRECT_PLAN_ACCESS = {
  team_poomsae: {
    nombre: "Team Poomsae",
    plan: "plan_team_poomsae.json",
    plan_activo: "Dragones",
    suscripcion_activa: "Junio - Octubre 2026",
    objetivo_proximo: "Estructura grupal de Ap/Yop Chagui, flexibilidad y fuerza isométrica"
  }
};

const days = [
  { key:"mon", label:"Lun", full:"lunes" },
  { key:"tue", label:"Mar", full:"martes" },
  { key:"wed", label:"Mié", full:"miércoles" },
  { key:"thu", label:"Jue", full:"jueves" },
  { key:"fri", label:"Vie", full:"viernes" },
  { key:"sat", label:"Sáb", full:"sábado" }
];

const content = document.getElementById("content");
const logoImg = document.getElementById("logoImg");
const brandSub = document.getElementById("brandSub");
const planTitle = document.getElementById("planTitle");
const planSub = document.getElementById("planSub");
const chipFocus = document.getElementById("chipFocus");
const chipUpdated = document.getElementById("chipUpdated");
const chipSubscription = document.getElementById("chipSubscription");
const goalText = document.getElementById("goalText");
const trainingLink = document.getElementById("trainingLink");

function section(id, title, subtitle, innerHtml){
  return `
    <section class="section" id="${id}">
      <div class="sectionHead">
        <div>
          <p class="eyebrow">${safeHtml(subtitle || "")}</p>
          <h3>${safeHtml(title)}</h3>
        </div>
      </div>
      <div class="sectionBody">${innerHtml}</div>
    </section>`;
}

function getTipoBadge(item){
  if(item.tipo === "video") return `<span class="badge ok">VIDEO</span>`;
  if(item.tipo === "audio") return `<span class="badge warn">AUDIO</span>`;
  if(item.tipo === "folder") return `<span class="badge">CARPETA</span>`;
  return `<span class="badge">INFO</span>`;
}

function inferDays(item, fallback){
  return safeText(item.dia || item.dias || item.days || fallback || "Según indicación del plan");
}

function itemRow(item, badgeText, index, fallbackDays){
  const titulo = safeText(item.titulo || item.title || "Ejercicio");
  const enfoque = item.enfoque || item.focus ? `<div class="meta"><b>Enfoque:</b> ${safeHtml(item.enfoque || item.focus)}</div>` : "";
  const reps = item.reps ? `<div class="meta"><b>Reps:</b> ${safeHtml(item.reps)}</div>` : "";
  const dias = `<div class="meta daysMeta"><b>Días:</b> ${safeHtml(inferDays(item, fallbackDays))}</div>`;
  const tags = Array.isArray(item.tags) ? item.tags.map(t=>`<span class="badge red">${safeHtml(t)}</span>`).join("") : "";
  const tipoBadge = getTipoBadge(item);
  const groupBadge = badgeText ? `<span class="badge red">${safeHtml(badgeText)}</span>` : "";
  const idxBadge = `<span class="badge">${index}</span>`;
  const labelBtn = item.tipo === "folder" ? "📁 Abrir carpeta" : item.tipo === "audio" ? "🎧 Abrir audio" : "▶ Reproducir";
  const playBtn = item.url ? `<a class="action primary" href="${safeHtml(item.url)}" target="_blank" rel="noreferrer">${labelBtn}</a>` : "";
  return `
    <article class="itemRow">
      <div class="itemTop">
        <div>
          <p class="itemTitle">${safeHtml(titulo)}</p>
          ${dias}
          ${enfoque}
          ${reps}
        </div>
        <div class="badgeRow">${idxBadge}${tipoBadge}${groupBadge}</div>
      </div>
      ${tags ? `<div class="badgeRow">${tags}</div>` : ""}
      ${playBtn ? `<div class="actions">${playBtn}</div>` : ""}
    </article>`;
}

function renderList(items, badge, fallbackDays){
  const arr = Array.isArray(items) ? items : [];
  if(!arr.length) return `<div class="empty">Aún no hay contenido en esta sección.</div>`;
  return `<div class="cardsGrid">${arr.map((x,i)=>itemRow(x,badge,i+1,fallbackDays)).join("")}</div>`;
}

function isRecordedClass(item){
  const title = safeText(item.titulo || item.title).toLowerCase();
  const focus = safeText(item.enfoque || item.focus).toLowerCase();
  return /sesión|sesion|clase completa|chanonatkd system|clase acumulada/.test(title + " " + focus);
}

function splitPoomsae(plan){
  const poomsae = Array.isArray(plan.poomsae) ? plan.poomsae : [];
  const tecnicos = [];
  const grabadas = [];
  poomsae.forEach(item => {
    if(isRecordedClass(item)) grabadas.push(item);
    else tecnicos.push(item);
  });
  const extraGrabadas = Array.isArray(plan.clasesGrabadas) ? plan.clasesGrabadas : [];
  return { poomsae: tecnicos, clasesGrabadas: [...grabadas, ...extraGrabadas] };
}

function normalizeExtra(item){
  if(typeof item === "string") return { titulo:item, reps:item, dias:"Según indicación del plan", tipo:"info" };
  return {
    titulo: item.titulo || item.title || item.texto || item.text || "Indicación extra",
    enfoque: item.enfoque || item.descripcion || item.texto || item.text || "",
    reps: item.reps || item.repeticiones || "",
    dias: item.dias || item.dia || item.days || "Según indicación del plan",
    tipo: item.tipo || "info",
    url: item.url || ""
  };
}

function getIndicacionesExtras(plan){
  const direct = Array.isArray(plan.indicacionesExtras) ? plan.indicacionesExtras : [];
  const legacy = Array.isArray(plan.extras) ? plan.extras : [];
  return [...direct, ...legacy].map(normalizeExtra);
}

function renderResumen(plan, alumno){
  const freq = `
    <ul>
      <li><b>ChanonaFlex:</b> ${safeHtml(plan.chanonaflexDias || "—")}</li>
      <li><b>Isométricos:</b> ${safeHtml(plan.isometricoDias || "—")}</li>
      <li><b>Pateo técnico:</b> ${safeHtml(plan.pateoDias || "—")}</li>
      <li><b>Poomsae:</b> ${safeHtml(plan.poomsaeDias || "—")}</li>
    </ul>`;
  const apuntes = Array.isArray(plan.apuntes) && plan.apuntes.length
    ? `<ol>${plan.apuntes.map(x=>`<li>${safeHtml(x)}</li>`).join("")}</ol>`
    : `<div class="empty">Aún no hay apuntes.</div>`;
  return [
    section("resumen", "Resumen del plan", "Objetivo del ciclo", `<p>${safeHtml(plan.enfoque || alumno.objetivo_proximo || "—")}</p>${freq}`),
    section("apuntes", "Indicaciones del ciclo", "Apuntes", apuntes)
  ].join("");
}

function renderStreakSection(){
  return section("racha", "Racha de entrenamiento", "Progreso semanal", `
    <div class="sectionHead" style="padding:0;border:0;background:transparent;margin-bottom:12px">
      <p class="motivation" id="motivationMessage">Empieza hoy. Un día a la vez.</p>
      <span class="pill" id="streakCount">0/6 días</span>
    </div>
    <div id="weekGrid" class="weekGrid" aria-label="Racha semanal"></div>`);
}

function renderTimerSection(){
  return section("temporizador", "Temporizador", "Herramienta", `
    <div id="timerDisplay" class="timerDisplay">00:30</div>
    <div class="timerPresets">
      <button class="timeBtn" data-seconds="30">30s</button>
      <button class="timeBtn" data-seconds="45">45s</button>
      <button class="timeBtn" data-seconds="60">1 min</button>
      <button class="timeBtn" data-seconds="120">2 min</button>
    </div>
    <div class="customTime">
      <label for="customSeconds">Personalizado</label>
      <input id="customSeconds" type="number" min="5" max="3600" value="30" />
      <button id="setCustomTime" class="action" type="button">Usar</button>
    </div>
    <div class="timerControls">
      <button id="startTimer" class="action primary" type="button">Iniciar</button>
      <button id="pauseTimer" class="action" type="button">Pausar</button>
      <button id="resetTimer" class="action" type="button">Reiniciar</button>
    </div>
    <div id="timerDoneMessage" class="timerDone" hidden>✅ Tiempo terminado. Buen trabajo.</div>`);
}

function renderBotSection(){
  return section("bot", "ChanonaTKD BOT", "Ayuda rápida", `
    <div id="botMessages" class="botMessages">
      <div class="botBubble">Hola 👋 Soy <b>ChanonaTKD BOT</b>. Puedo orientarte con dudas comunes y revisar ejercicios de tu plan actual.</div>
    </div>
    <form id="botForm" class="botForm">
      <input id="botInput" type="text" placeholder="Escribe tu duda..." autocomplete="off" />
      <button class="action primary" type="submit">Enviar</button>
    </form>
    <div class="quickQuestions">
      <button data-question="Mi patada de lado no sube">Yop Chagui</button>
      <button data-question="Me falta fuerza en mis movimientos">Fuerza</button>
      <button data-question="Me canso mucho entrenando">Cansancio</button>
    </div>`);
}

function renderTodayCheck(){
  return `
    <section class="todayCheckPanel" id="todayCheckPanel">
      <p class="eyebrow">Entrenamiento de hoy</p>
      <h3 id="todayTitle">¿Ya completaste tu entrenamiento?</h3>
      <p class="motivation">Marca este botón cuando termines. Al tocarlo, se guarda tu avance y la página vuelve al inicio.</p>
      <button id="markTodayBtn" class="bigCheckBtn" type="button">✅ Marcar hoy como LISTO</button>
    </section>`;
}

function renderPage(plan, alumno){
  const split = splitPoomsae(plan);
  const extras = getIndicacionesExtras(plan);
  const notas = Array.isArray(plan.notasFinales) ? plan.notasFinales : [];
  content.innerHTML = [
    renderResumen(plan, alumno),
    `<div class="layoutGrid">${renderStreakSection()}${renderTimerSection()}</div>`,
    renderBotSection(),
    section("chanonaflex", "ChanonaFlex", "Flexibilidad", renderList(plan.chanonaflex, "ChanonaFlex", plan.chanonaflexDias)),
    section("isometricos", "Isométricos", "Fuerza y control", renderList(plan.isometrico, "Isométrico", plan.isometricoDias)),
    section("pateo", "Pateo técnico", "Ap Chagui / Yop Chagui", renderList(plan.pateoTecnico, "Pateo", plan.pateoDias)),
    section("poomsae", "Poomsae", "Técnica específica", renderList(split.poomsae, "Poomsae", plan.poomsaeDias)),
    section("clases", "Clases grabadas", "Sesiones completas", renderList(split.clasesGrabadas, "Clase", "Cuando corresponda al plan")),
    section("extras", "Indicaciones extras", "Ejercicios sin video", renderList(extras, "Extra", "Según indicación")),
    section("notas", "Notas finales", "Mensaje del profesor", notas.length ? `<ul>${notas.map(x=>`<li>${safeHtml(x)}</li>`).join("")}</ul>` : `<div class="empty">Sin notas finales.</div>`),
    renderTodayCheck()
  ].join("");

  setupStreak();
  setupTimer();
  setupBot();
  setupTodayCheck();
}

function applyTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  if(saved === "light") document.body.classList.add("light");
  updateThemeText();
  document.getElementById("themeToggle").addEventListener("click",()=>{
    document.body.classList.toggle("light");
    localStorage.setItem(THEME_KEY, document.body.classList.contains("light") ? "light" : "dark");
    updateThemeText();
  });
}
function updateThemeText(){
  document.getElementById("themeToggle").textContent = document.body.classList.contains("light") ? "🌙 Oscuro" : "☀️ Claro";
}

function getProgressKey(){ return `chanonatkd-progress-${alumnoId}-${slugText(planActual?.ciclo || "actual")}`; }
function getProgress(){
  try{ return JSON.parse(localStorage.getItem(getProgressKey())) || {}; }catch{ return {}; }
}
function saveProgress(progress){ try{ localStorage.setItem(getProgressKey(), JSON.stringify(progress)); }catch{} }
function getTodayKey(){
  const map = {1:"mon",2:"tue",3:"wed",4:"thu",5:"fri",6:"sat"};
  return map[new Date().getDay()] || "mon";
}
function setupStreak(){ renderWeek(); }
function renderWeek(){
  const weekGrid = document.getElementById("weekGrid");
  if(!weekGrid) return;
  const progress = getProgress();
  const todayKey = getTodayKey();
  weekGrid.innerHTML = "";
  days.forEach(day=>{
    const done = !!progress[day.key];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `dayCard ${done ? "done" : ""} ${day.key === todayKey ? "today" : ""}`;
    btn.innerHTML = `<span>${done ? "✅" : "⬜"}</span><strong>${day.label}</strong><small>${done ? "LISTO" : "Pendiente"}</small>`;
    btn.addEventListener("click",()=>{
      progress[day.key] = !progress[day.key];
      saveProgress(progress);
      renderWeek();
      setupTodayCheck();
    });
    weekGrid.appendChild(btn);
  });
  const count = Object.values(progress).filter(Boolean).length;
  document.getElementById("streakCount").textContent = `${count}/6 días`;
  document.getElementById("motivationMessage").textContent = getMotivation(count);
}
function getMotivation(count){
  if(count === 0) return "Empieza hoy. Un día a la vez.";
  if(count === 1) return "Excelente inicio. Ya diste el primer paso.";
  if(count <= 3) return "Vas muy bien. La constancia empieza a construir resultados.";
  if(count <= 5) return "Ya estás agarrando ritmo. No te detengas.";
  return "¡Felicidades! Completaste tu semana de lunes a sábado de entrenamiento.";
}
function setupTodayCheck(){
  const btn = document.getElementById("markTodayBtn");
  if(!btn) return;
  const todayKey = getTodayKey();
  const today = days.find(d=>d.key === todayKey) || days[0];
  const progress = getProgress();
  document.getElementById("todayTitle").textContent = `¿Ya completaste tu entrenamiento de ${today.full}?`;
  btn.textContent = progress[todayKey] ? `✅ ${capitalize(today.full)} LISTO` : `✅ Marcar ${today.full} como LISTO`;
  btn.classList.toggle("done", !!progress[todayKey]);
  btn.onclick = ()=>{
    const current = getProgress();
    current[todayKey] = !current[todayKey];
    saveProgress(current);
    renderWeek();
    setupTodayCheck();
    window.scrollTo({ top:0, behavior:"smooth" });
  };
  const scrollBtn = document.getElementById("scrollTodayBtn");
  if(scrollBtn){
    scrollBtn.onclick = ()=> document.getElementById("todayCheckPanel")?.scrollIntoView({ behavior:"smooth" });
  }
}

function setupTimer(){
  updateTimerDisplay();
  document.querySelectorAll(".timeBtn").forEach(btn=>btn.addEventListener("click",()=>setTimer(Number(btn.dataset.seconds))));
  document.getElementById("setCustomTime")?.addEventListener("click",()=>{
    const value = Number(document.getElementById("customSeconds").value);
    if(value >= 5) setTimer(value);
  });
  document.getElementById("startTimer")?.addEventListener("click",()=>{
    hideTimerDoneMessage();
    ensureAudioContext();
    if(timerInterval) return;
    timerInterval = setInterval(()=>{
      remainingSeconds = Math.max(remainingSeconds - 1, 0);
      updateTimerDisplay();
      if(remainingSeconds === 0){
        clearInterval(timerInterval);
        timerInterval = null;
        playFinishTone();
        showTimerDoneMessage();
      }
    },1000);
  });
  document.getElementById("pauseTimer")?.addEventListener("click",()=>{ clearInterval(timerInterval); timerInterval = null; });
  document.getElementById("resetTimer")?.addEventListener("click",()=>{ clearInterval(timerInterval); timerInterval = null; hideTimerDoneMessage(); remainingSeconds = timerSeconds; updateTimerDisplay(); });
}
function setTimer(seconds){ clearInterval(timerInterval); timerInterval = null; hideTimerDoneMessage(); timerSeconds = seconds; remainingSeconds = seconds; updateTimerDisplay(); }
function updateTimerDisplay(){
  const display = document.getElementById("timerDisplay");
  if(!display) return;
  const mins = Math.floor(remainingSeconds/60);
  const secs = remainingSeconds%60;
  display.textContent = `${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
}
function ensureAudioContext(){
  try{
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if(!AudioContext) return;
    if(!audioCtx) audioCtx = new AudioContext();
    if(audioCtx.state === "suspended") audioCtx.resume();
  }catch{}
}
function playFinishTone(){
  try{
    ensureAudioContext();
    if(!audioCtx) return;
    const now = audioCtx.currentTime;
    const master = audioCtx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.16, now + 0.025);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 1.15);
    master.connect(audioCtx.destination);
    createNote(master, 784, now, .26, "triangle");
    createNote(master, 988, now + .22, .28, "triangle");
    createNote(master, 1175, now + .48, .32, "sine");
  }catch{}
}
function createNote(destination, frequency, startTime, duration, type){
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type || "sine";
  osc.frequency.setValueAtTime(frequency,startTime);
  gain.gain.setValueAtTime(.0001,startTime);
  gain.gain.exponentialRampToValueAtTime(.18,startTime+.025);
  gain.gain.exponentialRampToValueAtTime(.0001,startTime+duration);
  osc.connect(gain); gain.connect(destination); osc.start(startTime); osc.stop(startTime+duration+.05);
}
function showTimerDoneMessage(){
  const msg = document.getElementById("timerDoneMessage");
  const display = document.getElementById("timerDisplay");
  if(msg) msg.hidden = false;
  if(display){ display.classList.remove("finished"); void display.offsetWidth; display.classList.add("finished"); }
}
function hideTimerDoneMessage(){
  document.getElementById("timerDoneMessage")?.setAttribute("hidden", "");
  document.getElementById("timerDisplay")?.classList.remove("finished");
}

function setupBot(){
  const form = document.getElementById("botForm");
  const input = document.getElementById("botInput");
  if(!form || !input) return;
  form.addEventListener("submit", e=>{
    e.preventDefault();
    const question = input.value.trim();
    if(!question) return;
    addBotExchange(question);
    input.value = "";
  });
  document.querySelectorAll(".quickQuestions button").forEach(btn=>btn.addEventListener("click",()=>addBotExchange(btn.dataset.question)));
}
function addBotExchange(question){
  const messages = document.getElementById("botMessages");
  messages.insertAdjacentHTML("beforeend", `<div class="userBubble">${safeHtml(question)}</div>`);
  messages.insertAdjacentHTML("beforeend", `<div class="botBubble">${getBotAnswer(question)}</div>`);
  messages.scrollTop = messages.scrollHeight;
}
function allPlanItems(){
  const p = planActual || {};
  const split = splitPoomsae(p);
  return [
    ...(p.chanonaflex || []), ...(p.isometrico || []), ...(p.pateoTecnico || []),
    ...split.poomsae, ...split.clasesGrabadas, ...getIndicacionesExtras(p)
  ];
}
function findPlanMatches(words){
  const terms = words.map(w=>w.toLowerCase());
  return allPlanItems().filter(item=>{
    const txt = `${item.titulo || item.title || ""} ${item.enfoque || item.focus || ""} ${item.reps || ""} ${item.tags || ""}`.toLowerCase();
    return terms.some(t=>txt.includes(t));
  }).slice(0,3);
}
function renderMatches(matches){
  if(!matches.length) return "";
  return `<br><br><b>En tu plan actual revisa:</b><ul>${matches.map(m=>`<li>${safeHtml(m.titulo || m.title || "Ejercicio")}${m.url ? ` — <a href="${safeHtml(m.url)}" target="_blank" rel="noreferrer">abrir</a>` : ""}</li>`).join("")}</ul>`;
}
function getBotAnswer(question){
  const q = question.toLowerCase();
  if(q.includes("yop") || q.includes("lado") || q.includes("patada de lado") || q.includes("sube")){
    const matches = findPlanMatches(["yop", "glúteo", "gluteo", "cadera", "isométrico", "isometrico"]);
    return `Te conviene enfocarte en cámara, cadera y control. Primero técnica limpia, después altura.${renderMatches(matches)}${!matches.length ? "<br><br>En tu plan actual no encontré un ejercicio directo de Yop Chagui; consúltame antes de agregar algo nuevo." : ""}`;
  }
  if(q.includes("fuerza") || q.includes("potencia") || q.includes("fuerte")){
    const matches = findPlanMatches(["isométrico", "isometrico", "glúteo", "gluteo", "banda", "control"]);
    return `Para que tus movimientos se vean fuertes, cuida el cierre final: postura firme, respiración, tensión correcta y finalización clara. Mucha potencia visual viene de técnica limpia.${renderMatches(matches)}`;
  }
  if(q.includes("canso") || q.includes("cansancio") || q.includes("descanso") || q.includes("duele")){
    return "Escucha tu cuerpo. Si sientes mucho cansancio, toma un pequeño reposo y retoma con mejor calidad. Entrenar bien no significa destruirte; significa avanzar con inteligencia.";
  }
  if(q.includes("ap chagui") || q.includes("frontal")){
    const matches = findPlanMatches(["ap chagui", "frontal", "silla"]);
    return `Para mejorar Ap Chagui, trabaja cámara, regreso de pierna y pierna de apoyo firme.${renderMatches(matches)}${!matches.length ? "<br><br>En tu plan actual no encontré Ap Chagui específico; consúltame antes de cambiar tu rutina." : ""}`;
  }
  if(q.includes("rutina") || q.includes("escenario") || q.includes("miedo")){
    return "Trabaja tu rutina incluso con miedo o duda. En escenario todo se siente diferente; por eso necesitas repetir, corregir y exponerte poco a poco. La seguridad nace de la repetición.";
  }
  return "Buena pregunta. Revisa primero el plan del día y trabaja con calma: técnica limpia, control y buena postura. Si la duda sigue, consúltame antes de modificar tu entrenamiento.";
}

function parseRenewalDay(text){
  const t = safeText(text).toLowerCase();
  if(!t.includes("cada mes")) return null;
  const m = t.match(/(?:día|dia)\s+(\d{1,2})/) || t.match(/(\d{1,2})/);
  if(!m) return null;
  const day = Number(m[1]);
  return day >= 1 && day <= 31 ? day : null;
}
function getNextMonthlyDate(day){
  const today = new Date();
  const base = new Date(today.getFullYear(), today.getMonth(), 1);
  let target = new Date(base.getFullYear(), base.getMonth(), Math.min(day, daysInMonth(base.getFullYear(), base.getMonth())));
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if(target < todayOnly){
    const next = new Date(today.getFullYear(), today.getMonth()+1, 1);
    target = new Date(next.getFullYear(), next.getMonth(), Math.min(day, daysInMonth(next.getFullYear(), next.getMonth())));
  }
  return target;
}
function daysInMonth(year, month){ return new Date(year, month + 1, 0).getDate(); }
function renderRenewalNotice(alumno){
  const card = document.getElementById("renewalCard");
  const title = document.getElementById("renewalTitle");
  const text = document.getElementById("renewalText");
  const closeBtn = document.getElementById("closeRenewal");
  if(!card || !alumno) return;
  const day = parseRenewalDay(alumno.suscripcion_activa);
  if(!day) return;
  const today = new Date();
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const renewal = getNextMonthlyDate(day);
  const diffDays = Math.round((renewal - todayOnly)/(1000*60*60*24));
  const noticeKey = `renewal-notice-${alumnoId}-${todayOnly.toISOString().slice(0,10)}`;
  try{ if(localStorage.getItem(noticeKey)==="closed") return; }catch{}
  if(diffDays === 5){
    title.textContent = "Recordatorio de renovación";
    text.textContent = `Tu acceso se renueva el ${formatDate(renewal)}.`;
    card.hidden = false;
  }
  if(diffDays === 0){
    title.textContent = "Tu renovación es hoy";
    text.textContent = `Tu acceso se renueva hoy, ${formatDate(renewal)}.`;
    card.hidden = false;
  }
  closeBtn.addEventListener("click",()=>{ card.hidden = true; try{ localStorage.setItem(noticeKey,"closed"); }catch{} });
}

function formatDate(date){ return new Intl.DateTimeFormat("es-MX",{day:"numeric",month:"long",year:"numeric"}).format(date); }
function capitalize(text){ return text.charAt(0).toUpperCase()+text.slice(1); }

(async function init(){
  try{
    logoImg.src = LOGO_URL;
    applyTheme();
    alumnoId = qs("alumno");
    if(!alumnoId){
      content.innerHTML = `<div class="loaderCard"><div class="loaderTitle">Falta el alumno en el link</div><div class="loaderSub">Usa: <b>?alumno=rafa_hernandez</b></div></div>`;
      brandSub.textContent = "Link incompleto";
      return;
    }
    const alumnosMap = await loadJson("../data/alumnos.json");
    const alumno = alumnosMap[alumnoId] || DIRECT_PLAN_ACCESS[alumnoId];
    if(!alumno){
      content.innerHTML = `<div class="loaderCard"><div class="loaderTitle">Alumno no encontrado</div><div class="loaderSub">Revisa el parámetro <b>?alumno=</b></div></div>`;
      brandSub.textContent = "Alumno no existe";
      return;
    }
    const plan = await loadJson(`../data/planes/${alumno.plan}`);
    alumnoActual = alumno;
    planActual = plan;

    const nivel = safeText(plan.nivel || alumno.plan_activo || "Plan");
    const ciclo = safeText(plan.ciclo || "—");
    const para = safeText(alumno.nombre || "Alumno");
    planTitle.textContent = `Plan • ${nivel}`;
    planSub.textContent = `Ciclo: ${ciclo} • Para: ${para}`;
    chipFocus.textContent = `🎯 Enfoque: ${safeText(plan.enfoque_corto || alumno.objetivo_proximo || "Entrenamiento")}`;
    chipUpdated.textContent = plan.updated_at ? `🕒 ${safeText(plan.updated_at)}` : "🕒 Actualizado";
    chipSubscription.textContent = `💳 ${safeText(alumno.suscripcion_activa || "—")}`;
    brandSub.textContent = `Modo alumno • ${para}`;
    goalText.textContent = safeText(alumno.objetivo_proximo || plan.enfoque_corto || "");
    if(alumno.link_entrenamiento){
      trainingLink.href = alumno.link_entrenamiento;
    }else{
      trainingLink.removeAttribute("href");
      trainingLink.textContent = "🎥 Link de entrenamiento pendiente";
    }
    renderRenewalNotice(alumno);
    renderPage(plan, alumno);
  }catch(err){
    content.innerHTML = `<div class="loaderCard"><div class="loaderTitle">Error cargando</div><div class="loaderSub">${safeHtml(err.message)}</div></div>`;
    brandSub.textContent = "Error";
  }
})();
