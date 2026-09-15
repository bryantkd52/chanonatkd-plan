(function(){
  const TARGETS = new Set([
    "karen_sanchez",
    "rodrigo_gonzalez",
    "leonardo_gonzalez",
    "omar_azi",
    "rafa_hernandez",
    "scarlet_arianna",
    "anna_georgia",
    "patricio_leigh",
    "maria_ponce",
    "leticia_erguera",
    "ximena_palacios"
  ]);

  function current(){
    return new URL(location.href).searchParams.get("alumno") || "";
  }

  function isTarget(){
    return TARGETS.has(current());
  }

  function esc(value){
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
  }

  function clean(text){
    return String(text || "").replace(/\s+/g," ").trim().replace(/[.]$/," ").trim();
  }

  function splitTasks(text){
    const raw = clean(text);
    if(!raw) return [];
    return raw.split(/\s*\|\s*/).map(clean).filter(Boolean);
  }

  function taskParts(raw){
    let text = clean(raw);
    let title = text;
    let sub = "";
    let detail = "";

    const colonAt = text.indexOf(":");
    if(colonAt >= 0){
      title = clean(text.slice(0, colonAt));
      detail = clean(text.slice(colonAt + 1));
    }

    const sourceForParen = colonAt >= 0 ? title : text;
    const paren = sourceForParen.match(/^(.*?)\s*\(([^()]*)\)$/);
    if(paren){
      title = clean(paren[1]);
      sub = clean(paren[2]);
      if(colonAt < 0) detail = "";
    }else if(colonAt < 0){
      const looseParen = text.match(/^(.*?)\s*\(([^()]*)\)\s*(.*)$/);
      if(looseParen){
        title = clean(looseParen[1]);
        sub = clean(looseParen[2]);
        detail = clean(looseParen[3]);
      }
    }

    return { title, sub, detail };
  }

  function renderTask(raw){
    const p = taskParts(raw);
    return `<article class="poomsaeTask">
      <p class="poomsaeTaskTitle">${esc(p.title || raw)}</p>
      ${p.sub ? `<p class="poomsaeTaskSub">${esc(p.sub)}</p>` : ""}
      ${p.detail ? `<p class="poomsaeTaskDetail">${esc(p.detail)}</p>` : ""}
    </article>`;
  }

  function renderSchedule(items, english){
    if(!Array.isArray(items) || !items.length){
      return `<div class="poomsaeEmpty">${english ? "No Poomsae work assigned for this cycle." : "No hay trabajo de Poomsae asignado en este ciclo."}</div>`;
    }

    return `<div class="poomsaeSchedule">${items.map((item) => {
      const date = item?.titulo || item?.title || item?.dia || item?.dias || (english ? "Training day" : "Día de entrenamiento");
      const tasks = splitTasks(item?.enfoque || item?.focus || "");
      const fallback = tasks.length ? tasks : [clean(item?.reps || "")].filter(Boolean);
      const note = clean(item?.reps || "");
      const count = fallback.length;
      const countLabel = english ? `${count} ${count === 1 ? "task" : "tasks"}` : `${count} ${count === 1 ? "tarea" : "tareas"}`;

      return `<article class="poomsaeDayCard">
        <div class="poomsaeDayHead">
          <h4 class="poomsaeDayDate">${esc(date)}</h4>
          <span class="poomsaeDayCount">${esc(countLabel)}</span>
        </div>
        <div class="poomsaeTaskGrid">${fallback.map(renderTask).join("")}</div>
        ${note ? `<p class="poomsaeDayNote">${esc(note)}</p>` : ""}
      </article>`;
    }).join("")}</div>`;
  }

  function applyReadablePoomsae(plan){
    if(!isTarget()) return;
    const section = document.getElementById("poomsae");
    const body = section?.querySelector(".sectionBody");
    if(!body) return;
    const english = current() === "anna_georgia";
    body.innerHTML = renderSchedule(Array.isArray(plan?.poomsae) ? plan.poomsae : [], english);
  }

  const previousRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(previousRenderPage){
    renderPage = function(plan, alumno){
      const result = previousRenderPage(plan, alumno);
      applyReadablePoomsae(plan);
      return result;
    };
  }
})();
