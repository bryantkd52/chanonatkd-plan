(function(){
  const NANCY_ID = "nancy_vermilus";
  const NANCY = {
    nombre: "Nancy Vermilus",
    plan: "plan_nancy_vermilus.json",
    plan_activo: "Dragones",
    suscripcion_activa: "Próxima renovación por confirmar",
    link_entrenamiento: "https://meet.google.com/fyg-cjou-cop",
    objetivo_proximo: "Mejorar tecnica desde profundidad en Koryo"
  };

  const originalFetch = typeof window.fetch === "function" ? window.fetch.bind(window) : null;
  if(!originalFetch) return;

  window.fetch = async function(input, init){
    const response = await originalFetch(input, init);
    try{
      const url = typeof input === "string" ? input : (input && input.url) || "";
      if(String(url).includes("data/alumnos.json")){
        const data = await response.clone().json();
        data[NANCY_ID] = { ...(data[NANCY_ID] || {}), ...NANCY };
        const headers = new Headers(response.headers);
        headers.set("content-type", "application/json; charset=utf-8");
        return new Response(JSON.stringify(data), {
          status: response.status,
          statusText: response.statusText,
          headers
        });
      }
    }catch(error){
      return response;
    }
    return response;
  };
})();
