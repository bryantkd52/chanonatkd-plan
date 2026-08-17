(function(){
  const TARGET = "leticia_erguera";
  const LINKS = {
    gluteo: "https://drive.google.com/file/d/1S4PWmc52Ot9k-IrXt38L-Spx0tjqj8Lr/view?usp=sharing",
    yopIso2: "https://drive.google.com/file/d/1CmRB-nx4GeoPqFrpaAbClkx71BL3Yxjw/view?usp=sharing",
    circuitoIso1: "https://drive.google.com/file/d/1aW943EQ7hfgPjMA0Cj55rUMQ2A3bEyXI/view?usp=sharing"
  };
  const ITEMS = [
    {
      titulo:"Glúteo y gancho - Isométrico activo - Intermedio",
      dia:"LUNES - MIÉRCOLES - VIERNES",
      enfoque:"Mantener el trabajo actual de glúteo, gancho, fuerza y control de cadera.",
      reps:"Según indicación del video",
      tipo:"video",
      url:LINKS.gluteo
    },
    {
      titulo:"Isométrico Activo - Yop Chagui - Nivel 2",
      dia:"LUNES - MIÉRCOLES - VIERNES",
      enfoque:"Mantener el trabajo actual de Yop Chagui nivel 2 con control de cadera y postura.",
      reps:"Según indicación del video",
      tipo:"video",
      url:LINKS.yopIso2
    },
    {
      titulo:"Circuito Isométrico Activo - Nivel 1",
      dia:"MARTES - JUEVES",
      enfoque:"Nota: hacer todo en márgenes de entre 5 a 7.",
      reps:"Según indicación del video",
      tipo:"video",
      url:LINKS.circuitoIso1
    }
  ];
  function current(){ return new URL(location.href).searchParams.get("alumno") || ""; }
  function h(value){ const div=document.createElement("div"); div.textContent=String(value ?? ""); return div.innerHTML; }
  function card(item,index){
    return `<article class="itemRow"><div class="itemTop"><div><p class="itemTitle">${h(item.titulo)}</p><div class="meta daysMeta"><b>Días:</b> ${h(item.dia)}</div><div class="meta"><b>Enfoque:</b> ${h(item.enfoque)}</div><div class="meta"><b>Reps:</b> ${h(item.reps)}</div></div><div class="badgeRow"><span class="badge">${index}</span><span class="badge ok">VIDEO</span><span class="badge red">Isométrico</span></div></div><div class="actions"><a class="action primary" href="${h(item.url)}" target="_blank" rel="noreferrer">▶ Reproducir</a></div></article>`;
  }
  function render(){
    if(current() !== TARGET) return;
    const section = document.getElementById("isometricos");
    if(!section) return;
    const body = section.querySelector(".sectionBody");
    const eye = section.querySelector(".eyebrow");
    if(eye) eye.textContent = "Fuerza y control";
    if(body) body.innerHTML = `<div class="cardsGrid">${ITEMS.map((item,i)=>card(item,i+1)).join("")}</div>`;
    const resumen = document.getElementById("resumen")?.querySelector(".sectionBody");
    if(resumen){
      [...resumen.querySelectorAll("li")].forEach(li => {
        const text = (li.textContent || "").toLowerCase();
        if(text.includes("isométr")) li.innerHTML = `<b>Isométricos:</b> Glúteo y Yop Chagui: LUNES - MIÉRCOLES - VIERNES / Circuito Isométrico Activo - Nivel 1: MARTES - JUEVES`;
      });
    }
  }
  const previousRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(previousRenderPage){
    renderPage = function(plan, alumno){
      if(current() === TARGET){
        plan.isometricoDias = "Glúteo y Yop Chagui: LUNES - MIÉRCOLES - VIERNES / Circuito Isométrico Activo - Nivel 1: MARTES - JUEVES";
        plan.isometrico = ITEMS;
      }
      previousRenderPage(plan, alumno);
      setTimeout(render,0);
    };
  }
  setTimeout(render,300);
  setTimeout(render,900);
  setTimeout(render,1700);
})();