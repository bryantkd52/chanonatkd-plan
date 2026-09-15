(function(){
  const TARGET_PLAN = "plan_ximena_palacios.json";

  const POOMSAE = [
    {
      titulo: "Martes 15 de septiembre",
      dia: "MARTES 15 DE SEPTIEMBRE",
      enfoque: "Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Koryo (Líneas 2 y 4): 10 min total (5 min por línea) | Keumgang (Línea 3): 10 min / 1 serie | Taebaek (Líneas 2, 3 y 4): bloque técnico de líneas centrales | Poomsae completa: Taeguk 7 (5 repeticiones).",
      reps: "Respeta exactamente los tiempos y repeticiones indicados en este bloque.",
      tipo: "info"
    },
    {
      titulo: "Miércoles 16 de septiembre",
      dia: "MIÉRCOLES 16 DE SEPTIEMBRE",
      enfoque: "Taeguk 7 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 8 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Koryo (Líneas 1 y 3): 20 min total (10 min por línea) | Keumgang (Jakdari Sogui): 10 min / 1 serie / con calcetas | Pyeonwon (lados izquierdo y derecho): trabajo bilateral | Sipjin (Línea 1): bloque inicial de control | Poomsae completa: Taeguk 8 (5 repeticiones).",
      reps: "Respeta exactamente los tiempos y repeticiones indicados en este bloque.",
      tipo: "info"
    },
    {
      titulo: "Jueves 17 de septiembre",
      dia: "JUEVES 17 DE SEPTIEMBRE",
      enfoque: "Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Koryo (Líneas 2 y 4): 10 min total (5 min por línea) | Keumgang (Línea 3): 10 min / 1 serie | Taebaek (Líneas 1 y 5): bloque de extremos | Poomsae completa: Koryo (5 repeticiones).",
      reps: "Respeta exactamente los tiempos y repeticiones indicados en este bloque.",
      tipo: "info"
    },
    {
      titulo: "Viernes 18 de septiembre",
      dia: "VIERNES 18 DE SEPTIEMBRE",
      enfoque: "Taeguk 7 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 8 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Koryo (Líneas 1 y 3): 20 min total (10 min por línea) | Pyeonwon completo: 10 repeticiones a plena consciencia | Sipjin (Línea 2 completo): desarrollo completo de la segunda sección | Poomsae completa: Keumgang (5 repeticiones).",
      reps: "Respeta exactamente los tiempos y repeticiones indicados en este bloque.",
      tipo: "info"
    },
    {
      titulo: "Sábado 19 de septiembre",
      dia: "SÁBADO 19 DE SEPTIEMBRE",
      enfoque: "Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Keumgang (Jakdari Sogui): 10 min / 1 serie / con calcetas | Taebaek (Líneas 2, 3 y 4): refuerzo de líneas centrales | Poomsae completa: Taebaek (5 repeticiones).",
      reps: "Respeta exactamente los tiempos y repeticiones indicados en este bloque.",
      tipo: "info"
    },
    {
      titulo: "Lunes 21 de septiembre",
      dia: "LUNES 21 DE SEPTIEMBRE",
      enfoque: "Taeguk 7 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 8 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Koryo (Líneas 1 y 3): 20 min total (10 min por línea) | Taebaek (Líneas 1 y 5): estructura inicial y final | Sipjin (Línea 1): repaso de línea inicial | Poomsae completa: Pyeonwon (5 repeticiones).",
      reps: "Respeta exactamente los tiempos y repeticiones indicados en este bloque.",
      tipo: "info"
    },
    {
      titulo: "Martes 22 de septiembre",
      dia: "MARTES 22 DE SEPTIEMBRE",
      enfoque: "Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Koryo (Líneas 2 y 4): 10 min total (5 min por línea) | Keumgang (Línea 3): 10 min / 1 serie | Pyeonwon completo: 10 repeticiones a consciencia | Poomsae completa: Sipjin (5 repeticiones).",
      reps: "Respeta exactamente los tiempos y repeticiones indicados en este bloque.",
      tipo: "info"
    }
  ];

  const originalFetch = typeof window.fetch === "function" ? window.fetch.bind(window) : null;
  if(!originalFetch) return;

  window.fetch = async function(input, init){
    const response = await originalFetch(input, init);
    try{
      const url = typeof input === "string" ? input : (input && input.url) || "";
      if(String(url).includes(`/data/planes/${TARGET_PLAN}`) || String(url).includes(`data/planes/${TARGET_PLAN}`)){
        const data = await response.clone().json();
        data.poomsae = POOMSAE.map(item => ({ ...item }));
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
