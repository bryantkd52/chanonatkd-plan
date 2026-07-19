(function(){
  const content = document.getElementById("content");
  if(!content) return;

  function labelFor(collapsed){
    return collapsed
      ? '<span class="sectionToggleIcon">＋</span><span class="sectionToggleText">abrir</span>'
      : '<span class="sectionToggleIcon">－</span><span class="sectionToggleText">cerrar</span>';
  }

  function prepareSection(section){
    if(!section || section.dataset.toggleReady === "true") return;

    const head = section.querySelector(":scope > .sectionHead");
    const body = section.querySelector(":scope > .sectionBody");
    if(!head || !body) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "sectionToggle";
    button.setAttribute("aria-expanded", "true");
    button.innerHTML = labelFor(false);

    button.addEventListener("click", function(event){
      event.preventDefault();
      event.stopPropagation();

      const collapsed = section.classList.toggle("sectionCollapsed");
      button.setAttribute("aria-expanded", String(!collapsed));
      button.innerHTML = labelFor(collapsed);
    });

    head.appendChild(button);
    section.dataset.toggleReady = "true";
  }

  function prepareAllSections(){
    content.querySelectorAll(".section").forEach(prepareSection);
  }

  const observer = new MutationObserver(prepareAllSections);
  observer.observe(content, { childList:true, subtree:true });

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", prepareAllSections);
  }else{
    prepareAllSections();
  }
})();
