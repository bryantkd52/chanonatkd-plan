(function(){
  const TARGET_ID = "ximena_palacios";
  const OBJECTIVE = "G10 Zacatecas";

  const originalFetch = typeof window.fetch === "function" ? window.fetch.bind(window) : null;
  if(!originalFetch) return;

  window.fetch = async function(input, init){
    const response = await originalFetch(input, init);
    try{
      const url = typeof input === "string" ? input : (input && input.url) || "";
      if(String(url).includes("data/alumnos.json")){
        const data = await response.clone().json();
        if(data && data[TARGET_ID]){
          data[TARGET_ID].objetivo_proximo = OBJECTIVE;
        }
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
