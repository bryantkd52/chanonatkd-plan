(function(){
  const TARGETS = new Set([
    "maria_ponce",
    "diana_rodriguez",
    "benyoced_calzadilla",
    "emilio_cdmx",
    "leticia_erguera"
  ]);

  const CYCLE = "Lunes 17 al sábado 29 de agosto del 2026";
  const UPDATED = "Actualizado lunes 17 de agosto de 2026";

  const LINKS = {
    pre: "https://drive.google.com/file/d/1mV7dkockaExAief_qW7RsMUuouwfMKM7/view?usp=sharing",
    basico: "https://drive.google.com/file/d/1jnSjVKx7mPFKco3HttgzmQUQgAsMm9Kt/view?usp=sharing",
    nivel3: "https://drive.google.com/file/d/16UN5_qf8r8Vr5SVuWnuU5KaNibrzFcDQ/view?usp=sharing",
    benyAdaptiva: "https://drive.google.com/file/d/1OuVq4E61Dxm3kUVB-5JTHuzQSTJxKi4P/view?usp=sharing",
    benyFlex2: "https://drive.google.com/file/d/1PQZMTjewQ8-gdkR1cME_t55gC4bIkG4D/view?usp=drive_link",
    gluteo: "https://drive.google.com/file/d/1S4PWmc52Ot9k-IrXt38L-Spx0tjqj8Lr/view?usp=sharing",
    circuitoIso1: "https://drive.google.com/file/d/1aW943EQ7hfgPjMA0Cj55rUMQ2A3bEyXI/view?usp=sharing",
    yopIso1: "https://drive.google.com/file/d/1ptuIEmfskjKeBhYfvW4JZVvW5hIIdCbx/view?usp=sharing",
    apIso2: "https://drive.google.com/file/d/1SWtdQOVyBEX7GTYPjPSqKz-kUiruQv6w/view?usp=sharing",
    apExtension: "https://drive.google.com/open?id=1ZyIyNBp104LrxnSukkJkzaNiWSGVEXdk&usp=drive_copy"
  };

  const CONFIG = {
    maria_ponce: {
      summary: "ChanonaFlex: según los días marcados en tu plan. Isométrico activo: según los días marcados en tu plan. Pateo técnico: lunes, miércoles y viernes / martes y jueves. Poomsae: según los días marcados en tu plan.",
      pateoDias: "Ap Chagui Extension completa: LUNES - MIÉRCOLES - VIERNES / Sentadilla Ap Chagui: MARTES - JUEVES",
      pateo: [
        video("Ap Chagui Extension completa", "LUNES - MIÉRCOLES - VIERNES", "Trabajar extensión completa de Ap Chagui con control, postura y regreso técnico.", "30 reps / 2 series", LINKS.apExtension),
        info("Sentadilla Ap Chagui", "MARTES - JUEVES", "Trabajar fuerza y control de Ap Chagui desde sentadilla.", "10 reps x pierna / 2 series")
      ]
    },
    diana_rodriguez: {
      summary: "ChanonaFlex: según los días marcados en tu plan. Isométrico activo: lunes y jueves / miércoles y viernes. Pateo técnico: según los días marcados en tu plan. Poomsae: según los días marcados en tu plan.",
      isometricoDias: "Isométrico activo de Ap Chagui: LUNES - JUEVES / Isométrico activo de Yop Chagui nivel 1: MIÉRCOLES - VIERNES",
      isometrico: [
        video("Isométrico activo - Ap Chagui - Nivel 2", "LUNES - JUEVES", "Trabajar fuerza, control y estabilidad en Ap Chagui.", "Según indicación del video", LINKS.apIso2),
        video("Isométrico Activo - Yop Chagui - Nivel 1", "MIÉRCOLES - VIERNES", "Trabajar control de cadera, apoyo y postura en Yop Chagui nivel 1.", "Según indicación del video", LINKS.yopIso1)
      ]
    },
    benyoced_calzadilla: {
      summary: "ChanonaFlex: lunes, miércoles y viernes / martes y jueves. Isométrico activo: lunes y miércoles / martes y viernes. Pateo técnico: lunes, miércoles y viernes / martes y jueves. Poomsae: no asignado.",
      chanaDias: "Flexibilidad Adaptiva - Benyoced: LUNES - MIÉRCOLES - VIERNES / Flexibilidad nivel 2 - Benyoced: MARTES - JUEVES",
      chana: [
        video("Flexibilidad Adaptiva - Benyoced", "LUNES - MIÉRCOLES - VIERNES", "Trabajo adaptado para mantener progreso suave y constante.", "1 serie", LINKS.benyAdaptiva),
        video("Flexibilidad nivel 2 - Benyoced", "MARTES - JUEVES", "Progreso de flexibilidad nivel 2 cuidando control y adaptación.", "1 serie", LINKS.benyFlex2)
      ],
      isometricoDias: "Glúteo y gancho: LUNES - MIÉRCOLES / Circuito Isométrico Activo - Nivel 1: MARTES - VIERNES",
      isometrico: [
        video("Glúteo y gancho - Isométrico activo - Intermedio", "LUNES - MIÉRCOLES", "Nota: hacer todo en márgenes de 5.", "Según indicación del video", LINKS.gluteo),
        video("Circuito Isométrico Activo - Nivel 1", "MARTES - VIERNES", "Nota: hacer todo en márgenes de entre 5 y 7.", "Según indicación del video", LINKS.circuitoIso1)
      ],
      pateoDias: "Ap Chagui Extension completa: LUNES - MIÉRCOLES - VIERNES / Sentadilla Ap Chagui: MARTES - JUEVES",
      pateo: [
        video("Ap Chagui Extension completa", "LUNES - MIÉRCOLES - VIERNES", "Trabajar lento, con control de apoyo, postura y regreso técnico.", "7 reps x pierna / 2 series", LINKS.apExtension),
        info("Sentadilla Ap Chagui", "MARTES - JUEVES", "Nota: todo debe ser lento, cuidando fuerza, postura y control.", "10 reps x pierna / 1 serie")
      ],
      poomsaeDias: "NO ASIGNADO A ESTE ALUMNO",
      poomsae: []
    },
    emilio_cdmx: {
      summary: "ChanonaFlex: según los días marcados en tu plan. Isométrico activo: según los días marcados en tu plan. Pateo técnico: lunes, miércoles y viernes / martes y jueves. Poomsae: no asignado.",
      pateoDias: "Ap Chagui Extension completa: LUNES - MIÉRCOLES - VIERNES / Sentadilla Ap Chagui: MARTES - JUEVES",
      pateo: [
        video("Ap Chagui Extension completa", "LUNES - MIÉRCOLES - VIERNES", "Trabajar lento, con control de apoyo, postura y regreso técnico.", "7 reps x pierna / 2 series", LINKS.apExtension),
        info("Sentadilla Ap Chagui", "MARTES - JUEVES", "Nota: todo debe ser lento, cuidando fuerza, postura y control.", "10 reps x pierna / 1 serie")
      ],
      poomsaeDias: "NO ASIGNADO A ESTE ALUMNO",
      poomsae: []
    },
    leticia_erguera: {
      summary: "ChanonaFlex: antes de entrenar / martes, jueves y sábado / lunes y miércoles. Isométrico activo: martes y jueves. Pateo técnico: lunes, miércoles y viernes / martes y jueves / lunes y miércoles. Poomsae: según los días marcados en tu plan.",
      chanaDias: "Pre-Chanonaflex: ANTES DE ENTRENAR / Chanonaflex Desde Propuesta - Nivel 3: MARTES - JUEVES - SÁBADO / Circuito Chanonaflex - Básico: LUNES - MIÉRCOLES",
      chana: [
        video("Pre-Chanonaflex - Estiramiento inicial", "ANTES DE ENTRENAR", "Usarlo antes de iniciar el entrenamiento.", "Según indicación del video", LINKS.pre),
        video("Chanonaflex Desde Propuesta - Nivel 3", "MARTES - JUEVES - SÁBADO", "Trabajar el nivel 3 cuidando elongación, postura y continuidad.", "Según indicación del video", LINKS.nivel3),
        video("Circuito Chanonaflex - Básico", "LUNES - MIÉRCOLES", "Primera semana: realizarlo a mitad del tiempo de elongación. Segunda semana: volver al tiempo establecido en clase.", "Según indicación del video", LINKS.basico)
      ],
      isometricoDias: "Circuito Isométrico Activo - Nivel 1: MARTES - JUEVES",
      isometricoReplace: true,
      pateoDias: "Ap Chagui Extension completa: LUNES - MIÉRCOLES - VIERNES / Sentadilla Ap Chagui: MARTES - JUEVES / Circuito Yop Chagui con Bloque: LUNES - MIÉRCOLES",
      pateo: [
        video("Ap Chagui Extension completa", "LUNES - MIÉRCOLES - VIERNES", "Trabajar extensión completa de Ap Chagui con control, postura y regreso técnico.", "30 reps / 2 series", LINKS.apExtension),
        info("Sentadilla Ap Chagui", "MARTES - JUEVES", "Trabajar fuerza y control de Ap Chagui desde sentadilla.", "10 reps x pierna / 2 series"),
        info("Circuito Yop Chagui con Bloque", "LUNES - MIÉRCOLES", "Trabajar cámara, control de cadera y regreso técnico usando el bloque como referencia.", "5 reps x pierna / 1 serie")
      ]
    }
  };

  function video(titulo, dia, enfoque, reps, url){ return { titulo, dia, enfoque, reps, tipo:"video", url }; }
  function info(titulo, dia, enfoque, reps){ return { titulo, dia, enfoque, reps, tipo:"info" }; }
  function current(){ return new URL(location.href).searchParams.get("alumno") || ""; }
  function isTarget(){ return TARGETS.has(current()); }
  function h(value){ const div = document.createElement("div"); div.textContent = String(value ?? ""); return div.innerHTML; }

  function mutatePlan(plan, id){
    const cfg = CONFIG[id];
    if(!cfg || !plan) return plan;
    plan.updated_at = UPDATED;
    plan.ciclo = CYCLE;
    plan.enfoque_corto = "Ciclo 17 al 29 de agosto: trabajo por días";
    plan.enfoque = cfg.summary;

    if(cfg.chana){
      plan.chanonaflexDias = cfg.chanaDias;
      plan.chanonaflex = cfg.chana;
    }
    if(cfg.isometrico){
      plan.isometricoDias = cfg.isometricoDias;
      plan.isometrico = cfg.isometrico;
    }
    if(cfg.isometricoReplace){
      const circuito = video("Circuito Isométrico Activo - Nivel 1", "MARTES - JUEVES", "Nota: hacer todo en márgenes de entre 5 a 7.", "Según indicación del video", LINKS.circuitoIso1);
      const base = Array.isArray(plan.isometrico) ? plan.isometrico.filter(item => !String(item.titulo || "").toLowerCase().includes("ap chagui")) : [];
      plan.isometrico = [...base, circuito];
      plan.isometricoDias = cfg.isometricoDias;
    }
    if(cfg.pateo){
      plan.pateoDias = cfg.pateoDias;
      plan.pateoTecnico = cfg.pateo;
    }
    if(Object.prototype.hasOwnProperty.call(cfg, "poomsae")){
      plan.poomsaeDias = cfg.poomsaeDias;
      plan.poomsae = cfg.poomsae;
    }
    return plan;
  }

  function card(item, index, badge){
    const typeBadge = item.tipo === "video" ? "VIDEO" : "INFO";
    const action = item.tipo === "video" ? `<div class="actions"><a class="action primary" href="${h(item.url)}" target="_blank" rel="noreferrer">▶ Reproducir</a></div>` : "";
    return `
      <article class="itemRow">
        <div class="itemTop">
          <div>
            <p class="itemTitle">${h(item.titulo)}</p>
            <div class="meta daysMeta"><b>Días:</b> ${h(item.dia)}</div>
            <div class="meta"><b>Enfoque:</b> ${h(item.enfoque)}</div>
            <div class="meta"><b>Reps:</b> ${h(item.reps)}</div>
          </div>
          <div class="badgeRow"><span class="badge">${index}</span><span class="badge ${item.tipo === "video" ? "ok" : ""}">${typeBadge}</span><span class="badge red">${h(badge)}</span></div>
        </div>
        ${action}
      </article>`;
  }

  function renderCards(items, badge){
    if(!items || !items.length) return `<div class="empty">No asignado a este alumno.</div>`;
    return `<div class="cardsGrid">${items.map((item, i) => card(item, i + 1, badge)).join("")}</div>`;
  }

  function updateHero(cfg){
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

  function updateResumen(cfg){
    const section = document.getElementById("resumen");
    const body = section?.querySelector(".sectionBody");
    if(!body) return;
    const p = body.querySelector("p");
    if(p) p.textContent = cfg.summary;
    const lines = [...body.querySelectorAll("li")];
    lines.forEach(li => {
      const text = (li.textContent || "").toLowerCase();
      if(text.includes("chanonaflex") && cfg.chanaDias) li.innerHTML = `<b>ChanonaFlex:</b> ${h(cfg.chanaDias)}`;
      if(text.includes("isométr") || text.includes("isometric")){
        if(cfg.isometricoDias) li.innerHTML = `<b>Isométricos:</b> ${h(cfg.isometricoDias)}`;
      }
      if(text.includes("pateo") && cfg.pateoDias) li.innerHTML = `<b>Pateo técnico:</b> ${h(cfg.pateoDias)}`;
      if(text.includes("poomsae") && cfg.poomsaeDias) li.innerHTML = `<b>Poomsae:</b> ${h(cfg.poomsaeDias)}`;
    });
  }

  function replaceSection(id, title, eyebrow, items, badge){
    const section = document.getElementById(id);
    if(!section) return;
    const h3 = section.querySelector("h3");
    const eye = section.querySelector(".eyebrow");
    const body = section.querySelector(".sectionBody");
    if(h3) h3.textContent = title;
    if(eye) eye.textContent = eyebrow;
    if(body) body.innerHTML = renderCards(items, badge);
  }

  function applyDom(){
    const id = current();
    if(!TARGETS.has(id)) return;
    const cfg = CONFIG[id];
    updateHero(cfg);
    updateResumen(cfg);
    if(cfg.chana) replaceSection("chanonaflex", "ChanonaFlex", "Flexibilidad", cfg.chana, "ChanonaFlex");
    if(cfg.isometrico) replaceSection("isometricos", "Isométricos", "Fuerza y control", cfg.isometrico, "Isométrico");
    if(cfg.isometricoReplace){
      const items = [video("Circuito Isométrico Activo - Nivel 1", "MARTES - JUEVES", "Nota: hacer todo en márgenes de entre 5 a 7.", "Según indicación del video", LINKS.circuitoIso1)];
      replaceSection("isometricos", "Isométricos", "Fuerza y control", items, "Isométrico");
    }
    if(cfg.pateo) replaceSection("pateo", "Pateo técnico", "Ap Chagui / Yop Chagui", cfg.pateo, "Pateo");
    if(Object.prototype.hasOwnProperty.call(cfg, "poomsae")) replaceSection("poomsae", "Poomsae", "Técnica específica", cfg.poomsae, "Poomsae");
  }

  const previousRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(previousRenderPage){
    renderPage = function(plan, alumno){
      const id = current();
      if(TARGETS.has(id)) mutatePlan(plan, id);
      previousRenderPage(plan, alumno);
      setTimeout(applyDom, 0);
    };
  }

  setTimeout(applyDom, 250);
  setTimeout(applyDom, 900);
  setTimeout(applyDom, 1600);
})();