(function(){
  const SYSTEM_ID = "chanonatkd_system";
  const CYCLE = "Lunes 31 agosto al sábado 12 de septiembre del 2026";
  const UPDATED = "Actualizado martes 1 de septiembre de 2026";
  const CHAIR_URL = "https://drive.google.com/file/d/1JuMZJNBn1U6euSphL1qrAgu6bN89p_VM/view?usp=drive_link";

  const LINKS = {
    apDollyoYopRegreso: "https://drive.google.com/open?id=1pUIqQv-TZfUGYydpdg8bMH9qJrEpVTXR&usp=drive_copy",
    secuenciaApDollyoYop: "https://drive.google.com/file/d/1mpJeBddYKmXUuJUMocQN42QzRwtlzSqr/view?usp=drive_link",
    holdBandaL2Koryo: "https://drive.google.com/open?id=1YiNFRyFkZFZH4Pk3eHe8cOZZorTd6rzK&usp=drive_copy",
    apYopTurnHipsSilla: "https://drive.google.com/open?id=1x5bWaaZb97dh3Kl8KyfoBbh7c6uE_dJO&usp=drive_copy",
    yopToquePiso: "https://drive.google.com/open?id=1ZQ3ud3bkEQJcvSnUelWDVR4ECdwv1_Vn&usp=drive_copy",
    dobleYopHoldLanding: "https://drive.google.com/open?id=1t70roD4P_sHZHdkCqufINYq2RJ3lNTNZ&usp=drive_copy",
    sesion19: "https://drive.google.com/open?id=1NSCuFYlIfeF170u_DYJutjSsb4S7J14_&usp=drive_copy",
    sesion20: "https://drive.google.com/open?id=16Og476GDRlL64r1z7phbCT7WOq6SEcup&usp=drive_copy"
  };

  const TEACHER_NOTES = [
    "Taeguk 5: evita que las transiciones de pies se crucen o se desordenen; primero organiza la base y después finaliza la técnica.",
    "Taeguk 5: evita que los codazos, golpes y defensas terminen suaves; cada movimiento debe tener trayectoria clara y cierre firme.",
    "Keumgang: evita abrir demasiado la preparación de Santul Makki; mantén la trayectoria cerrada, limpia y directa.",
    "Keumgang: evita perder eje en Jakdari Seogui y en el giro; controla pie de apoyo, cadera, torso y mirada antes de finalizar."
  ];

  const FINAL_NOTES = [
    "Vamos trabajando y avanzando de manera muy positiva, sobre todo porque llevamos una secuencia positiva. Si eres nuevo o nueva, no pasa nada: toma los entrenamientos grabados desde el primero y sigue la secuencia, más los entrenamientos individuales que dejo en esta sección.",
    "Sigan trabajando duro como se debe; poco a poco nos vamos acercando más a nuestra meta.",
    "Abrazo a todos de parte del Mtro. Chanona."
  ];

  const POOMSAE_WORK = [
    "Nuestro entrenamiento de las próximas semanas será enfocado en Taeguk 5: línea 3, línea 4 y línea 5.",
    "En Keumgang, el enfoque será Jakdari Seogui y el giro o transición.",
    "Trabaja con calma, cuidando base, trayectoria, alineación y finalización correcta de cada movimiento."
  ];

  const SESSIONS = [
    { numero:1, titulo:"Primera sesión - Sábado 1 de abril 2026", enfoque:"Flexibilidad + Isométrico activo", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=1vOfIaIZoli63oh8HoVaKsqYjBVy0449A&usp=drive_copy" },
    { numero:2, titulo:"Segunda sesión - Sábado 11 de abril 2026", enfoque:"Flexibilidad + Isométrico activo", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=18hVQbuObLo0aaXcScuJX2jwHBmm4-QC3&usp=drive_copy" },
    { numero:3, titulo:"Tercera sesión - Sábado 18 de abril 2026", enfoque:"Flexibilidad", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=1C1BmLCXFONjyPI_zECb83ARagwu4fuWx&usp=drive_copy" },
    { numero:4, titulo:"Cuarta sesión - Sábado 25 de abril 2026", enfoque:"Flexibilidad + isométrico + pateo frontal", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=1-YJlW2I-Xo1oIsCl8pcXMRsCbD6_cULC&usp=drive_copy" },
    { numero:5, titulo:"Quinta sesión - Sábado 2 de mayo 2026", enfoque:"Flexibilidad + isométrico + pateo frontal", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=1y9Ci-8FLMFacLKNzvMqbVXKhVlW-6xhL&usp=drive_copy" },
    { numero:6, titulo:"Sexta sesión - Sábado 9 de mayo 2026", enfoque:"Flexibilidad + movilidad + pateo circular", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=10Qz4PJQXgbViLA9XiGOAMAM0P3Wim8KK&usp=drive_copy" },
    { numero:7, titulo:"Séptima sesión - Sábado 16 de mayo 2026", enfoque:"Flexibilidad + movilidad + pateo de lado", reps:"1 serie", tipo:"video", url:"https://drive.google.com/file/d/1GArZcBDcHjb1BbVfZMjLoFx3r5V6Mgei/view?usp=drivesdk" },
    { numero:8, titulo:"Octava sesión - Sábado 23 de mayo 2026", enfoque:"Introducción y control técnico de Ap y Yop Chagui", reps:"1 serie", tipo:"video", url:"https://drive.google.com/file/d/1WWjfSYqqFpyrRf7sfy1-vGlhu4kY1tbv/view?usp=sharing" },
    { numero:9, titulo:"Novena sesión - Sábado 30 de mayo 2026", enfoque:"Flexibilidad intermedia + técnica de pateo + alineación de espalda", reps:"1 serie", tipo:"video", url:"https://drive.google.com/file/d/1ZbNrqfhmHSCEh1C0GXAWtYd9WA2qcOOb/view?usp=sharing" },
    { numero:10, titulo:"Décima sesión - Glúteo, flex y técnico", enfoque:"Trabajo de glúteo, flexibilidad y técnica aplicada a diferentes pateos", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/open?id=1V0euQEZEl8cnfIbbUCGXUb_dzHgEQVqG&usp=drive_copy" },
    { numero:11, titulo:"Onceava sesión - Trinidad pateo", enfoque:"Clase de pateo técnico, control y aplicación progresiva de los esfuerzos", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/open?id=1GSiQhqfXKssSHQx77dN9Svs7vFhTNroa&usp=drive_copy" },
    { numero:12, titulo:"12va sesión - ChanonaTKD System", enfoque:"Clase acumulada del sistema. Continuar trabajando con base en la técnica vista durante la sesión.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1Fv9nYS4_4ik-d5Q2Ze6AO8u1qKfST-OC/view?usp=drive_link" },
    { numero:13, titulo:"13va sesión - ChanonaTKD System", enfoque:"Clase acumulada del sistema. Continuar trabajando con base en la técnica vista durante la sesión.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1OtTSPo2XfByvrgmcYjzHskkE0vGbkKC2/view?usp=drive_link" },
    { numero:14, titulo:"14va sesión - ChanonaTKD System", enfoque:"Clase acumulada del sistema. Continuar trabajando con base en la técnica vista durante la sesión.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1uLUeC9BU7gtkL2WC8fnSSVh2Ihb5HB8f/view?usp=drive_link" },
    { numero:15, titulo:"15va sesión - ChanonaTKD System", enfoque:"Clase acumulada del sistema. Continuar trabajando con base en la técnica vista durante la sesión.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1kK8Fh9K0S-0AWCC-SK5nFuBrcRuVIfP6/view?usp=drive_link" },
    { numero:16, titulo:"16va sesión - ChanonaTKD System", enfoque:"Clase acumulada del sistema. Continuar trabajando con base en la técnica vista durante la sesión.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1LauZUh_s79qjoMzFxfJQczSpPArrwD9Q/view?usp=drive_link" },
    { numero:17, titulo:"Sesión 17 - Koryo transición - ChanonaTKD System", enfoque:"Koryo transición.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1inUGzsmycAMX7hcoszw3sOWJ0ZatLWq9/view?usp=drive_link" },
    { numero:18, titulo:"Sesión 18 - Sonnal de Koryo y su trayectoria", enfoque:"Sonnal de Koryo y su trayectoria.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1IMVKsqFdebdkJnAOh71Ht5MAUcW_5KkQ/view?usp=drive_link" },
    { numero:19, titulo:"Sesión 19 - Fuerza y movilidad isométrica", enfoque:"Fuerza y movilidad isométrica.", reps:"1 clase completa", tipo:"video", url:LINKS.sesion19 },
    { numero:20, titulo:"Sesión 20 - L2 Koryo Piernas", enfoque:"Trabajo técnico de piernas en Koryo línea 2.", reps:"1 clase completa", tipo:"video", url:LINKS.sesion20 }
  ].map(s => ({...s, dia:"Clase grabada"}));

  const BEGINNER_PATEO = [
    item("Ap + Dollyo + Yop con regreso", "LUNES - MIÉRCOLES - VIERNES", "Trabajar la secuencia completa con regreso limpio, controlando cámara, apoyo y equilibrio.", "7 repeticiones completas / 2 series", "video", LINKS.apDollyoYopRegreso),
    item("Secuencia Ap + Dollyo + Yop", "MARTES - JUEVES", "Trabajar la secuencia con orden, ritmo y control técnico desde nivel principiante.", "7 repeticiones completas / 2 series", "video", LINKS.secuenciaApDollyoYop)
  ];

  const MAIN_PATEO = [
    item("Circuito Hold con banda L2 Koryo", "LUNES - MIÉRCOLES - VIERNES", "Fortalecer cámara, sostén y control de pierna usando banda.", "8 reps por pierna / 3 series", "video", LINKS.holdBandaL2Koryo),
    item("Ap + Yop + Turn hips silla", "MARTES - JUEVES", "Trabajar combinación de Ap Chagui, Yop Chagui y rotación de cadera con apoyo de silla.", "7 reps / 3 series", "video", LINKS.apYopTurnHipsSilla),
    item("Yop Chagui + toque piso + equilibrio", "MARTES - JUEVES - SÁBADO", "Trabajar cámara, toque controlado al piso, equilibrio y regreso técnico.", "5 reps x pierna / 2 series", "video", LINKS.yopToquePiso),
    item("Doble yop hold - landing L3 Koryo", "LUNES - MIÉRCOLES - VIERNES", "Trabajar doble Yop, sostén y aterrizaje con control para línea 3 de Koryo.", "8 reps por lado / 1 serie", "video", LINKS.dobleYopHoldLanding)
  ];

  function isSystem(){ return new URL(location.href).searchParams.get("alumno") === SYSTEM_ID; }
  function h(value){ const div=document.createElement("div"); div.textContent=String(value ?? ""); return div.innerHTML; }
  function norm(value){ return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim(); }

  function item(titulo, dia, enfoque, reps, tipo, url){
    const data = { titulo, dia, enfoque, reps, tipo: tipo || (url ? "video" : "info") };
    if(url) data.url = url;
    return data;
  }

  function mutatePlan(plan){
    if(!plan) return plan;
    plan.ciclo = CYCLE;
    plan.updated_at = UPDATED;
    if(Array.isArray(plan.sistemaTabs)){
      const tabs = Object.fromEntries(plan.sistemaTabs.map(tab => [tab.id, tab]));
      if(tabs.principiantes){
        tabs.principiantes.pateoDias = "Ap + Dollyo + Yop con regreso: LUNES - MIÉRCOLES - VIERNES / Secuencia Ap + Dollyo + Yop: MARTES - JUEVES";
        tabs.principiantes.pateoTecnico = BEGINNER_PATEO;
        if(Array.isArray(tabs.principiantes.frecuencias)){
          tabs.principiantes.frecuencias = tabs.principiantes.frecuencias.filter(text => !norm(text).includes("pateo tecnico"));
          tabs.principiantes.frecuencias.push("Pateo técnico principiante: lunes, miércoles y viernes / martes y jueves.");
        }
      }
      if(tabs.pateo){
        tabs.pateo.pateoDias = "Circuito Hold y Doble Yop: LUNES - MIÉRCOLES - VIERNES / Ap + Yop + Turn hips: MARTES - JUEVES / Yop toque piso: MARTES - JUEVES - SÁBADO";
        tabs.pateo.pateoTecnico = MAIN_PATEO;
        tabs.pateo.descripcion = "Esta pestaña concentra el pateo técnico común para el ciclo actual. Haz solo los ejercicios indicados y respeta los días marcados.";
        tabs.pateo.recomendacion = "Trabaja con control, sin correr las repeticiones y cuidando la calidad de la cámara, cadera, sostén y aterrizaje.";
        tabs.pateo.frecuencias = [
          "Circuito Hold con banda y Doble Yop Hold: lunes, miércoles y viernes.",
          "Ap + Yop + Turn hips silla: martes y jueves.",
          "Yop Chagui + toque piso + equilibrio: martes, jueves y sábado."
        ];
      }
      if(tabs.poomsae){
        tabs.poomsae.descripcion = "Nuestro entrenamiento de las próximas semanas estará enfocado en Taeguk 5 y Keumgang.";
        tabs.poomsae.recomendacion = "Trabaja los ejercicios con atención a los errores comunes y usa el buscador de Poomsae para repasar las líneas indicadas.";
        tabs.poomsae.frecuencias = [
          "Taeguk 5: línea 3, línea 4 y línea 5.",
          "Keumgang: Jakdari Seogui y giro o transición.",
          "Busca la línea indicada y trabaja con técnica, control y finalización clara."
        ];
        tabs.poomsae.indicacionesExtras = TEACHER_NOTES;
        tabs.poomsae.notasFinales = FINAL_NOTES;
      }
    }
    return plan;
  }

  const previousRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(previousRenderPage){
    renderPage = function(plan, alumno){
      if(isSystem()) mutatePlan(plan);
      previousRenderPage(plan, alumno);
      if(isSystem()){
        mutatePlan(plan);
        scheduleApply();
      }
    };
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

  function actionLabel(type){ return type === "audio" ? "🎧 Abrir audio" : "▶ Reproducir"; }
  function typeBadge(type, hasUrl){ return hasUrl ? (type === "audio" ? "AUDIO" : "VIDEO") : "INFO"; }

  function card(it, index, badge){
    const hasUrl = !!it.url;
    return `
      <article class="itemRow">
        <div class="itemTop">
          <div>
            <p class="itemTitle">${h(it.titulo)}</p>
            <div class="meta daysMeta"><b>Días:</b> ${h(it.dia)}</div>
            <div class="meta"><b>Enfoque:</b> ${h(it.enfoque || "Trabajo técnico asignado por el Profesor Chanona.")}</div>
            <div class="meta"><b>Reps:</b> ${h(it.reps || "Según indicación del profesor")}</div>
          </div>
          <div class="badgeRow"><span class="badge">${index}</span><span class="badge ${hasUrl ? "ok" : ""}">${typeBadge(it.tipo, hasUrl)}</span><span class="badge red">${h(badge)}</span></div>
        </div>
        ${hasUrl ? `<div class="actions"><a class="action primary" href="${h(it.url)}" target="_blank" rel="noreferrer">${actionLabel(it.tipo)}</a></div>` : ""}
      </article>`;
  }

  function renderCards(items, badge){ return `<div class="cardsGrid">${items.map((it,i)=>card(it,i+1,badge)).join("")}</div>`; }

  function findSectionByTitle(words){
    return [...document.querySelectorAll("section")].find(section => {
      const title = norm(section.querySelector("h3")?.textContent || "");
      return words.every(word => title.includes(norm(word)));
    });
  }

  function activeTab(){
    return document.querySelector(".systemTabPanel")?.getAttribute("data-active-tab") || "";
  }

  function updateVisiblePateo(){
    const tab = activeTab();
    if(tab === "principiantes"){
      const section = findSectionByTitle(["pateo"]);
      const body = section?.querySelector(".sectionBody");
      if(!body) return;
      const title = section.querySelector("h3");
      if(title) title.textContent = "Pateo técnico principiante";
      body.innerHTML = renderCards(BEGINNER_PATEO, "Principiante");
    }
    if(tab === "pateo"){
      const section = findSectionByTitle(["pateo"]);
      const body = section?.querySelector(".sectionBody");
      if(!body) return;
      const title = section.querySelector("h3");
      if(title) title.textContent = "Pateo técnico";
      body.innerHTML = renderCards(MAIN_PATEO, "Pateo");
    }
  }

  function renderNotes(items){
    return `<div class="cardsGrid">${items.map((text,index)=>`
      <article class="itemRow">
        <div class="itemTop">
          <div><p class="itemTitle">${h(text)}</p></div>
          <div class="badgeRow"><span class="badge">${index+1}</span><span class="badge">INFO</span></div>
        </div>
      </article>`).join("")}</div>`;
  }

  function updatePoomsaeVisible(){
    if(activeTab() !== "poomsae") return;
    const panel = document.querySelector(".systemTabPanel[data-active-tab='poomsae']");
    if(panel && !document.getElementById("systemPoomsaeWorkCurrent")){
      const note = document.createElement("section");
      note.className = "sectionCard";
      note.id = "systemPoomsaeWorkCurrent";
      note.innerHTML = `<div class="sectionHead"><div><p class="eyebrow">Poomsae del ciclo</p><h3>Trabajo de estas próximas semanas</h3></div></div><div class="sectionBody">${renderNotes(POOMSAE_WORK)}</div>`;
      panel.prepend(note);
    }

    const indicaciones = findSectionByTitle(["indicaciones"]);
    const indicacionesBody = indicaciones?.querySelector(".sectionBody");
    if(indicacionesBody){
      const title = indicaciones.querySelector("h3");
      const eyebrow = indicaciones.querySelector(".eyebrow");
      if(title) title.textContent = "Indicaciones del profesor";
      if(eyebrow) eyebrow.textContent = "Errores comunes a evitar";
      indicacionesBody.innerHTML = renderNotes(TEACHER_NOTES);
    }

    const notas = findSectionByTitle(["notas"]);
    const notasBody = notas?.querySelector(".sectionBody");
    if(notasBody){
      const title = notas.querySelector("h3");
      const eyebrow = notas.querySelector(".eyebrow");
      if(title) title.textContent = "Notas finales";
      if(eyebrow) eyebrow.textContent = "Mensaje del ciclo";
      notasBody.innerHTML = renderNotes(FINAL_NOTES);
    }
  }

  function renderSession(session){
    return `
      <div class="poomsaeResultTitle"><strong>Resultado:</strong> ${h(session.titulo)}</div>
      <div class="cardsGrid">
        <article class="itemRow">
          <div class="itemTop">
            <div>
              <p class="itemTitle">${h(session.titulo)}</p>
              <div class="meta daysMeta"><b>Días:</b> ${h(session.dia)}</div>
              <div class="meta"><b>Enfoque:</b> ${h(session.enfoque)}</div>
              <div class="meta"><b>Reps:</b> ${h(session.reps)}</div>
            </div>
            <div class="badgeRow"><span class="badge">${session.numero}</span><span class="badge ok">VIDEO</span><span class="badge red">Clase</span></div>
          </div>
          <div class="actions"><a class="action primary" href="${h(session.url)}" target="_blank" rel="noreferrer">▶ Reproducir</a></div>
        </article>
      </div>`;
  }

  function renderSelector(selected){
    return `
      <div class="poomsaeFinder" id="systemSession20Finder" data-ready="1">
        <div class="poomsaeFinderGrid">
          <label><span>Clase grabada</span><select id="systemSession20Select">
            ${SESSIONS.map(s => `<option value="${s.numero}" ${s.numero === selected ? "selected" : ""}>${h(s.titulo)}</option>`).join("")}
          </select></label>
          <button id="systemSession20Search" class="action primary" type="button">🔎 Ver sesión</button>
        </div>
        <div class="systemNotice"><strong>Uso:</strong> Selecciona cualquier sesión y presiona <b>Ver sesión</b>. Todas las clases de la 1 a la 20 se mantienen con sus links.</div>
      </div>
      <div id="systemSession20Results" class="poomsaeSearchResults"></div>`;
  }

  function installSessionSelector(){
    const section = document.getElementById("tab-poomsae-clases");
    const body = section?.querySelector(".sectionBody");
    if(!body) return;
    const title = section.querySelector("h3");
    const eyebrow = section.querySelector(".eyebrow");
    if(title) title.textContent = "Clases grabadas";
    if(eyebrow) eyebrow.textContent = "Selector de sesiones";
    if(!document.getElementById("systemSession20Finder")) body.innerHTML = renderSelector(20);
    const select = document.getElementById("systemSession20Select");
    const button = document.getElementById("systemSession20Search");
    const results = document.getElementById("systemSession20Results");
    if(!select || !button || !results) return;
    button.onclick = () => {
      const session = SESSIONS.find(s => s.numero === Number(select.value)) || SESSIONS[SESSIONS.length - 1];
      results.innerHTML = renderSession(session);
    };
    if(!results.innerHTML.trim()){
      const session = SESSIONS[SESSIONS.length - 1];
      results.innerHTML = renderSession(session);
    }
  }

  function updateChairLink(){
    document.querySelectorAll(".itemRow").forEach(row => {
      const title = norm(row.querySelector(".itemTitle")?.textContent || "");
      if(title.includes("chanonaflex") && title.includes("silla")){
        const link = row.querySelector("a.action");
        if(link) link.href = CHAIR_URL;
      }
    });
  }

  function updateResumen(){
    const body = document.getElementById("resumen")?.querySelector(".sectionBody");
    if(!body) return;
    const p = body.querySelector("p");
    if(p) p.textContent = "Pateo principiante: lunes, miércoles y viernes / martes y jueves. Pateo técnico: lunes, miércoles y viernes / martes, jueves y sábado. Poomsae: Taeguk 5 líneas 3, 4 y 5; Keumgang Jakdari Seogui y giro.";
  }

  function apply(){
    if(!isSystem()) return;
    updateHero();
    updateResumen();
    updateChairLink();
    updateVisiblePateo();
    updatePoomsaeVisible();
    installSessionSelector();
  }

  function scheduleApply(){
    setTimeout(apply, 0);
    setTimeout(apply, 180);
    setTimeout(apply, 650);
    setTimeout(apply, 1200);
  }

  document.addEventListener("click", () => {
    setTimeout(apply, 80);
    setTimeout(apply, 280);
    setTimeout(apply, 900);
  }, true);

  scheduleApply();
})();