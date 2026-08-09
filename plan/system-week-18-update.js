(function(){
  const SYSTEM_ID = "chanonatkd_system";
  const CYCLE = "Lunes 10 al sábado 15 agosto 2026";
  const UPDATED = "Actualizado sábado 8 de agosto de 2026";
  const CHAIR_URL = "https://drive.google.com/file/d/1JuMZJNBn1U6euSphL1qrAgu6bN89p_VM/view?usp=drive_link";
  const COMMENT = "Esta semana enfoquen en la parte técnica de la sesión #18 y en el buscador procuren trabajar con la línea 3 tanto del lado derecho y el izquierdo.";
  const SESSION_18 = {
    numero: 18,
    titulo: "Sesión 18 - Sonnal de Koryo y su trayectoria",
    dia: "Clase grabada",
    enfoque: "Sonnal de Koryo y su trayectoria.",
    reps: "1 clase completa",
    tipo: "video",
    url: "https://drive.google.com/file/d/1IMVKsqFdebdkJnAOh71Ht5MAUcW_5KkQ/view?usp=drive_link"
  };

  const isSystem = () => new URL(location.href).searchParams.get("alumno") === SYSTEM_ID;
  const html = value => {
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
            headers: { "content-type": "application/json; charset=utf-8" }
          });
        }
      }catch(error){}
      return response;
    };
  }

  function updateHeroCycle(){
    if(!isSystem()) return;
    const sub = document.getElementById("planSub");
    if(sub && !sub.dataset.systemWeek18Cycle){
      const current = sub.textContent || "";
      sub.textContent = current.includes("• Para:")
        ? current.replace(/Ciclo:\s*.*?\s*•\s*Para:/, `Ciclo: ${CYCLE} • Para:`)
        : `Ciclo: ${CYCLE}`;
      sub.dataset.systemWeek18Cycle = "1";
    }
    const updated = document.getElementById("chipUpdated");
    if(updated) updated.textContent = `🕒 ${UPDATED}`;
  }

  function sessionCard(){
    return `
      <div class="poomsaeResultTitle"><strong>Resultado:</strong> ${html(SESSION_18.titulo)}</div>
      <div class="cardsGrid">
        <article class="itemRow">
          <div class="itemTop">
            <div>
              <p class="itemTitle">${html(SESSION_18.titulo)}</p>
              <div class="meta daysMeta"><b>Días:</b> ${html(SESSION_18.dia)}</div>
              <div class="meta"><b>Enfoque:</b> ${html(SESSION_18.enfoque)}</div>
              <div class="meta"><b>Reps:</b> ${html(SESSION_18.reps)}</div>
            </div>
            <div class="badgeRow"><span class="badge">18</span><span class="badge ok">VIDEO</span><span class="badge red">Clase</span></div>
          </div>
          <div class="actions"><a class="action primary" href="${html(SESSION_18.url)}" target="_blank" rel="noreferrer">▶ Reproducir</a></div>
        </article>
      </div>`;
  }

  function syncSession18(){
    if(!isSystem()) return;
    const select = document.getElementById("sessionSelect");
    const button = document.getElementById("sessionSearch");
    const results = document.getElementById("sessionResults");
    if(!select || !button || !results) return;

    if(!select.querySelector('option[value="18"]')){
      const option = document.createElement("option");
      option.value = "18";
      option.textContent = SESSION_18.titulo;
      select.appendChild(option);
    }
    select.value = "18";

    if(!button.dataset.systemWeek18Bound){
      button.dataset.systemWeek18Bound = "1";
      button.addEventListener("click", () => {
        if(select.value === "18") results.innerHTML = sessionCard();
      });
    }
  }

  function fixChairLink(){
    if(!isSystem()) return;
    document.querySelectorAll(".itemRow").forEach(row => {
      const title = row.querySelector(".itemTitle");
      if(!title) return;
      const text = title.textContent.toLowerCase();
      if(text.includes("chanonaflex") && text.includes("silla")){
        const link = row.querySelector("a.action");
        if(link) link.href = CHAIR_URL;
      }
    });
  }

  function addTeacherComment(){
    if(!isSystem()) return;
    const sections = Array.from(document.querySelectorAll("section.section"));
    const section = sections.find(sec => {
      const h3 = sec.querySelector("h3");
      return h3 && h3.textContent.trim().toLowerCase() === "indicaciones del profesor";
    });
    if(!section) return;
    const body = section.querySelector(".sectionBody");
    if(!body || document.getElementById("systemWeek18TeacherComment")) return;
    const notice = document.createElement("div");
    notice.className = "systemNotice teacherNotesNotice";
    notice.id = "systemWeek18TeacherComment";
    notice.innerHTML = `<strong>Indicaciones del profesor:</strong> ${html(COMMENT)}`;
    body.insertBefore(notice, body.firstChild);
  }

  function run(){
    updateHeroCycle();
    syncSession18();
    fixChairLink();
    addTeacherComment();
  }

  const content = document.getElementById("content");
  if(content){
    let queued = false;
    new MutationObserver(() => {
      if(queued) return;
      queued = true;
      setTimeout(() => { queued = false; run(); }, 120);
    }).observe(content, { childList:true, subtree:true });
  }

  setTimeout(run, 250);
  setTimeout(run, 900);
  setTimeout(run, 1600);
})();
