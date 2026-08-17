(function(){
  const TARGETS = new Set([
    "sr_jeremias",
    "luis_holanda",
    "mario_lopez",
    "evan_mael",
    "martin_morales",
    "daniele_biasetti",
    "mtro_mariano_agustina",
    "rodrigo_jalisco"
  ]);

  const CYCLE = "Lunes 17 al sábado 29 de agosto de 2026";
  const UPDATED = "Actualizado lunes 17 de agosto de 2026";
  const SUMMARY = "ChanonaFlex: según los días marcados en tu plan. Isométrico activo: según los días marcados en tu plan. Yop Chagui: lunes, miércoles y viernes. Ap Chagui: martes, jueves y sábado. Banda elástica: martes y jueves.";
  const PATEO_DAYS = "Yop Chagui: LUNES - MIÉRCOLES - VIERNES / Ap Chagui: MARTES - JUEVES - SÁBADO / Banda elástica: MARTES - JUEVES";

  const PATEO = [
    {
      titulo: "Ejercicio 17 - Yop Chagui",
      dia: "LUNES - MIÉRCOLES - VIERNES",
      enfoque: "Trabajar cámara, control de cadera, alineación y salida técnica de Yop Chagui.",
      reps: "12 reps / 2 series",
      tipo: "video",
      url: "https://drive.google.com/open?id=1pQf3ikpRZ_PsmVgj-ePf1twsz_htDIqq&usp=drive_copy"
    },
    {
      titulo: "Ejercicio 18 - Yop Chagui",
      dia: "LUNES - MIÉRCOLES - VIERNES",
      enfoque: "Reforzar extensión, regreso y estabilidad de Yop Chagui sin perder postura.",
      reps: "12 reps / 2 series",
      tipo: "video",
      url: "https://drive.google.com/open?id=1scoy1p0QcxGDWuPXCcBkZjUguA8X7jNL&usp=drive_copy"
    },
    {
      titulo: "Propuesta + Ap Chagui reps",
      dia: "MARTES - JUEVES - SÁBADO",
      enfoque: "Mejorar preparación, empuje, cámara y repetición técnica de Ap Chagui.",
      reps: "12 reps / 2 series",
      tipo: "video",
      url: "https://drive.google.com/open?id=1dmkR7vXtDA1P19Ymc8cgoIUFqoUVsdO4&usp=drive_copy"
    },
    {
      titulo: "Ap Chagui + Propuesta stand",
      dia: "MARTES - JUEVES - SÁBADO",
      enfoque: "Trabajar Ap Chagui con control de apoyo, regreso de pierna y postura firme.",
      reps: "12 reps / 2 series",
      tipo: "video",
      url: "https://drive.google.com/open?id=1xDDf3xWV9jLSS2buYRk0ocGBw8eRKigi&usp=drive_copy"
    },
    {
      titulo: "Circuito Hold con banda L2 Koryo",
      dia: "MARTES - JUEVES",
      enfoque: "Usar la banda para mejorar control, fuerza y estabilidad durante el trabajo de pateo.",
      reps: "12 reps / 2 series",
      tipo: "video",
      url: "https://drive.google.com/open?id=1YiNFRyFkZFZH4Pk3eHe8cOZZorTd6rzK&usp=drive_copy"
    },
    {
      titulo: "Torción de cadera con banda elástica",
      dia: "MARTES - JUEVES",
      enfoque: "Fortalecer cadera, dirección y control usando resistencia con banda elástica.",
      reps: "12 reps / 2 series",
      tipo: "video",
      url: "https://drive.google.com/open?id=1-mLzWj3XiEzCeul7LaIWuPzP39qQ6VtQ&usp=drive_copy"
    }
  ];

  const current = () => new URL(location.href).searchParams.get("alumno") || "";
  const isTarget = () => TARGETS.has(current());
  const h = value => {
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
  };

  function card(item, index){
    return `
      <article class="itemRow">
        <div class="itemTop">
          <div>
            <p class="itemTitle">${h(item.titulo)}</p>
            <div class="meta daysMeta"><b>Días:</b> ${h(item.dia)}</div>
            <div class="meta"><b>Enfoque:</b> ${h(item.enfoque)}</div>
            <div class="meta"><b>Reps:</b> ${h(item.reps)}</div>
          </div>
          <div class="badgeRow"><span class="badge">${index}</span><span class="badge ok">VIDEO</span><span class="badge red">Pateo</span></div>
        </div>
        <div class="actions"><a class="action primary" href="${h(item.url)}" target="_blank" rel="noreferrer">▶ Reproducir</a></div>
      </article>`;
  }

  function updateHero(){
    const sub = document.getElementById("planSub");
    if(sub){
      const text = sub.textContent || "";
      sub.textContent = text.includes("• Para:")
        ? text.replace(/Ciclo:\s*.*?\s*•\s*Para:/, `Ciclo: ${CYCLE} • Para:`)
        : `Ciclo: ${CYCLE}`;
    }
    const updated = document.getElementById("chipUpdated");
    if(updated) updated.textContent = `🕒 ${UPDATED}`;
  }

  function updateResumen(){
    const section = document.getElementById("resumen");
    if(!section) return;
    const body = section.querySelector(".sectionBody");
    if(!body) return;
    const p = body.querySelector("p");
    if(p) p.textContent = SUMMARY;
    [...body.querySelectorAll("li")].forEach(li => {
      const text = (li.textContent || "").toLowerCase();
      if(text.includes("pateo técnico")){
        li.innerHTML = `<b>Pateo técnico:</b> ${h(PATEO_DAYS)}`;
      }
    });
  }

  function updatePateo(){
    const section = document.getElementById("pateo");
    if(!section) return;
    const eyebrow = section.querySelector(".eyebrow");
    const body = section.querySelector(".sectionBody");
    if(eyebrow) eyebrow.textContent = "Yop Chagui / Ap Chagui / Banda elástica";
    if(!body || body.dataset.cycle20260817G1 === "1") return;
    body.dataset.cycle20260817G1 = "1";
    body.innerHTML = `<div class="cardsGrid">${PATEO.map((item, i) => card(item, i + 1)).join("")}</div>`;
  }

  function apply(){
    if(!isTarget()) return;
    updateHero();
    updateResumen();
    updatePateo();
  }

  const previousRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(previousRenderPage){
    renderPage = function(plan, alumno){
      const result = previousRenderPage(plan, alumno);
      apply();
      return result;
    };
  }

  setTimeout(apply, 300);
  setTimeout(apply, 900);
  setTimeout(apply, 1800);
})();
