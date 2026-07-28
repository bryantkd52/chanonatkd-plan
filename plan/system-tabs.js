(function(){
  let activeTabKey = "principiantes";
  let poomsaeLibraryState = {
    poomsae: "Taeguk 1",
    linea: "1",
    searched: false
  };

  const POOMSAE_LINE_COUNTS = [
    { nombre:"Taeguk 1", lineas:6 },
    { nombre:"Taeguk 2", lineas:6 },
    { nombre:"Taeguk 3", lineas:6 },
    { nombre:"Taeguk 4", lineas:6 },
    { nombre:"Taeguk 5", lineas:6 },
    { nombre:"Taeguk 6", lineas:6 },
    { nombre:"Taeguk 7", lineas:6 },
    { nombre:"Taeguk 8", lineas:6 },
    { nombre:"Koryo", lineas:4 },
    { nombre:"Keumgang", lineas:9 },
    { nombre:"Taebaek", lineas:5 },
    { nombre:"Pyonwong", lineas:4 },
    { nombre:"Sipjin", lineas:4 }
  ];

  function isSystemPlan(plan){
    return Array.isArray(plan?.sistemaTabs) && plan.sistemaTabs.length > 0;
  }

  function getSystemTabs(plan){
    const tabs = Array.isArray(plan?.sistemaTabs) ? plan.sistemaTabs : [];
    return [
      ...tabs,
      {
        id: "herramientas",
        titulo: "Herramientas",
        subtitulo: "Cronómetro + BOT",
        descripcion: "Aquí están las herramientas generales del sistema: racha, temporizador, ChanonaTKD BOT y el botón grande para marcar entrenamiento.",
        recomendacion: "Usa esta pestaña para medir tiempos, hacer preguntas rápidas y marcar tu avance."
      }
    ];
  }

  function tabButton(tab, isActive){
    return `
      <button class="systemTabButton ${isActive ? "active" : ""}" type="button" data-system-tab="${safeHtml(tab.id)}" aria-selected="${isActive}">
        <span>${safeHtml(tab.titulo)}</span>
        <small>${safeHtml(tab.subtitulo || "")}</small>
      </button>`;
  }

  function renderSystemIntro(plan){
    return section("system-intro", "ChanonaTKD System por niveles", "Nueva estructura", `
      <p>${safeHtml(plan.enfoque || "Elige la pestaña que Bryan te indique.")}</p>
      <div class="systemNotice">
        <strong>Importante:</strong> Esta página muestra varias opciones, pero el alumno debe trabajar solamente el nivel indicado por Bryan.
      </div>`);
  }

  function renderSystemTabsNav(plan){
    const tabs = getSystemTabs(plan);
    if(!tabs.some(t => t.id === activeTabKey)) activeTabKey = tabs[0]?.id || "principiantes";
    return `
      <nav class="systemTabsShell" aria-label="Niveles de ChanonaTKD System">
        ${tabs.map(tab => tabButton(tab, tab.id === activeTabKey)).join("")}
      </nav>`;
  }

  function tabResumen(tab){
    const freqItems = Array.isArray(tab.frecuencias) && tab.frecuencias.length
      ? tab.frecuencias
      : [
          tab.chanonaflexDias ? `ChanonaFlex: ${tab.chanonaflexDias}` : "",
          tab.isometricoDias ? `Isométricos: ${tab.isometricoDias}` : "",
          tab.pateoDias ? `Pateo técnico: ${tab.pateoDias}` : "",
          tab.poomsaeDias ? `Poomsae: ${tab.poomsaeDias}` : ""
        ].filter(Boolean);

    const freq = freqItems.length
      ? `<ul>${freqItems.map(x=>`<li>${safeHtml(x)}</li>`).join("")}</ul>`
      : `<div class="empty">Sin frecuencia definida.</div>`;

    const note = tab.recomendacion ? `<div class="systemNotice"><strong>Indicación:</strong> ${safeHtml(tab.recomendacion)}</div>` : "";
    return section(`tab-${tab.id}-resumen`, `Pestaña: ${tab.titulo}`, tab.subtitulo || "Ruta de entrenamiento", `
      <p>${safeHtml(tab.descripcion || "")}</p>
      ${note}
      ${freq}`);
  }

  function renderTextInstructions(items){
    const arr = Array.isArray(items) ? items.filter(Boolean) : [];
    if(!arr.length) return `<div class="empty">Sin indicaciones extras.</div>`;
    return `
      <div class="textInstructions">
        <ol>
          ${arr.map(x=>`<li>${safeHtml(typeof x === "string" ? x : (x.texto || x.text || x.titulo || ""))}</li>`).join("")}
        </ol>
      </div>`;
  }

  function getLineCount(poomsaeName){
    return (POOMSAE_LINE_COUNTS.find(x => x.nombre === poomsaeName) || POOMSAE_LINE_COUNTS[0]).lineas;
  }

  function renderLineOptions(poomsaeName){
    const count = getLineCount(poomsaeName);
    return Array.from({length:count}, (_,i)=>String(i+1))
      .map(n=>`<option value="${n}" ${n === String(poomsaeLibraryState.linea) ? "selected" : ""}>Línea ${n}</option>`)
      .join("");
  }

  function poomsaeOptions(){
    return POOMSAE_LINE_COUNTS.map(x=>`<option value="${safeHtml(x.nombre)}" ${x.nombre === poomsaeLibraryState.poomsae ? "selected" : ""}>${safeHtml(x.nombre)}</option>`).join("");
  }

  function buildPoomsaeLineItems(poomsaeName, lineNumber){
    return [
      {
        titulo: `${poomsaeName} - Línea ${lineNumber}: ejecución completa`,
        dia: "Según indicación de Bryan",
        tipo: "info",
        enfoque: `Objetivo: ejecutar la línea ${lineNumber} completa cuidando dirección, postura, mirada, ritmo y final claro de cada movimiento.`,
        reps: "10 reps / 2 series"
      },
      {
        titulo: `${poomsaeName} - Línea ${lineNumber}: preparación y transiciones`,
        dia: "Antes de hacer velocidad",
        tipo: "info",
        enfoque: "Objetivo: trabajar lento las preparaciones de brazos, cambios de posición y conexión entre movimiento y movimiento.",
        reps: "8 a 10 reps lentas / 2 series"
      },
      {
        titulo: `${poomsaeName} - Línea ${lineNumber}: movimiento clave`,
        dia: "Después de la línea completa",
        tipo: "info",
        enfoque: "Objetivo: elegir el movimiento que Bryan indicó esta semana y repetirlo con atención, sin hacerlo automático todavía.",
        reps: "10 a 15 reps conscientes / 2 series"
      },
      {
        titulo: `${poomsaeName} - Línea ${lineNumber}: ritmo y retención`,
        dia: "Al final del bloque",
        tipo: "info",
        enfoque: "Objetivo: sostener posiciones con fuerza de base, controlar respiración y marcar los segundos reglamentarios cuando aplique.",
        reps: "3 ejecuciones completas con pausa técnica"
      }
    ];
  }

  function renderPoomsaeSearchResults(){
    if(!poomsaeLibraryState.searched){
      return `
        <div class="poomsaeEmptyState">
          <strong>Cómo usarlo:</strong>
          <p>Elige una poomsae, elige una línea y presiona <b>Buscar</b>. Ahí aparecerán las tarjetas de trabajo para esa línea.</p>
          <p>Ejemplo: Bryan puede decirte “esta semana trabaja Taeguk 4 línea 1 y enfócate en el movimiento que vimos”.</p>
        </div>`;
    }
    const p = poomsaeLibraryState.poomsae;
    const line = poomsaeLibraryState.linea;
    return `
      <div class="poomsaeResultTitle">
        <strong>Resultado:</strong> ${safeHtml(p)} • Línea ${safeHtml(line)}
      </div>
      ${renderList(buildPoomsaeLineItems(p, line), "Poomsae", "Según indicación de Bryan")}`;
  }

  function renderPoomsaeLibrary(tab){
    return section(`tab-${tab.id}-buscador`, "Buscador de Poomsae", "Selecciona poomsae y línea", `
      <div class="poomsaeFinder">
        <div class="poomsaeFinderGrid">
          <label>
            <span>Poomsae</span>
            <select id="poomsaeNameSelect">${poomsaeOptions()}</select>
          </label>
          <label>
            <span>Línea</span>
            <select id="poomsaeLineSelect">${renderLineOptions(poomsaeLibraryState.poomsae)}</select>
          </label>
          <button id="poomsaeSearchBtn" class="action primary" type="button">🔎 Buscar</button>
        </div>
        <div class="systemNotice">
          <strong>Uso:</strong> Busca exactamente la poomsae y línea que Bryan te indique. También puedes explorar otras líneas para repasar.
        </div>
      </div>
      <div id="poomsaeSearchResults" class="poomsaeSearchResults">${renderPoomsaeSearchResults()}</div>`);
  }

  function setupPoomsaeLibrary(){
    const poomsaeSelect = document.getElementById("poomsaeNameSelect");
    const lineSelect = document.getElementById("poomsaeLineSelect");
    const searchBtn = document.getElementById("poomsaeSearchBtn");
    const results = document.getElementById("poomsaeSearchResults");
    if(!poomsaeSelect || !lineSelect || !searchBtn || !results) return;

    function syncLineOptions(){
      const count = getLineCount(poomsaeSelect.value);
      const current = Math.min(Number(poomsaeLibraryState.linea || 1), count);
      poomsaeLibraryState.linea = String(current || 1);
      lineSelect.innerHTML = Array.from({length:count}, (_,i)=>String(i+1))
        .map(n=>`<option value="${n}" ${n === poomsaeLibraryState.linea ? "selected" : ""}>Línea ${n}</option>`)
        .join("");
    }

    poomsaeSelect.addEventListener("change", ()=>{
      poomsaeLibraryState.poomsae = poomsaeSelect.value;
      poomsaeLibraryState.linea = "1";
      poomsaeLibraryState.searched = false;
      syncLineOptions();
      results.innerHTML = renderPoomsaeSearchResults();
    });

    lineSelect.addEventListener("change", ()=>{
      poomsaeLibraryState.linea = lineSelect.value;
      poomsaeLibraryState.searched = false;
      results.innerHTML = renderPoomsaeSearchResults();
    });

    searchBtn.addEventListener("click", ()=>{
      poomsaeLibraryState.poomsae = poomsaeSelect.value;
      poomsaeLibraryState.linea = lineSelect.value;
      poomsaeLibraryState.searched = true;
      results.innerHTML = renderPoomsaeSearchResults();
    });
  }

  function renderTrainingTab(tab){
    const split = splitPoomsae(tab);
    const notas = Array.isArray(tab.notasFinales) ? tab.notasFinales : [];
    const calentamientoTitulo = tab.calentamientoTitulo || (tab.id === "principiantes" ? "Calentamiento" : "Calentamiento y activación");
    const parts = [tabResumen(tab)];

    if(tab.id === "principiantes"){
      parts.push(section(`tab-${tab.id}-calentamiento`, calentamientoTitulo, "Preparación inicial", renderList(tab.calentamiento, "Calentamiento", "Antes de entrenar")));
      parts.push(section(`tab-${tab.id}-chanonaflex`, "ChanonaFlex", "Flexibilidad", renderList(tab.chanonaflex, "ChanonaFlex", tab.chanonaflexDias)));
      parts.push(section(`tab-${tab.id}-isometricos`, "Isométrico activo", "Fuerza y control", renderList(tab.isometrico, "Isométrico", tab.isometricoDias)));
      parts.push(section(`tab-${tab.id}-pateo`, "Pateo técnico", "Exclusivo para principiantes", renderList(tab.pateoTecnico, "Pateo", tab.pateoDias)));
    }else if(tab.id === "intermedios" || tab.id === "avanzados"){
      parts.push(section(`tab-${tab.id}-calentamiento`, calentamientoTitulo, "Preparación inicial", renderList(tab.calentamiento, "Calentamiento", "Antes de entrenar")));
      parts.push(section(`tab-${tab.id}-chanonaflex`, "ChanonaFlex", "Flexibilidad", renderList(tab.chanonaflex, "ChanonaFlex", tab.chanonaflexDias)));
      parts.push(section(`tab-${tab.id}-isometricos`, "Isométrico activo", "Fuerza y control", renderList(tab.isometrico, "Isométrico", tab.isometricoDias)));
    }else if(tab.id === "pateo"){
      parts.push(section(`tab-${tab.id}-pateo`, "Pateo técnico", "Común para intermedios y avanzados", renderList(tab.pateoTecnico, "Pateo", tab.pateoDias)));
    }else if(tab.id === "poomsae"){
      parts.push(renderPoomsaeLibrary(tab));
      if(split.poomsae.length) parts.push(section(`tab-${tab.id}-poomsae-destacado`, "Poomsae destacado", "Recursos seleccionados", renderList(split.poomsae, "Poomsae", tab.poomsaeDias)));
      if(split.clasesGrabadas.length) parts.push(section(`tab-${tab.id}-clases`, "Clases grabadas", "Sesiones completas", renderList(split.clasesGrabadas, "Clase", "Cuando corresponda")));
    }else{
      if(Array.isArray(tab.calentamiento) && tab.calentamiento.length) parts.push(section(`tab-${tab.id}-calentamiento`, calentamientoTitulo, "Preparación inicial", renderList(tab.calentamiento, "Calentamiento", "Antes de entrenar")));
      if(Array.isArray(tab.chanonaflex) && tab.chanonaflex.length) parts.push(section(`tab-${tab.id}-chanonaflex`, "ChanonaFlex", "Flexibilidad", renderList(tab.chanonaflex, "ChanonaFlex", tab.chanonaflexDias)));
      if(Array.isArray(tab.isometrico) && tab.isometrico.length) parts.push(section(`tab-${tab.id}-isometricos`, "Isométrico activo", "Fuerza y control", renderList(tab.isometrico, "Isométrico", tab.isometricoDias)));
      if(Array.isArray(tab.pateoTecnico) && tab.pateoTecnico.length) parts.push(section(`tab-${tab.id}-pateo`, "Pateo técnico", "Ap Chagui / Yop Chagui", renderList(tab.pateoTecnico, "Pateo", tab.pateoDias)));
      if(split.poomsae.length) parts.push(section(`tab-${tab.id}-poomsae`, "Poomsae", "Técnica específica", renderList(split.poomsae, "Poomsae", tab.poomsaeDias)));
      if(split.clasesGrabadas.length) parts.push(section(`tab-${tab.id}-clases`, "Clases grabadas", "Sesiones completas", renderList(split.clasesGrabadas, "Clase", "Cuando corresponda")));
    }

    parts.push(section(`tab-${tab.id}-extras`, "Indicaciones extras", "Lectura importante", renderTextInstructions(tab.indicacionesExtras)));
    parts.push(section(`tab-${tab.id}-notas`, "Notas finales", "Mensaje del profesor", notas.length ? `<ul>${notas.map(x=>`<li>${safeHtml(x)}</li>`).join("")}</ul>` : `<div class="empty">Sin notas finales.</div>`));
    return parts.join("");
  }

  function renderToolsTab(){
    return [
      section("herramientas-resumen", "Herramientas generales", "Cronómetro + BOT", `
        <p>Esta pestaña concentra las herramientas que sirven para cualquier nivel: medir tiempos, preguntar al BOT y marcar la racha de entrenamiento.</p>
        <div class="systemNotice"><strong>Recuerda:</strong> El BOT orienta, pero no reemplaza la indicación de Bryan.</div>`),
      renderStreakSection(),
      renderTimerSection(),
      renderBotSection(),
      renderTodayCheck()
    ].join("");
  }

  function renderFloatingTopButton(){
    return `<button id="systemBackTop" class="systemBackTop" type="button" aria-label="Subir al inicio">↑</button>`;
  }

  function setupFloatingTopButton(){
    const btn = document.getElementById("systemBackTop");
    if(!btn) return;
    btn.addEventListener("click", ()=>{
      window.scrollTo({ top:0, behavior:"smooth" });
    });
  }

  function renderSystemPage(plan, alumno){
    const root = document.getElementById("content");
    if(!root) return;
    const tabs = getSystemTabs(plan);
    const active = tabs.find(t => t.id === activeTabKey) || tabs[0];
    const activeContent = active.id === "herramientas" ? renderToolsTab() : renderTrainingTab(active);

    root.innerHTML = [
      renderSystemIntro(plan),
      renderSystemTabsNav(plan),
      `<div class="systemTabPanel" data-active-tab="${safeHtml(active.id)}">${activeContent}</div>`,
      renderFloatingTopButton()
    ].join("");

    root.querySelectorAll("[data-system-tab]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        activeTabKey = btn.dataset.systemTab;
        renderSystemPage(plan, alumno);
      });
    });

    setupFloatingTopButton();

    if(active.id === "herramientas"){
      setupStreak();
      setupTimer();
      setupBot();
      setupTodayCheck();
    }

    if(active.id === "poomsae"){
      setupPoomsaeLibrary();
    }

    const scrollBtn = document.getElementById("scrollTodayBtn");
    if(scrollBtn){
      scrollBtn.onclick = ()=>{
        activeTabKey = "herramientas";
        renderSystemPage(plan, alumno);
        setTimeout(()=>document.getElementById("todayCheckPanel")?.scrollIntoView({ behavior:"smooth" }), 50);
      };
    }
  }

  const legacyRenderPage = window.renderPage;
  renderPage = function(plan, alumno){
    if(isSystemPlan(plan) && (window.alumnoId === "chanonatkd_system" || new URL(location.href).searchParams.get("alumno") === "chanonatkd_system")){
      renderSystemPage(plan, alumno);
      return;
    }
    legacyRenderPage(plan, alumno);
  };

  const legacyAllPlanItems = window.allPlanItems;
  allPlanItems = function(){
    const p = window.planActual || planActual || {};
    if(isSystemPlan(p)){
      const items = [];
      p.sistemaTabs.forEach(tab=>{
        const split = splitPoomsae(tab);
        items.push(
          ...(tab.calentamiento || []),
          ...(tab.chanonaflex || []),
          ...(tab.isometrico || []),
          ...(tab.pateoTecnico || []),
          ...split.poomsae,
          ...split.clasesGrabadas
        );
      });
      return items;
    }
    return legacyAllPlanItems();
  };
})();