(function(){
  const SYSTEM_ID = "chanonatkd_system";
  const CYCLE = "Lunes 10 al sábado 15 agosto 2026";
  const UPDATED = "Actualizado lunes 10 de agosto de 2026";
  const CHAIR_URL = "https://drive.google.com/file/d/1JuMZJNBn1U6euSphL1qrAgu6bN89p_VM/view?usp=drive_link";
  const COMMENT = "Esta semana enfoquen en la parte técnica de la sesión #18 y en el buscador procuren trabajar con la línea 3 tanto del lado derecho y el izquierdo.";

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

  const isSystem = () => new URL(location.href).searchParams.get("alumno") === SYSTEM_ID;
  const h = value => {
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
  };

  const originalFetch = window.fetch ? window.fetch.bind(window) : null;
  if(originalFetch){
    window.fetch = async function(input, init){
      const response = await originalFetch(input, init);
      try{
        const url = typeof input === "string" ? input : (input && input.url) || "";
        if(url.includes("plan_chanonatkd_system.json")){
          const data = await response.clone().json();
          data.ciclo = CYCLE;
          data.updated_at = UPDATED;
          return new Response(JSON.stringify(data), {
            status: response.status,
            statusText: response.statusText,
            headers: { "content-type":"application/json; charset=utf-8" }
          });
        }
      }catch(e){}
      return response;
    };
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
      <div class="poomsaeFinder" id="systemWeek18StableFinder" data-ready="1">
        <div class="poomsaeFinderGrid">
          <label><span>Clase grabada</span><select id="systemWeek18SessionSelect">
            ${SESSIONS.map(s => `<option value="${s.numero}" ${s.numero === selected ? "selected" : ""}>${h(s.titulo)}</option>`).join("")}
          </select></label>
          <button id="systemWeek18SessionSearch" class="action primary" type="button">🔎 Ver sesión</button>
        </div>
        <div class="systemNotice"><strong>Uso:</strong> Selecciona cualquier sesión y presiona <b>Ver sesión</b>. No se eliminan links; todas las clases quedan guardadas aquí.</div>
      </div>
      <div id="systemWeek18SessionResults" class="poomsaeSearchResults"></div>`;
  }

  function installSessionSelector(){
    if(!isSystem()) return false;
    const section = document.getElementById("tab-poomsae-clases");
    if(!section) return false;
    const body = section.querySelector(".sectionBody");
    if(!body) return false;
    const title = section.querySelector("h3");
    const eyebrow = section.querySelector(".eyebrow");
    if(title) title.textContent = "Clases grabadas";
    if(eyebrow) eyebrow.textContent = "Selector de sesiones";
    if(body.dataset.systemWeek18Stable === "1") return true;

    body.dataset.systemWeek18Stable = "1";
    const selected = 18;
    body.innerHTML = renderSelector(selected);
    const select = document.getElementById("systemWeek18SessionSelect");
    const button = document.getElementById("systemWeek18SessionSearch");
    const results = document.getElementById("systemWeek18SessionResults");
    const show = () => {
      const session = SESSIONS.find(s => s.numero === Number(select.value)) || SESSIONS[SESSIONS.length - 1];
      results.innerHTML = renderSession(session);
    };
    button.onclick = show;
    select.onchange = () => {};
    show();
    return true;
  }

  function updateChairLink(){
    if(!isSystem()) return;
    document.querySelectorAll(".itemRow").forEach(row => {
      const title = row.querySelector(".itemTitle")?.textContent || "";
      if(title.toLowerCase().includes("chanonaflex") && title.toLowerCase().includes("silla")){
        const link = row.querySelector("a.action");
        if(link && link.href !== CHAIR_URL) link.href = CHAIR_URL;
      }
    });
  }

  function updateTeacherComment(){
    if(!isSystem()) return;
    const sections = [...document.querySelectorAll("section")];
    const target = sections.find(sec => (sec.querySelector("h3")?.textContent || "").toLowerCase().includes("indicaciones del profesor"));
    const body = target?.querySelector(".sectionBody");
    if(!body || body.dataset.systemWeek18Comment === "1") return;
    body.dataset.systemWeek18Comment = "1";
    const note = document.createElement("div");
    note.className = "systemNotice teacherNotesNotice";
    note.innerHTML = `<strong>Indicaciones del profesor:</strong> ${h(COMMENT)}`;
    body.prepend(note);
  }

  function updateHero(){
    if(!isSystem()) return;
    const sub = document.getElementById("planSub");
    if(sub){
      const current = sub.textContent || "";
      sub.textContent = current.includes("• Para:")
        ? current.replace(/Ciclo:\s*.*?\s*•\s*Para:/, `Ciclo: ${CYCLE} • Para:`)
        : `Ciclo: ${CYCLE}`;
    }
    const updated = document.getElementById("chipUpdated");
    if(updated) updated.textContent = `🕒 ${UPDATED}`;
  }

  let installed = false;
  function run(){
    if(!isSystem()) return;
    updateHero();
    updateChairLink();
    updateTeacherComment();
    if(!installed) installed = installSessionSelector();
  }

  const content = document.getElementById("content");
  if(content){
    const observer = new MutationObserver(() => {
      requestAnimationFrame(run);
    });
    observer.observe(content, { childList:true, subtree:true });
  }
  setTimeout(run, 250);
  setTimeout(run, 900);
  setTimeout(run, 1600);
})();
