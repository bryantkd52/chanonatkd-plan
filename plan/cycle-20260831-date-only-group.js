(function(){
  const TARGETS = new Set([
    "benyoced_calzadilla",
    "emilio_cdmx",
    "sr_jeremias",
    "alma_patricia",
    "evan_mael",
    "mtro_mariano_agustina",
    "mariano_agustina",
    "rodrigo_barba",
    "rodrigo_jalisco"
  ]);

  const CYCLE = "Lunes 31 de agosto al sábado 12 de septiembre del 2026";
  const UPDATED = "Actualizado martes 1 de septiembre de 2026";

  function current(){
    return new URL(location.href).searchParams.get("alumno") || "";
  }

  function isTarget(){
    return TARGETS.has(current());
  }

  function applyOnlyDates(plan){
    if(!plan || !isTarget()) return plan;
    plan.ciclo = CYCLE;
    plan.updated_at = UPDATED;
    return plan;
  }

  const previousRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(previousRenderPage){
    renderPage = function(plan, alumno){
      applyOnlyDates(plan);
      previousRenderPage(plan, alumno);
      scheduleHeroFix();
    };
  }

  function updateHero(){
    if(!isTarget()) return;

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

  function scheduleHeroFix(){
    setTimeout(updateHero, 0);
    setTimeout(updateHero, 350);
    setTimeout(updateHero, 900);
  }

  scheduleHeroFix();
})();
