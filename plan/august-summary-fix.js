(function(){
  const CICLO = "Lunes 3 al sábado 15 de agosto de 2026";
  const RESUMEN = "Continuamos trabajando en base a nuestra estructura y a lo que necesitamos, por favor sigue las instrucciones tal y como te las dejo en el plan.";
  const TARGETS = new Set([
    "sr_jeremias","luis_holanda","alma_patricia","mario_lopez","evan_mael","martin_morales","daniele_biasetti","mtro_mariano_agustina","rodrigo_jalisco",
    "karen_sanchez","rodrigo_gonzalez","leonardo_gonzalez","omar_azi","rafa_hernandez","scarlet_arianna","anna_georgia","patricio_leigh","ruben_guerrero",
    "maria_ponce","zayre_zuleyka","diana_rodriguez","benyoced_calzadilla","emilio_cdmx","leticia_erguera"
  ]);

  function alumnoId(){
    return new URL(location.href).searchParams.get("alumno") || "";
  }

  function applySummaryFix(plan){
    const id = alumnoId();
    if(!TARGETS.has(id) || !plan) return;
    plan.ciclo = CICLO;
    plan.enfoque = RESUMEN;
  }

  const oldRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(oldRenderPage){
    renderPage = function(plan, alumno){
      applySummaryFix(plan);
      return oldRenderPage(plan, alumno);
    };
  }
})();
