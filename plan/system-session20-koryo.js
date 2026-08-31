(function(){
  const SYSTEM_ID = "chanonatkd_system";
  const CYCLE = "Lunes 17 al sábado 29 de agosto del 2026";
  const UPDATED = "Actualizado lunes 17 de agosto de 2026";

  const TEACHER_NOTES = [
    "Trabajo específico de esta semana: Koryo línea 2 y línea 3, más Taeguk 8 línea 1 y línea 2.",
    "Koryo línea 2: cuida que la transición de las piernas no se cruce; mantén la encapsulación, controla el Ap Chagui, los golpes y el aterrizaje.",
    "Koryo línea 3: corrige la cámara de Yop Chagui, el recobro con rodilla al pecho, el torso alineado y el aterrizaje controlado.",
    "Taeguk 8 línea 1 y línea 2: trabaja golpes y transiciones de brazos y piernas, dedicándole 20 minutos por ejercicio.",
    "Si tienen dudas, consúltenme para corregirlo a tiempo."
  ];

  const FINAL_NOTES = [
    "Esta semana vamos a trabajar con mucha atención Koryo línea 2 y línea 3, cuidando especialmente piernas, transiciones, recobro, torso y aterrizajes.",
    "También vamos a repasar Taeguk 8 línea 1 y línea 2, enfocándonos en golpes y transiciones de brazos y piernas durante 20 minutos por ejercicio.",
    "No trabajes en automático. Haz cada repetición con intención, revisando si tus pies, brazos y torso están llegando al lugar correcto.",
    "Si tienes dudas, consúltame antes de repetir el error muchas veces. Es mejor corregirlo rápido y avanzar bien.",
    "Excelente trabajo que has hecho, a seguirle dando con todo."
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
    { numero:19, titulo:"Sesión 19 - Fuerza y movilidad isométrica", enfoque:"Fuerza y movilidad isométrica.", reps:"1 clase completa", tipo:"info", url:"" },
    { numero:20, titulo:"Sesión 20 - L2 Koryo Piernas", enfoque:"Trabajo técnico de piernas en Koryo línea 2.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/16Og476GDRlL64r1z7phbCT7WOq6SEcup/view?usp=drive_link" }
  ].map(s => ({...s, dia:"Clase grabada"}));

  function isSystem(){ return new URL(location.href).searchParams.get("alumno") === SYSTEM_ID; }
  function h(value){ const div=document.createElement("div"); div.textContent=String(value ?? ""); return div.innerHTML; }

  function mutatePlan(plan){
    if(!plan) return plan;
    plan.ciclo = CYCLE;
    plan.updated_at = UPDATED;
    if(Array.isArray(plan.sistemaTabs)){
      const poomsae = plan.sistemaTabs.find(tab => tab.id === "poomsae");
      if(poomsae){
        poomsae.frecuencias = [
          "Trabajo asignado esta semana: Koryo línea 2 y línea 3.",
          "También trabaja Taeguk 8 línea 1 y línea 2, dedicando 20 minutos por ejercicio.",
          "Si tienes dudas, consulta al Profesor Chanona antes de repetir el error."
        ];
        poomsae.indicacionesExtras = TEACHER_NOTES;
        poomsae.notasFinales = FINAL_NOTES;
      }
    }
    return plan;
  }

  const previousRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(previousRenderPage){
    renderPage = function(plan, alumno){
      if(isSystem()) mutatePlan(plan);
      previousRenderPage(plan, alumno);
      scheduleApply();
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

  function findSectionByTitle(words){
    return [...document.querySelectorAll("section")].find(section => {
      const title = (section.querySelector("h3")?.textContent || "").toLowerCase();
      return words.every(word => title.includes(word));
    });
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

  function updateTeacherNotes(){
    const section = findSectionByTitle(["indicaciones"]);
    const body = section?.querySelector(".sectionBody");
    if(!body) return;
    const title = section.querySelector("h3");
    if(title) title.textContent = "Indicaciones del profesor";
    const eyebrow = section.querySelector(".eyebrow");
    if(eyebrow) eyebrow.textContent = "Poomsae de la semana";
    body.innerHTML = renderNotes(TEACHER_NOTES);
  }

  function updateFinalNotes(){
    const section = findSectionByTitle(["notas"]);
    const body = section?.querySelector(".sectionBody");
    if(!body) return;
    const title = section.querySelector("h3");
    if(title) title.textContent = "Notas finales";
    const eyebrow = section.querySelector(".eyebrow");
    if(eyebrow) eyebrow.textContent = "Cómo trabajar esta semana";
    body.innerHTML = renderNotes(FINAL_NOTES);
  }

  function renderSession(session){
    const button = session.url
      ? `<div class="actions"><a class="action primary" href="${h(session.url)}" target="_blank" rel="noreferrer">▶ Reproducir</a></div>`
      : `<div class="systemNotice"><strong>Pendiente:</strong> falta agregar el link de esta clase para activar el botón de video.</div>`;
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
            <div class="badgeRow"><span class="badge">${session.numero}</span><span class="badge ${session.url ? "ok" : ""}">${session.url ? "VIDEO" : "INFO"}</span><span class="badge red">Clase</span></div>
          </div>
          ${button}
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
        <div class="systemNotice"><strong>Uso:</strong> Selecciona cualquier sesión y presiona <b>Ver sesión</b>. Las sesiones anteriores se mantienen guardadas.</div>
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
    if(document.getElementById("systemSession20Finder")) return;
    body.innerHTML = renderSelector(20);
    const select = document.getElementById("systemSession20Select");
    const button = document.getElementById("systemSession20Search");
    const results = document.getElementById("systemSession20Results");
    const show = () => {
      const session = SESSIONS.find(s => s.numero === Number(select.value)) || SESSIONS[SESSIONS.length - 1];
      results.innerHTML = renderSession(session);
    };
    button.onclick = show;
    select.onchange = () => {};
    show();
  }

  function apply(){
    if(!isSystem()) return;
    updateHero();
    updateTeacherNotes();
    updateFinalNotes();
    installSessionSelector();
  }

  function scheduleApply(){
    setTimeout(apply, 0);
    setTimeout(apply, 350);
    setTimeout(apply, 900);
  }

  document.addEventListener("click", () => {
    if(isSystem()) setTimeout(apply, 120);
  });

  scheduleApply();
})();
