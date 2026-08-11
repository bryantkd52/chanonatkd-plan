(function(){
  const SYSTEM_ID = "chanonatkd_system";
  const STORAGE_KEY = "chanonatkd-system-session-selected";
  const isSystem = () => new URL(location.href).searchParams.get("alumno") === SYSTEM_ID;
  const html = value => {
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
  };

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
    { numero:18, titulo:"Sesión 18 - Sonnal de Koryo y su trayectoria", enfoque:"Sonnal de Koryo y su trayectoria.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1IMVKsqFdebdkJnAOh71Ht5MAUcW_5KkQ/view?usp=drive_link" }
  ].map(s => ({...s, dia:"Clase grabada"}));

  function getSelected(){
    const raw = window.__chanonaSelectedSystemSession || (() => { try{return localStorage.getItem(STORAGE_KEY);}catch{return null;} })();
    const n = Number(raw);
    return SESSIONS.some(s => s.numero === n) ? n : 18;
  }

  function setSelected(n){
    const value = SESSIONS.some(s => s.numero === Number(n)) ? Number(n) : 18;
    window.__chanonaSelectedSystemSession = value;
    try{ localStorage.setItem(STORAGE_KEY, String(value)); }catch{}
    return value;
  }

  function options(selected){
    return SESSIONS.map(s => `<option value="${s.numero}" ${s.numero === selected ? "selected" : ""}>${html(s.titulo)}</option>`).join("");
  }

  function renderSelector(selected){
    return `
      <div class="poomsaeFinder" id="systemSessionStableFinder" data-session-selector-fix="1">
        <div class="poomsaeFinderGrid">
          <label><span>Clase grabada</span><select id="systemSessionStableSelect">${options(selected)}</select></label>
          <button id="systemSessionStableSearch" class="action primary" type="button">🔎 Ver sesión</button>
        </div>
        <div class="systemNotice"><strong>Uso:</strong> Selecciona cualquier sesión y presiona <b>Ver sesión</b>. Las clases quedan guardadas desde la primera hasta la más reciente.</div>
      </div>
      <div id="systemSessionStableResults" class="poomsaeSearchResults"></div>`;
  }

  function renderSession(n){
    const session = SESSIONS.find(s => s.numero === Number(n)) || SESSIONS[SESSIONS.length - 1];
    return `
      <div class="poomsaeResultTitle"><strong>Resultado:</strong> ${html(session.titulo)}</div>
      <div class="cardsGrid">
        <article class="itemRow">
          <div class="itemTop">
            <div>
              <p class="itemTitle">${html(session.titulo)}</p>
              <div class="meta daysMeta"><b>Días:</b> ${html(session.dia)}</div>
              <div class="meta"><b>Enfoque:</b> ${html(session.enfoque)}</div>
              <div class="meta"><b>Reps:</b> ${html(session.reps)}</div>
            </div>
            <div class="badgeRow"><span class="badge">${session.numero}</span><span class="badge ok">VIDEO</span><span class="badge red">Clase</span></div>
          </div>
          <div class="actions"><a class="action primary" href="${html(session.url)}" target="_blank" rel="noreferrer">▶ Reproducir</a></div>
        </article>
      </div>`;
  }

  function findClassesBody(){
    const section = document.getElementById("tab-poomsae-clases") || document.getElementById("clases");
    if(!section) return null;
    const eyebrow = section.querySelector(".sectionHead .eyebrow, .eyebrow");
    const title = section.querySelector("h3");
    const body = section.querySelector(".sectionBody");
    if(eyebrow) eyebrow.textContent = "Selector de sesiones";
    if(title) title.textContent = "Clases grabadas";
    return body;
  }

  function bind(){
    const select = document.getElementById("systemSessionStableSelect");
    const button = document.getElementById("systemSessionStableSearch");
    const results = document.getElementById("systemSessionStableResults");
    if(!select || !button || !results || button.dataset.bound === "1") return;
    button.dataset.bound = "1";
    select.onchange = () => { setSelected(select.value); };
    button.onclick = () => {
      const selected = setSelected(select.value);
      select.value = String(selected);
      results.innerHTML = renderSession(selected);
    };
  }

  function apply(){
    if(!isSystem()) return;
    const body = findClassesBody();
    if(!body) return;
    const selected = getSelected();
    const hasStable = document.getElementById("systemSessionStableFinder");
    if(!hasStable || !body.contains(hasStable)){
      body.innerHTML = renderSelector(selected);
    }
    bind();
    const select = document.getElementById("systemSessionStableSelect");
    const results = document.getElementById("systemSessionStableResults");
    if(select) select.value = String(selected);
    if(results && !results.innerHTML.trim()){
      results.innerHTML = renderSession(selected);
    }
  }

  const content = document.getElementById("content");
  if(content){
    let queued = false;
    new MutationObserver(() => {
      if(queued) return;
      queued = true;
      setTimeout(() => { queued = false; apply(); }, 80);
    }).observe(content, { childList:true, subtree:true });
  }

  setTimeout(apply, 200);
  setTimeout(apply, 600);
  setTimeout(apply, 1200);
})();
