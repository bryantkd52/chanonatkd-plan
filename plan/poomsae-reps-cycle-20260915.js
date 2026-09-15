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

  function patchTask(task){
    const text = String(task || "");
    if(!text) return text;

    // Bryan indicó conservar cualquier tarea planteada explícitamente en 10 minutos.
    if(/\b10\s*min\b/i.test(text)) return text;

    return text
      .replace(/15\s*min\s*total\s*\(5\s*min\s*por\s*l[ií]nea\)/gi, "10 reps por línea")
      .replace(/15\s*min\s*total\s*\(5\s*min\s*per\s*line\)/gi, "10 reps per line")
      .replace(/5\s*min\s*por\s*l[ií]nea/gi, "10 reps por línea")
      .replace(/5\s*min\s*per\s*line/gi, "10 reps per line")
      .replace(/\(5\s*min\)/gi, "(10 reps)");
  }

  function patchScheduleText(value){
    const text = String(value || "");
    if(!text) return text;
    return text.split(/\s*\|\s*/).map(patchTask).join(" | ");
  }

  function patchPlan(plan){
    if(!plan || !TARGETS.has(current()) || !Array.isArray(plan.poomsae)) return plan;
    plan.poomsae = plan.poomsae.map(item => {
      if(!item || typeof item !== "object") return item;
      const copy = { ...item };
      if(copy.enfoque) copy.enfoque = patchScheduleText(copy.enfoque);
      if(copy.focus) copy.focus = patchScheduleText(copy.focus);
      return copy;
    });
    return plan;
  }

  const originalFetch = typeof window.fetch === "function" ? window.fetch.bind(window) : null;
  if(!originalFetch) return;

  window.fetch = async function(input, init){
    const response = await originalFetch(input, init);
    try{
      const url = typeof input === "string" ? input : (input && input.url) || "";
      if(TARGETS.has(current()) && /data\/planes\/[^?#/]+\.json/i.test(String(url))){
        const data = await response.clone().json();
        const patched = patchPlan(data);
        const headers = new Headers(response.headers);
        headers.set("content-type", "application/json; charset=utf-8");
        return new Response(JSON.stringify(patched), {
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
