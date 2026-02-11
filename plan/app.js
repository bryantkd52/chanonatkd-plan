// ===============================
// 0) Utils
// ===============================
function qs(name){
  const url = new URL(location.href);
  return url.searchParams.get(name) || "";
}

async function loadJson(path){
  const r = await fetch(path, { cache: "no-store" });
  if(!r.ok) throw new Error(`No se pudo cargar: ${path}`);
  return await r.json();
}

function getDriveId(url){
  const m1 = url.match(/\/file\/d\/([^\/]+)/);
  if(m1) return m1[1];
  const m2 = url.match(/[?&]id=([^&]+)/);
  if(m2) return m2[1];
  return null;
}
function drivePreviewUrl(url){
  const id = getDriveId(url);
  if(!id) return null;
  return `https://drive.google.com/file/d/${id}/preview`;
}
function driveDirectDownload(url){
  const id = getDriveId(url);
  if(!id) return null;
  return `https://drive.google.com/uc?export=download&id=${id}`;
}
function safeText(s){ return String(s ?? ""); }

// ===============================
// 1) State
// ===============================
let alumno = null; // {nombre, plan}
let plan = null;   // plan json
let lastUpdated = "";

// ===============================
// 2) DOM refs
// ===============================
const content = document.getElementById("content");
const menu = document.getElementById("menu");

const planTitle = document.getElementById("planTitle");
const planSub = document.getElementById("planSub");
const chipFocus = document.getElementById("chipFocus");
const brandSub = document.getElementById("brandSub");
const chipUpdated = document.getElementById("chipUpdated");

// Modal
const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeModalBtn = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalSub = document.getElementById("modalSub");
const openDriveBtn = document.getElementById("openDriveBtn");

const videoBox = document.getElementById("videoBox");
const audioBox = document.getElementById("audioBox");
const videoFrame = document.getElementById("videoFrame");
const audioPlayer = document.getElementById("audioPlayer");
const loopGroup = document.getElementById("loopGroup");
const loopToggle = document.getElementById("loopToggle");
const speedRow = document.getElementById("speedRow");

let currentMedia = { tipo:"", url:"" };
let currentSpeed = 1;

// ===============================
// 3) Render helpers
// ===============================
function section(title, innerHtml){
  return `
    <section class="section">
      <div class="sectionHead">
        <h3>${title}</h3>
      </div>
      <div class="sectionBody">
        ${innerHtml}
      </div>
    </section>
  `;
}

// items in ordered list style
function itemRow(item, badgeText, index){
  const idxBadge = `<span class="badge">${index}</span>`;
  const tipoBadge =
    item.tipo === "video" ? `<span class="badge ok">VIDEO</span>` :
    item.tipo === "audio" ? `<span class="badge warn">AUDIO</span>` :
    `<span class="badge">CARPETA</span>`;

  const groupBadge = badgeText ? `<span class="badge red">${badgeText}</span>` : "";
  const tags = Array.isArray(item.tags) ? item.tags.map(t=>`<span class="badge red">${safeText(t)}</span>`).join("") : "";

  const enfoque = item.enfoque ? `<div class="meta"><b>Enfoque:</b> ${safeText(item.enfoque)}</div>` : "";
  const reps = item.reps ? `<div class="meta"><b>Reps:</b> ${safeText(item.reps)}</div>` : "";
  const dia = item.dia ? `<div class="meta"><b>Día:</b> ${safeText(item.dia)}</div>` : "";

  const canPlay = (item.tipo === "video" || item.tipo === "audio");
  const playBtn = canPlay
    ? `<button class="action primary" type="button" data-play='${encodeURIComponent(JSON.stringify(item))}'>▶ Reproducir</button>`
    : "";

  const driveBtn = item.url
    ? `<a class="action" href="${item.url}" target="_blank" rel="noreferrer">↗ Abrir en Drive</a>`
    : "";

  return `
    <div class="itemRow">
      <div class="itemTop">
        <div>
          <p class="itemTitle">${safeText(item.titulo || "Ejercicio")}</p>
          ${dia}
          ${enfoque}
          ${reps}
        </div>
        <div class="badgeRow">
          ${idxBadge}
          ${tipoBadge}
          ${groupBadge}
        </div>
      </div>

      ${tags ? `<div class="badgeRow">${tags}</div>` : ""}

      <div class="actions">
        ${playBtn}
        ${driveBtn}
      </div>
    </div>
  `;
}

