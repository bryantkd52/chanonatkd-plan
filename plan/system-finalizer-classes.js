(function(){
  const SYSTEM_ID = "chanonatkd_system";
  const VERSION = "system-classes-v20-nolag-20260901";
  const LATEST_SESSION = 20;

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
    { numero:19, titulo:"Sesión 19 - Fuerza y movilidad isométrica", enfoque:"Fuerza y movilidad isométrica.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/open?id=1NSCuFYlIfeF170u_DYJutjSsb4S7J14_&usp=drive_copy" },
    { numero:20, titulo:"Sesión 20 - L2 Koryo Piernas", enfoque:"Trabajo técnico de piernas en Koryo línea 2.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/open?id=16Og476GDRlL64r1z7phbCT7WOq6SEcup&usp=drive_copy" }
  ].map(session => ({ ...session, dia:"Clase grabada" }));

  function isSystem(){
    return new URL(location.href).searchParams.get("alumno") === SYSTEM_ID;
  }

  function h(value){
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
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
            <div class="badgeRow">
              <span class="badge">${session.numero}</span>
              <span class="badge ok">VIDEO</span>
              <span class="badge red">Clase</span>
            </div>
          </div>
          <div class="actions"><a class="action primary" href="${h(session.url)}" target="_blank" rel="noreferrer">▶ Reproducir</a></div>
        </article>
      </div>`;
  }

  function renderSelector(selected){
    const options = SESSIONS.map(session => `
      <option value="${session.numero}" ${session.numero === selected ? "selected" : ""}>${h(session.titulo)}</option>`).join("");

    return `
      <div class="poomsaeFinder" id="sessionFinalFinder" data-version="${VERSION}">
        <div class="poomsaeFinderGrid">
          <label><span>Clase grabada</span><select id="sessionSelect">${options}</select></label>
          <button id="sessionSearch" class="action primary" type="button">🔎 Ver sesión</button>
        </div>
        <div class="systemNotice"><strong>Uso:</strong> Selecciona cualquier sesión y presiona <b>Ver sesión</b>. Las clases 1 a 20 se mantienen guardadas con sus links.</div>
      </div>
      <div id="sessionResults" class="poomsaeSearchResults"></div>`;
  }

  function setupSessionFinder(){
    const select = document.getElementById("sessionSelect");
    const button = document.getElementById("sessionSearch");
    const results = document.getElementById("sessionResults");
    if(!select || !button || !results) return;

    const show = () => {
      const selected = Number(select.value) || LATEST_SESSION;
      const session = SESSIONS.find(item => item.numero === selected) || SESSIONS[SESSIONS.length - 1];
      results.innerHTML = renderSession(session);
    };

    button.onclick = show;
    show();
  }

  function installClasses(){
    if(!isSystem()) return;

    const destacado = document.getElementById("tab-poomsae-poomsae-destacado");
    if(destacado) destacado.remove();

    const section = document.getElementById("tab-poomsae-clases");
    if(!section) return;

    const eyebrow = section.querySelector(".sectionHead .eyebrow, .eyebrow");
    const title = section.querySelector("h3");
    const body = section.querySelector(".sectionBody");
    if(eyebrow) eyebrow.textContent = "Selector de sesiones";
    if(title) title.textContent = "Clases grabadas";
    if(!body) return;

    if(body.dataset.sessionFinalVersion === VERSION && document.getElementById("sessionFinalFinder")) return;

    body.dataset.sessionFinalVersion = VERSION;
    body.innerHTML = renderSelector(LATEST_SESSION);
    setupSessionFinder();
  }

  function scheduleInstall(){
    setTimeout(installClasses, 0);
    setTimeout(installClasses, 150);
    setTimeout(installClasses, 450);
  }

  document.addEventListener("click", scheduleInstall, true);
  document.addEventListener("change", scheduleInstall, true);

  scheduleInstall();
  setTimeout(scheduleInstall, 900);
})();
