(function(){
  let activeTabKey = "principiantes";

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
    const freq = `
      <ul>
        <li><b>ChanonaFlex:</b> ${safeHtml(tab.chanonaflexDias || "—")}</li>
        <li><b>Isométricos:</b> ${safeHtml(tab.isometricoDias || "—")}</li>
        <li><b>Pateo técnico:</b> ${safeHtml(tab.pateoDias || "—")}</li>
        <li><b>Poomsae:</b> ${safeHtml(tab.poomsaeDias || "—")}</li>
      </ul>`;
    const note = tab.recomendacion ? `<div class="systemNotice"><strong>Indicación:</strong> ${safeHtml(tab.recomendacion)}</div>` : "";
    return section(`tab-${tab.id}-resumen`, `Nivel: ${tab.titulo}`, tab.subtitulo || "Ruta de entrenamiento", `
      <p>${safeHtml(tab.descripcion || "")}</p>
      ${note}
      ${freq}`);
  }

  function renderTrainingTab(tab){
    const split = splitPoomsae(tab);
    const extras = getIndicacionesExtras(tab);
    const notas = Array.isArray(tab.notasFinales) ? tab.notasFinales : [];
    return [
      tabResumen(tab),
      section(`tab-${tab.id}-chanonaflex`, "ChanonaFlex", "Flexibilidad", renderList(tab.chanonaflex, "ChanonaFlex", tab.chanonaflexDias)),
      section(`tab-${tab.id}-isometricos`, "Isométricos", "Fuerza y control", renderList(tab.isometrico, "Isométrico", tab.isometricoDias)),
      section(`tab-${tab.id}-pateo`, "Pateo técnico", "Ap Chagui / Yop Chagui", renderList(tab.pateoTecnico, "Pateo", tab.pateoDias)),
      section(`tab-${tab.id}-poomsae`, "Poomsae", "Técnica específica", renderList(split.poomsae, "Poomsae", tab.poomsaeDias)),
      section(`tab-${tab.id}-clases`, "Clases grabadas", "Sesiones completas", renderList(split.clasesGrabadas, "Clase", "Cuando corresponda")),
      section(`tab-${tab.id}-extras`, "Indicaciones extras", "Detalles del nivel", renderList(extras, "Extra", "Según indicación")),
      section(`tab-${tab.id}-notas`, "Notas finales", "Mensaje del profesor", notas.length ? `<ul>${notas.map(x=>`<li>${safeHtml(x)}</li>`).join("")}</ul>` : `<div class="empty">Sin notas finales.</div>`)
    ].join("");
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

  function renderSystemPage(plan, alumno){
    const root = document.getElementById("content");
    if(!root) return;
    const tabs = getSystemTabs(plan);
    const active = tabs.find(t => t.id === activeTabKey) || tabs[0];
    const activeContent = active.id === "herramientas" ? renderToolsTab() : renderTrainingTab(active);

    root.innerHTML = [
      renderSystemIntro(plan),
      renderSystemTabsNav(plan),
      `<div class="systemTabPanel" data-active-tab="${safeHtml(active.id)}">${activeContent}</div>`
    ].join("");

    root.querySelectorAll("[data-system-tab]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        activeTabKey = btn.dataset.systemTab;
        renderSystemPage(plan, alumno);
        window.scrollTo({ top:0, behavior:"smooth" });
      });
    });

    if(active.id === "herramientas"){
      setupStreak();
      setupTimer();
      setupBot();
      setupTodayCheck();
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
          ...(tab.chanonaflex || []),
          ...(tab.isometrico || []),
          ...(tab.pateoTecnico || []),
          ...split.poomsae,
          ...split.clasesGrabadas,
          ...getIndicacionesExtras(tab)
        );
      });
      return items;
    }
    return legacyAllPlanItems();
  };
})();