function renderResumen(){
  const enfoqueTxt = safeText(plan.enfoque || "—");

  const freq = `
    <ul>
      <li><b>Isométrico activo:</b> ${safeText(plan.isometricoDias || "—")}</li>
      <li><b>Trabajo técnico pateo:</b> ${safeText(plan.pateoDias || "—")}</li>
      <li><b>Trabajo técnico poomsae:</b> ${safeText(plan.poomsaeDias || "—")}</li>
    </ul>
  `;

  // atajos: primeras 2 cards de cada bloque si existen
  const iso = Array.isArray(plan.isometrico) ? plan.isometrico.slice(0,2) : [];
  const pat = Array.isArray(plan.pateoTecnico) ? plan.pateoTecnico.slice(0,2) : [];

  const atajos = `
    <div class="listWrap">
      ${(iso.length ? iso.map((x,i)=>itemRow(x,"Isométrico", i+1)).join("") : `<div class="meta">—</div>`)}
      ${(pat.length ? pat.map((x,i)=>itemRow(x,"Pateo", i+1+iso.length)).join("") : ``)}
    </div>
  `;

  content.innerHTML = [
    section("🎯 Enfoque del ciclo", `<div>${enfoqueTxt}</div>`),
    section("📌 Frecuencia rápida", freq),
    section("⚡ Atajos", atajos),
  ].join("");
}

function renderListBlock(title, list, badge){
  const items = Array.isArray(list) ? list : [];
  const html = items.length
    ? `<div class="listWrap">${items.map((x,i)=>itemRow(x,badge, i+1)).join("")}</div>`
    : `<div class="meta">Aún no hay ejercicios aquí.</div>`;

  content.innerHTML = [ section(title, html) ].join("");
}

function renderApuntes(){
  const arr = Array.isArray(plan.apuntes) ? plan.apuntes : [];
  const html = arr.length
    ? `<ol>${arr.map(x=>`<li>${safeText(x)}</li>`).join("")}</ol>`
    : `<div class="meta">Sin apuntes.</div>`;
  content.innerHTML = [ section("Apuntes de poomsae", html) ].join("");
}

function renderNotas(){
  const arr = Array.isArray(plan.notasFinales) ? plan.notasFinales : [];
  const html = arr.length
    ? `<ul>${arr.map(x=>`<li>${safeText(x)}</li>`).join("")}</ul>`
    : `<div class="meta">Sin notas.</div>`;
  content.innerHTML = [ section("Notas finales", html) ].join("");
}

function renderTab(tab){
  if(!plan){
    content.innerHTML = `<div class="loaderCard"><div class="loaderTitle">No hay plan cargado.</div></div>`;
    return;
  }

  if(tab === "resumen") return renderResumen();
  if(tab === "isometrico") return renderListBlock("Isométrico activo de pateo", plan.isometrico, "Isométrico");
  if(tab === "pateo") return renderListBlock("Trabajo técnico de pateo", plan.pateoTecnico, "Pateo");
  if(tab === "poomsae") return renderListBlock("Trabajo técnico de poomsae", plan.poomsae, "Poomsae");
  if(tab === "extras") return renderListBlock("Extras", plan.extras, "Extra");
  if(tab === "apuntes") return renderApuntes();
  if(tab === "notas") return renderNotas();

  renderResumen();
}

// ===============================
// 4) Modal player logic
// ===============================
function openModal(){
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";

  // stop media
  videoFrame.src = "about:blank";
  audioPlayer.pause();
  audioPlayer.removeAttribute("src");
  audioPlayer.load();
}

function setSpeed(speed){
  currentSpeed = speed;

  // audio speed
  try{ audioPlayer.playbackRate = speed; }catch(e){}

  // video iframe (Drive) no permite controlar speed desde iframe.
  // Por eso, para video: mostramos el selector pero solo afecta audio.
  // (Si luego quieres velocidad real en video: necesitamos usar video mp4 directo o YouTube player API.)
  document.querySelectorAll(".pillBtn").forEach(b=>{
    b.classList.toggle("active", Number(b.dataset.speed) === Number(speed));
  });
}

