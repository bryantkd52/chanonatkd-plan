(function(){
  const TARGETS = new Set([
    "karen_sanchez",
    "rodrigo_gonzalez",
    "leonardo_gonzalez",
    "omar_azi",
    "rafa_hernandez",
    "scarlet_arianna",
    "scarlett_arianna",
    "anna_georgia",
    "patricio_leigh",
    "maria_ponce",
    "leticia_erguera"
  ]);

  const YOP_VIDEO_URL = "https://drive.google.com/file/d/1ZQ3ud3bkEQJcvSnUelWDVR4ECdwv1_Vn/view?usp=drive_link";

  function current(){
    return new URL(location.href).searchParams.get("alumno") || "";
  }

  function isTarget(){
    return TARGETS.has(current());
  }

  function clean(value){
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function isYopFloorBalance(title){
    const text = clean(title);
    return text.includes("yop chagui") && (
      (text.includes("toque piso") && text.includes("equilibrio")) ||
      (text.includes("floor touch") && text.includes("balance"))
    );
  }

  function addVideoToPlanList(list){
    if(!Array.isArray(list)) return list;
    list.forEach(item => {
      if(isYopFloorBalance(item && item.titulo)){
        item.tipo = "video";
        item.url = YOP_VIDEO_URL;
      }
    });
    return list;
  }

  const previousRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(previousRenderPage){
    renderPage = function(plan, alumno){
      if(isTarget()){
        addVideoToPlanList(plan && plan.pateoTecnico);
      }
      previousRenderPage(plan, alumno);
      schedulePatch();
    };
  }

  function patchRow(row){
    const title = row.querySelector(".itemTitle")?.textContent || "";
    if(!isYopFloorBalance(title)) return;

    const badge = [...row.querySelectorAll(".badge")].find(el => clean(el.textContent) === "info");
    if(badge){
      badge.textContent = "VIDEO";
      badge.classList.add("ok");
    }

    let actions = row.querySelector(".actions");
    if(!actions){
      actions = document.createElement("div");
      actions.className = "actions";
      row.appendChild(actions);
    }

    actions.innerHTML = `<a class="action primary" href="${YOP_VIDEO_URL}" target="_blank" rel="noreferrer">▶ Reproducir</a>`;
  }

  function patchDom(){
    if(!isTarget()) return;
    document.querySelectorAll(".itemRow").forEach(patchRow);
  }

  function schedulePatch(){
    setTimeout(patchDom, 0);
    setTimeout(patchDom, 250);
    setTimeout(patchDom, 750);
    setTimeout(patchDom, 1500);
  }

  document.addEventListener("click", () => {
    setTimeout(patchDom, 120);
    setTimeout(patchDom, 500);
  }, true);

  document.addEventListener("change", () => {
    setTimeout(patchDom, 120);
    setTimeout(patchDom, 500);
  }, true);

  schedulePatch();
})();
