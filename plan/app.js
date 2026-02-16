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

// DOM
const content = document.getElementById("content");
const menu = document.getElementById("menu");

const planTitle = document.getElementById("planTitle");
const planSub = document.getElementById("planSub");
const chipFocus = document.getElementById("chipFocus");
const brandSub = document.getElementById("brandSub");
const brandMeta = document.getElementById("brandMeta");
const chipUpdated = document.getElementById("chipUpdated");
const logoImg = document.getElementById("logoImg");

// Logo (tu drive directo)
const LOGO_URL = "https://bryantkd52.github.io/chanonatkd-plan/assets/logo-chanonatkd.png";

// Render helpers
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

  const labelBtn = (item.tipo === "folder") ? "📁 Abrir carpeta" : "▶ Reproducir";
  const playBtn = item.url
    ? `<a class="action primary" href="${item.url}" target="_blank" rel="noreferrer">${labelBtn}</a>`
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
      </div>
    </div>
  `;
}

function renderResumen(plan){
  const enfoqueTxt = safeText(plan.enfoque || "—");

  const freq = `
    <ul>
      <li><b>Isométrico activo:</b> ${safeText(plan.isometricoDias || "—")}</li>
      <li><b>Trabajo técnico pateo:</b> ${safeText(plan.pateoDias || "—")}</li>
      <li><b>Trabajo técnico poomsae:</b> ${safeText(plan.poomsaeDias || "—")}</li>

      <!-- ✅ NUEVO -->
      <li><b>ChanonaFlex:</b> ${safeText(plan.chanonaflexDias || "—")}</li>
    </ul>
  `;

  const apuntes = Array.isArray(plan.apuntes) && plan.apuntes.length
    ? `<ol>${plan.apuntes.map(x=>`<li>${safeText(x)}</li>`).join("")}</ol>`
    : `<div class="meta">Aún no hay apuntes.</div>`;

  content.innerHTML = [
    section("🎯 Enfoque del ciclo", `<div>${enfoqueTxt}</div>`),
    section("📌 Frecuencia rápida", freq),
    section("📌 Apuntes de poomsae", apuntes)
  ].join("");
}

function renderListBlock(title, list, badge){
  const items = Array.isArray(list) ? list : [];
  const html = items.length
    ? `<div class="listWrap">${items.map((x,i)=>itemRow(x,badge, i+1)).join("")}</div>`
    : `<div class="meta">Aún no hay ejercicios aquí.</div>`;
  content.innerHTML = section(title, html);
}

function renderNotas(plan){
  const arr = Array.isArray(plan.notasFinales) ? plan.notasFinales : [];
  const html = arr.length
    ? `<ul>${arr.map(x=>`<li>${safeText(x)}</li>`).join("")}</ul>`
    : `<div class="meta">Sin notas.</div>`;
  content.innerHTML = section("Notas finales", html);
}

function renderTab(tab, plan){
  if(tab === "resumen") return renderResumen(plan);
  if(tab === "isometrico") return renderListBlock("Isométrico activo de pateo", plan.isometrico, "Isométrico");
  if(tab === "pateo") return renderListBlock("Trabajo técnico de pateo", plan.pateoTecnico, "Pateo");

  if(tab === "poomsae"){
    const poom = Array.isArray(plan.poomsae) ? plan.poomsae : [];
    const extras = Array.isArray(plan.extras) ? plan.extras.map(x=>({
      ...x,
      tags: Array.isArray(x.tags) ? x.tags : ["Extra"]
    })) : [];
    const combinado = [...poom, ...extras];
    return renderListBlock("Trabajo técnico de poomsae", combinado, "Poomsae");
  }

  // ✅ NUEVO TAB: ChanonaFlex
  if(tab === "chanonaflex"){
    return renderListBlock("ChanonaFlex", plan.chanonaflex, "ChanonaFlex");
  }

  if(tab === "notas") return renderNotas(plan);
  return renderResumen(plan);
}

// Tabs UI
menu.addEventListener("click", (e)=>{
  const btn = e.target.closest(".btn");
  if(!btn) return;
  document.querySelectorAll(".btn").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  renderTab(btn.dataset.tab, window.__PLAN__);
});

// INIT
(async function init(){
  try{
    logoImg.src = LOGO_URL;

    const alumnoId = qs("alumno");
    if(!alumnoId){
      content.innerHTML = `<div class="loaderCard"><div class="loaderTitle">Falta el alumno en el link</div><div class="loaderSub">Usa: <b>?alumno=rafa_hernandez</b></div></div>`;
      brandSub.textContent = "Link incompleto";
      return;
    }

    const alumnosMap = await loadJson("../data/alumnos.json");
    const alumno = alumnosMap[alumnoId];

    if(!alumno){
      content.innerHTML = `<div class="loaderCard"><div class="loaderTitle">Alumno no encontrado</div><div class="loaderSub">Revisa el parámetro <b>?alumno=</b></div></div>`;
      brandSub.textContent = "Alumno no existe";
      return;
    }

    const plan = await loadJson(`../data/planes/${alumno.plan}`);
    window.__PLAN__ = plan;

    const nivel = safeText(plan.nivel || "Plan");
    const ciclo = safeText(plan.ciclo || "—");
    const para = safeText(alumno.nombre || "Alumno");

    planTitle.textContent = `Plan • ${nivel}`;
    planSub.textContent = `Ciclo: ${ciclo} • Para: ${para}`;
    chipFocus.textContent = `🎯 Enfoque: ${safeText(plan.enfoque_corto || "Timing + armonía + pateo técnico")}`;
    chipUpdated.textContent = plan.updated_at ? `🕒 ${safeText(plan.updated_at)}` : "🕒 Actualizado";

    brandSub.textContent = `Modo alumno • ${para}`;

    brandMeta.innerHTML = `
      <div><b>Alumno desde:</b> ${safeText(alumno.alumno_desde || "—")}</div>
      <div><b>Plan activo:</b> ${safeText(alumno.plan_activo || "—")}</div>
      <div><b>Suscripción activa:</b> ${safeText(alumno.suscripcion_activa || "—")}</div>
      <div><b>Objetivo próximo:</b> ${safeText(alumno.objetivo_proximo || "—")}</div>
    `;

    renderTab("resumen", plan);
  }catch(err){
    content.innerHTML = `<div class="loaderCard"><div class="loaderTitle">Error cargando</div><div class="loaderSub">${safeText(err.message)}</div></div>`;
    brandSub.textContent = "Error";
  }
})();