function showVideo(url){
  audioBox.style.display = "none";
  loopGroup.style.display = "none";

  audioPlayer.pause();
  audioPlayer.removeAttribute("src");
  audioPlayer.load();

  videoBox.style.display = "block";
  videoFrame.src = url;
}

function showAudio(url){
  videoBox.style.display = "none";
  audioBox.style.display = "block";
  loopGroup.style.display = "block";

  videoFrame.src = "about:blank";

  audioPlayer.src = url;
  audioPlayer.loop = loopToggle.checked;
  audioPlayer.playbackRate = currentSpeed;
  setTimeout(()=> audioPlayer.play().catch(()=>{}), 200);
}

function playItem(item){
  currentMedia = { tipo: item.tipo, url: item.url || "" };

  modalTitle.textContent = "Reproductor Chanona";
  modalSub.textContent = safeText(item.titulo || "");

  openDriveBtn.href = item.url || "#";

  // reset speed UI to 1x when opening
  setSpeed(currentSpeed || 1);

  if(item.tipo === "video"){
    const preview = drivePreviewUrl(item.url) || item.url;
    showVideo(preview);
    openModal();
    return;
  }

  if(item.tipo === "audio"){
    const direct = driveDirectDownload(item.url) || item.url;
    showAudio(direct);
    openModal();
    return;
  }

  // folders: open drive only (no modal)
  if(item.url) window.open(item.url, "_blank", "noopener,noreferrer");
}

modalBackdrop.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);
document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeModal(); });

loopToggle.addEventListener("change", ()=>{ audioPlayer.loop = loopToggle.checked; });

speedRow.addEventListener("click", (e)=>{
  const btn = e.target.closest(".pillBtn");
  if(!btn) return;
  const sp = Number(btn.dataset.speed);
  setSpeed(sp);
});

// Delegated click for play buttons
content.addEventListener("click", (e)=>{
  const btn = e.target.closest("[data-play]");
  if(!btn) return;
  const decoded = decodeURIComponent(btn.getAttribute("data-play"));
  const item = JSON.parse(decoded);
  playItem(item);
});

// ===============================
// 5) Tabs
// ===============================
menu.addEventListener("click", (e)=>{
  const btn = e.target.closest(".btn");
  if(!btn) return;
  document.querySelectorAll(".btn").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  renderTab(btn.dataset.tab);
});

// ===============================
// 6) Load alumno + plan from JSON
// ===============================
(async function init(){
  try{
    const alumnoId = qs("alumno");
    if(!alumnoId){
      content.innerHTML = `<div class="loaderCard"><div class="loaderTitle">Falta el alumno en el link</div><div class="loaderSub">Usa: <b>?alumno=rafa_hernandez</b></div></div>`;
      brandSub.textContent = "Link incompleto";
      return;
    }

    const alumnosMap = await loadJson("../data/alumnos.json");
    alumno = alumnosMap[alumnoId];

    if(!alumno){
      content.innerHTML = `<div class="loaderCard"><div class="loaderTitle">Alumno no encontrado</div><div class="loaderSub">Revisa el parámetro <b>?alumno=</b></div></div>`;
      brandSub.textContent = "Alumno no existe";
      return;
    }

    plan = await loadJson(`../data/planes/${alumno.plan}`);

    // Header UI
    const nivel = safeText(plan.nivel || "Plan");
    const ciclo = safeText(plan.ciclo || "—");
    const para = safeText(alumno.nombre || "Alumno");

    planTitle.textContent = `Plan • ${nivel}`;
    planSub.textContent = `Ciclo: ${ciclo} • Para: ${para}`;
    chipFocus.textContent = `🎯 Enfoque: ${safeText(plan.enfoque_corto || "Timing + armonía + pateo técnico")}`;
    brandSub.textContent = `Modo alumno • ${para}`;

    // Optional: show updated time if you add "updated_at" in plan JSON
    lastUpdated = plan.updated_at ? `🕒 ${safeText(plan.updated_at)}` : "🕒 Actualizado";
    chipUpdated.textContent = lastUpdated;

    renderTab("resumen");

  }catch(err){
    content.innerHTML = `<div class="loaderCard"><div class="loaderTitle">Error cargando</div><div class="loaderSub">${safeText(err.message)}</div></div>`;
    brandSub.textContent = "Error";
  }
})();
