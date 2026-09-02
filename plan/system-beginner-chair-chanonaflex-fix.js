(function(){
  const SYSTEM_ID = "chanonatkd_system";
  const TARGET_TITLE = "chanonaflex con silla";
  const FIXED_TITLE = "Chanonaflex - Con silla";
  const FIXED_URL = "https://drive.google.com/file/d/1JuMZJNBn1U6euSphL1qrAgu6bN89p_VM/view?usp=drive_link";
  const VERSION = "system-beginner-chair-chanonaflex-fix-20260901";

  function current(){
    return new URL(location.href).searchParams.get("alumno") || "";
  }

  function isSystem(){
    return current() === SYSTEM_ID;
  }

  function norm(value){
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[-–—]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function h(value){
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
  }

  function patchPlan(plan){
    if(!plan || !isSystem() || !Array.isArray(plan.sistemaTabs)) return plan;
    const beginner = plan.sistemaTabs.find(tab => tab.id === "principiantes");
    if(!beginner || !Array.isArray(beginner.chanonaflex)) return plan;

    beginner.chanonaflex.forEach(item => {
      if(norm(item && item.titulo) === TARGET_TITLE){
        item.titulo = FIXED_TITLE;
        item.tipo = "video";
        item.url = FIXED_URL;
      }
    });

    return plan;
  }

  const previousRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(previousRenderPage){
    renderPage = function(plan, alumno){
      patchPlan(plan);
      previousRenderPage(plan, alumno);
      schedulePatch();
    };
  }

  function patchRow(row){
    const titleNode = row.querySelector(".itemTitle");
    const title = titleNode?.textContent || "";
    if(norm(title) !== TARGET_TITLE) return;

    if(row.dataset.chairChanonaflexVersion === VERSION) return;
    row.dataset.chairChanonaflexVersion = VERSION;

    if(titleNode) titleNode.textContent = FIXED_TITLE;

    const badges = [...row.querySelectorAll(".badge")];
    const typeBadge = badges.find(badge => ["info", "video"].includes(norm(badge.textContent)));
    if(typeBadge){
      typeBadge.textContent = "VIDEO";
      typeBadge.classList.add("ok");
    }

    let actions = row.querySelector(".actions");
    if(!actions){
      actions = document.createElement("div");
      actions.className = "actions";
      row.appendChild(actions);
    }

    actions.innerHTML = `<a class="action primary" href="${h(FIXED_URL)}" target="_blank" rel="noreferrer">▶ Reproducir</a>`;
  }

  function patchDom(){
    if(!isSystem()) return;
    document.querySelectorAll(".itemRow").forEach(patchRow);
  }

  function schedulePatch(){
    setTimeout(patchDom, 0);
    setTimeout(patchDom, 250);
    setTimeout(patchDom, 700);
  }

  document.addEventListener("click", () => {
    setTimeout(patchDom, 120);
    setTimeout(patchDom, 450);
  }, true);

  document.addEventListener("change", () => {
    setTimeout(patchDom, 120);
    setTimeout(patchDom, 450);
  }, true);

  schedulePatch();
})();
