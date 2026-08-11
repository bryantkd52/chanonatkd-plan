(function(){
  const SYSTEM_ID = "chanonatkd_system";
  const isSystem = () => new URL(location.href).searchParams.get("alumno") === SYSTEM_ID;
  const html = value => {
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
  };

  const SESSIONS = [
    { titulo:"Primera sesión - Sabado 1 de abril 2026", enfoque:"Flexibilidad + Isometrico activo", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=1vOfIaIZoli63oh8HoVaKsqYjBVy0449A&usp=drive_copy" },
    { titulo:"Segunda sesión - Sabado 11 de abril 2026", enfoque:"Flexibilidad + Isometrico activo", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=18hVQbuObLo0aaXcScuJX2jwHBmm4-QC3&usp=drive_copy" },
    { titulo:"Tercera sesión - Sabado 18 de abril 2026", enfoque:"Flexibilidad", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=1C1BmLCXFONjyPI_zECb83ARagwu4fuWx&usp=drive_copy" },
    { titulo:"Cuarta sesión - Sabado 25 de abril 2026", enfoque:"Flexibilidad + isometrico + pateo frontal", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=1-YJlW2I-Xo1oIsCl8pcXMRsCbD6_cULC&usp=drive_copy" },
    { titulo:"Quinta sesión - Sabado 2 de mayo 2026", enfoque:"Flexibilidad + isometrico + pateo frontal", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=1y9Ci-8FLMFacLKNzvMqbVXKhVlW-6xhL&usp=drive_copy" },
    { titulo:"Sexta sesión - Sabado 9 de mayo 2026", enfoque:"Flexibilidad + movilidad + pateo circular", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=10Qz4PJQXgbViLA9XiGOAMAM0P3Wim8KK&usp=drive_copy" },
    { titulo:"Septima sesión - Sabado 16 de mayo 2026", enfoque:"Flexibilidad + movilidad + pateo de lado", reps:"1 serie", tipo:"video", url:"https://drive.google.com/file/d/1GArZcBDcHjb1BbVfZMjLoFx3r5V6Mgei/view?usp=drivesdk" },
    { titulo:"Octava sesión - Sabado 23 de mayo 2026", enfoque:"Introducción y control técnico de Ap y Yop Chagui", reps:"1 serie", tipo:"video", url:"https://drive.google.com/file/d/1WWjfSYqqFpyrRf7sfy1-vGlhu4kY1tbv/view?usp=sharing" },
    { titulo:"Novena sesión - Sabado 30 de mayo 2026", enfoque:"Flexibilidad intermedia + técnica de pateo + alineación de espalda", reps:"1 serie", tipo:"video", url:"https://drive.google.com/file/d/1ZbNrqfhmHSCEh1C0GXAWtYd9WA2qcOOb/view?usp=sharing" },
    { titulo:"Décima sesión - Glúteo, flex y técnico", enfoque:"Trabajo de glúteo, flexibilidad y técnica aplicada a diferentes pateos", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/open?id=1V0euQEZEl8cnfIbbUCGXUb_dzHgEQVqG&usp=drive_copy" },
    { titulo:"Onceava sesión - Trinidad pateo", enfoque:"Clase de pateo técnico, control y aplicación progresiva de los esfuerzos", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/open?id=1GSiQhqfXKssSHQx77dN9Svs7vFhTNroa&usp=drive_copy" },
    { titulo:"12va sesión - ChanonaTKD System", enfoque:"Clase acumulada del sistema. Continuar trabajando con base en la técnica vista durante la sesión.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1Fv9nYS4_4ik-d5Q2Ze6AO8u1qKfST-OC/view?usp=drive_link" },
    { titulo:"13va sesión - ChanonaTKD System", enfoque:"Clase acumulada del sistema. Continuar trabajando con base en la técnica vista durante la sesión.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1OtTSPo2XfByvrgmcYjzHskkE0vGbkKC2/view?usp=drive_link" },
    { titulo:"14va sesión - ChanonaTKD System", enfoque:"Clase acumulada del sistema. Continuar trabajando con base en la técnica vista durante la sesión.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1uLUeC9BU7gtkL2WC8fnSSVh2Ihb5HB8f/view?usp=drive_link" },
    { titulo:"15va sesión - ChanonaTKD System", enfoque:"Clase acumulada del sistema. Continuar trabajando con base en la técnica vista durante la sesión.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1kK8Fh9K0S-0AWCC-SK5nFuBrcRuVIfP6/view?usp=drive_link" },
    { titulo:"16va sesión - ChanonaTKD System", enfoque:"Clase acumulada del sistema. Continuar trabajando con base en la técnica vista durante la sesión.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1LauZUh_s79qjoMzFxfJQczSpPArrwD9Q/view?usp=drive_link" },
    { titulo:"Sesión 17 - Koryo transición - ChanonaTKD System", enfoque:"Koryo transición.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1inUGzsmycAMX7hcoszw3sOWJ0ZatLWq9/view?usp=drive_link" },
    { titulo:"Sesión 18 - Sonnal de Koryo y su trayectoria", enfoque:"Sonnal de Koryo y su trayectoria.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1IMVKsqFdebdkJnAOh71Ht5MAUcW_5KkQ/view?usp=drive_link" }
  ].map((session, index) => ({ ...session, dia:"Clase grabada", numero:index + 1 }));

  let sessionSelected = SESSIONS.length;

  function sessionOptions(){
    return SESSIONS.map(s => `<option value="${s.numero}" ${s.numero === sessionSelected ? "selected" : ""}>${html(s.titulo)}</option>`).join("");
  }

  function sessionFinder(){
    return `
      <div class="poomsaeFinder" id="sessionFinalFinder">
        <div class="poomsaeFinderGrid">
          <label><span>Clase grabada</span><select id="sessionSelect">${sessionOptions()}</select></label>
          <button id="sessionSearch" class="action primary" type="button">🔎 Ver sesión</button>
        </div>
        <div class="systemNotice"><strong>Uso:</strong> Selecciona la sesión que quieras repasar. Conforme el Profesor Chanona agregue más sesiones, aparecerán aquí.</div>
      </div>
      <div id="sessionResults" class="poomsaeSearchResults">
        <div class="poomsaeEmptyState"><strong>Clases disponibles:</strong><p>Selecciona una sesión y presiona <b>Ver sesión</b>.</p><p>Por defecto se deja lista la sesión más reciente.</p></div>
      </div>`;
  }

  function showSession(){
    const results = document.getElementById("sessionResults");
    if(!results) return;
    const session = SESSIONS.find(s => s.numero === Number(sessionSelected)) || SESSIONS[SESSIONS.length - 1];
    results.innerHTML = `<div class="poomsaeResultTitle"><strong>Resultado:</strong> ${html(session.titulo)}</div>${renderList([session], "Clase", "Clase grabada")}`;
  }

  function setupSessionFinder(){
    const select = document.getElementById("sessionSelect");
    const button = document.getElementById("sessionSearch");
    if(!select || !button) return;
    select.onchange = () => { sessionSelected = Number(select.value); };
    button.onclick = () => {
      sessionSelected = Number(select.value);
      showSession();
    };
  }

  function postprocessClasses(){
    if(!isSystem()) return;

    const destacado = document.getElementById("tab-poomsae-poomsae-destacado");
    if(destacado) destacado.remove();

    const clases = document.getElementById("tab-poomsae-clases");
    if(clases){
      const header = clases.querySelector(".sectionHead .eyebrow");
      if(header) header.textContent = "Selector de sesiones";
      const title = clases.querySelector("h3");
      if(title) title.textContent = "Clases grabadas";
      const body = clases.querySelector(".sectionBody");
      if(body && !document.getElementById("sessionFinalFinder")){
        body.innerHTML = sessionFinder();
        setupSessionFinder();
      }
    }
  }

  const content = document.getElementById("content");
  if(content){
    let queued = false;
    new MutationObserver(() => {
      if(queued) return;
      queued = true;
      setTimeout(() => {
        queued = false;
        postprocessClasses();
      }, 120);
    }).observe(content, { childList:true, subtree:true });
  }

  setTimeout(postprocessClasses, 250);
  setTimeout(postprocessClasses, 700);
})();