(function(){
  const TARGETS = new Set([
    "sr_jeremias",
    "mario_lopez",
    "evan_mael",
    "daniele_biasetti",
    "mtro_mariano_agustina",
    "mariano_agustina",
    "rodrigo_jalisco"
  ]);

  const VERSION = "cycle-20260907-g1-common-1";
  const CYCLE = "Lunes 7 al sábado 12 de septiembre de 2026";
  const UPDATED = "Actualizado martes 8 de septiembre de 2026";

  const LINKS = {
    pre: "https://drive.google.com/file/d/1mV7dkockaExAief_qW7RsMUuouwfMKM7/view?usp=sharing",
    gluteo: "https://drive.google.com/file/d/1S4PWmc52Ot9k-IrXt38L-Spx0tjqj8Lr/view?usp=sharing",
    yopIso1: "https://drive.google.com/file/d/1ptuIEmfskjKeBhYfvW4JZVvW5hIIdCbx/view?usp=sharing",
    apIso1: "https://drive.google.com/file/d/1kbkZqudxFm3GqgXyrEiKM_ODwrMk3ppx/view?usp=sharing",
    caderaBanda: "https://drive.google.com/open?id=1-mLzWj3XiEzCeul7LaIWuPzP39qQ6VtQ&usp=drive_copy",
    circuitoElevacion: "https://drive.google.com/open?id=1Jrwnad5LdAZdG1d_75e2QI7U2sEVLcSP",
    apPared: "https://drive.google.com/file/d/1CX6PkR9CrTaOvZxrZPKTyc1mPfcfJ4wp/view?usp=drive_link",
    tobilloBanda: "https://drive.google.com/file/d/1Sux7kXiJImkagl3ye2nN2bMjqmJOa18O/view?usp=drive_link",
    sentadillaAp: "https://drive.google.com/file/d/1erT1zgvLi0aFMDJb562Y2t7wNwmGWPmj/view?usp=sharing",
    yopToquePiso: "https://drive.google.com/open?id=1ZQ3ud3bkEQJcvSnUelWDVR4ECdwv1_Vn&usp=drive_copy"
  };

  const CHANONAFLEX = [
    item("Pre-Chanonaflex - Estiramiento inicial", "ANTES DE ENTRENAR", "Preparar el cuerpo antes del trabajo principal.", "Según indicación del video", "video", LINKS.pre),
    item("Estiramiento inicial con bloque", "ANTES DE ENTRENAR", "Usar el bloque para mejorar apertura, alineación y control sin forzar el movimiento.", "Trabajo controlado", "info", "")
  ];

  const ISOMETRICOS = [
    item("Glúteo y gancho - Isométrico activo - Intermedio", "LUNES - VIERNES", "Trabajar fuerza de glúteo, control de cadera y base para gancho.", "Según indicación del video", "video", LINKS.gluteo),
    item("Isométrico Activo - Yop Chagui - Nivel 1", "MARTES - JUEVES", "Trabajar cámara, pierna de apoyo, control de cadera y alineación.", "Según indicación del video", "video", LINKS.yopIso1),
    item("Isométrico activo - Ap Chagui - Nivel 1", "MIÉRCOLES - SÁBADO", "Trabajar fuerza de Ap Chagui, elevación de rodilla y recobro limpio.", "Según indicación del video", "video", LINKS.apIso1)
  ];

  const PATEO = [
    item("Torción de cadera con banda elástica", "LUNES - MIÉRCOLES - VIERNES", "Trabajar dirección de cadera, resistencia y control.", "10 reps / 2 series", "video", LINKS.caderaBanda),
    item("Circuito elevacion + sostener + circular", "LUNES - MIÉRCOLES - VIERNES", "Trabajar elevación de rodilla, sostén y control del pateo circular.", "10 reps / 3 series", "video", LINKS.circuitoElevacion),
    item("Ap Chagui contra pared", "LUNES - VIERNES", "Trabajar alineación del Ap Chagui, pierna de apoyo y postura.", "10 reps / 2 series", "video", LINKS.apPared),
    item("Ejercicio de fortalecimiento de tobillo con banda", "LUNES A VIERNES", "Fortalecer tobillo y base de apoyo para un pateo más limpio.", "10 reps por lado / 1 serie", "video", LINKS.tobilloBanda),
    item("Sentadilla Ap Chagui", "LUNES - VIERNES", "Trabajar fuerza de piernas y control técnico de Ap Chagui.", "10 reps (ambas es una) / 2 series", "video", LINKS.sentadillaAp),
    item("Yop Chagui + toque piso + equilibrio", "LUNES - MIÉRCOLES", "Trabajar cámara de Yop Chagui, toque controlado al piso y equilibrio sin prisa.", "5 reps / 2 series", "video", LINKS.yopToquePiso)
  ];

  function current(){
    return new URL(location.href).searchParams.get("alumno") || "";
  }

  function isTarget(){
    return TARGETS.has(current());
  }

  function h(value){
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
  }

  function item(titulo, dia, enfoque, reps, tipo, url){
    const data = { titulo, dia, enfoque, reps, tipo: tipo || (url ? "video" : "info") };
    if(url) data.url = url;
    return data;
  }

  function renderItem(entry, index, badge){
    const label = entry.tipo === "video" ? "VIDEO" : "INFO";
    const button = entry.url ? `<div class="actions"><a class="action primary" href="${h(entry.url)}" target="_blank" rel="noreferrer">▶ Reproducir</a></div>` : "";
    return `
      <article class="itemRow">
        <div class="itemTop">
          <div>
            <p class="itemTitle">${h(entry.titulo)}</p>
            <div class="meta daysMeta"><b>Días:</b> ${h(entry.dia)}</div>
            <div class="meta"><b>Enfoque:</b> ${h(entry.enfoque)}</div>
            <div class="meta"><b>Reps:</b> ${h(entry.reps)}</div>
          </div>
          <div class="badgeRow"><span class="badge">${index}</span><span class="badge ${entry.tipo === "video" ? "ok" : ""}">${label}</span><span class="badge red">${h(badge)}</span></div>
        </div>
        ${button}
      </article>`;
  }

  function renderList(items, badge){
    return `<div class="cardsGrid">${items.map((entry, index) => renderItem(entry, index + 1, badge)).join("")}</div>`;
  }

  function patchSection(id, title, subtitle, items, badge){
    const section = document.getElementById(id);
    const body = section?.querySelector(".sectionBody");
    if(!body || body.dataset.cycle20260907Version === VERSION) return;

    const heading = section.querySelector("h3");
    const eyebrow = section.querySelector(".eyebrow");
    if(heading && title) heading.textContent = title;
    if(eyebrow && subtitle) eyebrow.textContent = subtitle;
    body.dataset.cycle20260907Version = VERSION;
    body.innerHTML = renderList(items, badge);
  }

  function patchHero(){
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

  function patchResumen(){
    const section = document.getElementById("resumen");
    if(!section) return;
    const lis = [...section.querySelectorAll("li")];
    lis.forEach(li => {
      const text = li.textContent || "";
      if(text.includes("ChanonaFlex:")) li.innerHTML = `<b>ChanonaFlex:</b> Antes de entrenar`;
      if(text.includes("Isométricos:")) li.innerHTML = `<b>Isométricos:</b> lunes y viernes / martes y jueves / miércoles y sábado`;
      if(text.includes("Pateo técnico:")) li.innerHTML = `<b>Pateo técnico:</b> lunes, miércoles y viernes / martes, jueves y sábado según ejercicio`;
    });
  }

  function patchDom(){
    if(!isTarget()) return;
    patchHero();
    patchResumen();
    patchSection("chanonaflex", "ChanonaFlex", "Flexibilidad", CHANONAFLEX, "ChanonaFlex");
    patchSection("isometricos", "Isométricos", "Fuerza y control", ISOMETRICOS, "Isométrico");
    patchSection("pateo", "Pateo técnico", "Ap Chagui / Yop Chagui", PATEO, "Pateo");
  }

  function schedulePatch(){
    setTimeout(patchDom, 0);
    setTimeout(patchDom, 250);
    setTimeout(patchDom, 700);
  }

  const previousRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(previousRenderPage){
    renderPage = function(plan, alumno){
      previousRenderPage(plan, alumno);
      schedulePatch();
    };
  }

  document.addEventListener("click", () => {
    setTimeout(patchDom, 120);
    setTimeout(patchDom, 450);
  }, true);

  document.addEventListener("change", () => {
    setTimeout(patchDom, 120);
    setTimeout(patchDom, 450);
  }, true);

  schedulePatch();
})();
