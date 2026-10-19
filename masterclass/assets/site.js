/* ChanonaTKD - Interacciones compartidas para las cinco páginas.
   Las clases y textos provisionales viven en content.js y testimonios-ejemplo.js.
   Eventos preparados para dataLayer; falta conectar un proveedor de analítica. */
(function(){
  "use strict";
  const page=document.body.dataset.page||"home";
  const base=document.body.dataset.base||"./";
  const info=window.CTKD_CONTENT||{};
  const $=(s,root=document)=>root.querySelector(s);
  const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const narrow=s=>String(s||"").replace(/[^a-zA-Z0-9_\-\. ]/g,"").slice(0,60);
  function track(name,data={}){
    const payload={event:"ctkd_"+name,pagina:page,...data};
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push(payload);
    document.dispatchEvent(new CustomEvent("ctkd:analytics",{detail:payload}));
  }
  const themeBtn=$(".themeToggle");
  function themeUI(){
    const t=document.documentElement.dataset.theme||"dark";
    $(".themeIcon",themeBtn).textContent=t==="light"?"☀":"☾";
    $(".themeText",themeBtn).textContent=t==="light"?"Claro":"Oscuro";
    themeBtn.setAttribute("aria-label",t==="light"?"Cambiar a modo oscuro":"Cambiar a modo claro");
  }
  themeUI();
  themeBtn.addEventListener("click",()=>{
    const value=(document.documentElement.dataset.theme==="dark")?"light":"dark";
    document.documentElement.dataset.theme=value;
    try{localStorage.setItem("chanonatkd_theme",value)}catch(e){}
    themeUI();
  });

  const menuBtn=$(".menuToggle"),nav=$(".siteNav");
  function menu(open){
    menuBtn.setAttribute("aria-expanded",String(open));
    menuBtn.setAttribute("aria-label",open?"Cerrar menú":"Abrir menú de navegación");
    nav.classList.toggle("is-open",open);
  }
  menuBtn.addEventListener("click",()=>menu(menuBtn.getAttribute("aria-expanded")!=="true"));
  nav.addEventListener("click",e=>{if(e.target.closest("a"))menu(false)});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&menuBtn.getAttribute("aria-expanded")==="true"){menu(false);menuBtn.focus()}});

  const utmNames=["utm_source","utm_medium","utm_campaign","utm_content"];
  const incoming=new URLSearchParams(window.location.search);
  try{for(const k of utmNames){const v=incoming.get(k);if(v)sessionStorage.setItem("ctkd_"+k,narrow(v))}}catch(e){}
  const referral={};
  try{for(const k of utmNames){const v=sessionStorage.getItem("ctkd_"+k);if(v)referral[k]=v}}catch(e){}
  track("pagina_visitada",{programa:page,...referral});
  $$("[data-wa]").forEach(link=>{
    link.addEventListener("click",()=>{
      track("whatsapp_click",{programa:page,accion:link.textContent.trim(),...referral});
      const msg=decodeURIComponent(link.dataset.wa||"");
      const origin=Object.entries(referral).map(([k,v])=>k+"="+v).join(" · ");
      link.href="https://wa.me/529987406579?text="+encodeURIComponent(msg+(origin?"\nOrigen: "+origin:""));
      if(/dos partes/i.test(link.textContent))track("consulta_pago_dividido",{programa:"academia"});
    });
  });
  $$("[data-track]").forEach(btn=>btn.addEventListener("click",()=>track(btn.dataset.track)));

  function videoId(input){
    try{
      const u=new URL(input);
      let id="";
      if(u.hostname==="youtu.be")id=u.pathname.slice(1);
      else if(["www.youtube.com","youtube.com","m.youtube.com"].includes(u.hostname)){
        id=u.pathname.startsWith("/embed/")?u.pathname.split("/")[2]:u.searchParams.get("v");
      }
      return /^[a-zA-Z0-9_-]{11}$/.test(id)?id:"";
    }catch(e){return""}
  }
  function videoFrame(url,label,autoplay=false){
    const id=videoId(url);
    if(!id)return document.createTextNode("El enlace del video no está disponible todavía.");
    const frame=document.createElement("iframe");
    frame.src="https://www.youtube-nocookie.com/embed/"+id+"?rel=0&playsinline=1"+(autoplay?"&autoplay=1":"");
    frame.title=label;frame.loading="lazy";
    frame.allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    frame.allowFullscreen=true;
    return frame;
  }

  function initLessons(){
    const box=$("[data-lessons]");
    if(!box)return;
    const program=box.dataset.lessons;
    const items=info.lessons?.[program]||[];
    if(items.length!==3)return;
    const navBox=$(".lessonsNav",box),player=$(".playerHolder",box);
    const count=$(".lessonCounter",box),current=$(".lessonCurrent",box);
    const summary=$(".lessonSummary",box);
    const prev=$(".lessonPrev",box),next=$(".lessonNext",box);
    let selected=0;
    items.forEach((item,i)=>{
      const button=document.createElement("button");button.type="button";button.className="lessonTab";
      button.classList.add(["lessonTab--flex","lessonTab--kick","lessonTab--poomsae"][i]);
      button.innerHTML='<span class="lessonTabIndex">0'+(i+1)+'</span><span class="lessonTabContent"><strong>'+esc(["Flexibilidad","Pateo","Poomsae"][i])+'</strong><small>Clase '+(i+1)+' de 3</small></span><span class="lessonTabArrow" aria-hidden="true">↗</span>';
      button.addEventListener("click",()=>select(i,true));navBox.append(button);
    });
    function select(i,record){
      if(i<0||i>=items.length)return;
      selected=i;const item=items[i];
      count.textContent="Clase "+(i+1)+" de 3";current.textContent=item.label;
      summary.textContent=item.summary||"";
      $$(".lessonTab",navBox).forEach((b,j)=>b.setAttribute("aria-pressed",String(j===i)));
      prev.disabled=i===0;next.disabled=i===2;
      const nextName=i<2?items[i+1].label:""; 
      next.innerHTML='<span class="lessonArrow" aria-hidden="true">➜</span><span class="lessonBtnCopy">Siguiente'+(nextName?': '+esc(nextName):"")+'</span>';
      prev.innerHTML='<span class="lessonArrow" aria-hidden="true">←</span><span class="lessonBtnCopy">Anterior'+(i>0?': '+esc(items[i-1].label):"")+'</span>';
      box.dataset.currentLesson=String(i+1);
      // Cambiar de clase elimina el iframe anterior y detiene el audio.
      player.replaceChildren();
      const play=document.createElement("button");
      play.type="button";play.className="playerLaunch";
      play.innerHTML="<span aria-hidden='true'>▶</span>Reproducir clase de "+esc(item.label)+"<small>Video de ejemplo pendiente de sustituir</small>";
      play.addEventListener("click",()=>{
        player.replaceChildren(videoFrame(item.url,"Miniclase "+item.label+" - "+program,true));
        track("miniclase_iniciada",{programa:program,clase:item.label,numero:i+1,provisional:Boolean(item.provisional)});
      });player.append(play);
      if(record)track("avance_miniclase",{programa:program,clase:item.label,numero:i+1});
    }
    prev.addEventListener("click",()=>select(selected-1,true));
    next.addEventListener("click",()=>select(selected+1,true));
    select(0,false);
  }
  initLessons();

  function initTestimonios(){
    const section=$(".testimonySection");if(!section)return;
    const show=(data,isExample)=>{
      const grid=$("[data-testimonials]");grid.replaceChildren();
      for(const x of data){
        const card=document.createElement("article");card.className="glass testimony";
        const slot=document.createElement("div");slot.className="imageSlot";
        if(x.image){
          const img=document.createElement("img");img.className="studentPortrait";
          img.src=String(x.image);img.alt="Fotografía de "+String(x.name||"alumno");
          img.loading="lazy";
          img.style.objectPosition=/^(center|[0-9]{1,3}% [0-9]{1,3}%)$/.test(x.imagePosition||"center")?x.imagePosition:"center";
          slot.append(img);
        }else slot.innerHTML="Imagen<br>opcional<br>1:1";
        const text=document.createElement("div");text.className="testimonyText";
        const name=document.createElement("strong");name.textContent=String(x.name||"Alumno");
        const quote=document.createElement("q");quote.textContent=String(x.text||"");
        text.append(name);
        if(isExample){
          const lab=document.createElement("span");lab.className="exampleLabel";
          lab.textContent="Ejemplo de testimonio — pendiente de sustituir";
          const stars=document.createElement("span");stars.className="stars";
          stars.textContent="★★★★★ (ejemplo visual, no verificado)";
          text.append(lab,stars);
        }
        text.append(quote);card.append(slot,text);grid.append(card);
      }
      section.hidden=!data.length;
    };
    const real=window.CTKD_TESTIMONIALS||[];
    if(real.length){show(real,false);return}
    // Solo se muestran los diez testimonios ficticios mediante ?revision=1.
    if(new URLSearchParams(location.search).get("revision")!=="1")return;
    const script=document.createElement("script");
    script.src=base+"assets/testimonios-ejemplo.js";
    script.onload=()=>show(window.CTKD_EXAMPLE_TESTIMONIALS||[],true);
    document.head.append(script);
  }
  initTestimonios();

  function initPlanDemo(){
    const dialog=$("#planDemoDialog"),app=$("#planDemoApp"),open=$("[data-open-demo]");
    if(!dialog||!app||!open)return;
    const close=$("[data-close-demo]");
    let returnFocus=null,plan=null;
    let selectedSection="resumen",selectedDay="Todos";
    const sections=[
      ["resumen","Organización"],
      ["calentamiento","Calentamiento"],
      ["chanonaflex","ChanonaFlex"],
      ["isometrico","Isométrico activo"],
      ["pateoTecnico","Pateo técnico"],
      ["poomsae","Poomsae"],
      ["clases","Clases"],
      ["indicaciones","Indicaciones"]
    ];
    const days=["Todos","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    const infoLines=obj=>[obj.enfoque&&"<p><strong>Objetivo:</strong> "+esc(obj.enfoque)+"</p>",obj.reps&&"<p><strong>Series / repeticiones / descanso:</strong> "+esc(obj.reps)+"</p>",obj.dia&&"<p><strong>Días:</strong> "+esc(obj.dia)+"</p>",obj.tags?.length&&"<p><strong>Trabajo:</strong> "+esc(obj.tags.join(", "))+"</p>"].filter(Boolean).join("");
    function matchingDay(obj){
      if(selectedDay==="Todos")return true;
      const label=(obj.dia||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
      if(/antes de cada entrenamiento|segun indicacion/.test(label))return true;
      return label.includes(selectedDay.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""));
    }
    function cards(items){
      const list=(items||[]).filter(matchingDay);
      if(!list.length)return '<div class="demoEmpty">No hay ejercicios asignados para este día en esta sección del plan original.</div>';
      return list.map((x,i)=>'<article class="demoExercise"><h4>'+esc(x.titulo)+'</h4>'+infoLines(x)+(x.reproductor?'<button class="action secondary" type="button" data-video-demo="'+i+'">▶ Reproducir ejemplo</button><div class="demoVideoBox" hidden></div>':'')+'</article>').join("");
    }
    function render(){
      const tab=plan.tab;
      let inner="";
      if(selectedSection==="resumen"){
        inner='<div class="demoIntro"><span><b>Nivel:</b> Principiantes</span><span><b>Ciclo:</b> '+esc(plan.ciclo)+'</span></div>'+
          '<h3 class="demoHeading">Indicaciones de organización</h3><ul class="demoList">'+(tab.frecuencias||[]).map(x=>"<li>"+esc(x)+"</li>").join("")+"</ul>"+
          '<p class="demoNotice"><b>Frecuencias:</b><br>'+esc(tab.chanonaflexDias)+"<br>"+esc(tab.isometricoDias)+"<br>"+esc(tab.pateoDias)+"</p>";
      }else if(selectedSection==="clases"){
        inner='<p class="demoNotice">La pestaña Principiantes del plan vigente no tiene una clase grabada específica asignada. El System ofrece un histórico en su pestaña Clases; este reproductor es únicamente una prueba de interfaz.</p><button class="action secondary" type="button" data-video-demo="clase">▶ Reproducir video provisional</button><div class="demoVideoBox" hidden></div>';
      }else if(selectedSection==="indicaciones"){
        const txt=[...(plan.indicacionesGenerales||[]),...(tab.indicacionesExtras||[]),...(tab.notasFinales||[])];
        inner='<h3 class="demoHeading">Indicaciones del profesor</h3><ol class="demoList">'+txt.map(x=>"<li>"+esc(x)+"</li>").join("")+"</ol>";
      }else{
        const mapping={calentamiento:"calentamiento",chanonaflex:"chanonaflex",isometrico:"isometrico",pateoTecnico:"pateoTecnico",poomsae:"poomsae"};
        inner='<h3 class="demoHeading">'+esc(sections.find(x=>x[0]===selectedSection)?.[1]||"")+'</h3>'+cards(tab[mapping[selectedSection]]||[]);
        if(selectedSection==="poomsae"&&!(tab.poomsae||[]).length)inner='<p class="demoNotice">'+esc(tab.poomsaeDias||"Poomsae no asignado en este nivel.")+'</p>'+inner;
      }
      const tabs='<div class="demoTabs" aria-label="Secciones del plan">'+sections.map(([k,label])=>'<button type="button" data-demo-section="'+k+'" aria-pressed="'+(k===selectedSection)+'">'+esc(label)+'</button>').join("")+'</div>';
      const dayNav=(["resumen","clases","indicaciones"].includes(selectedSection)?"":'<div class="demoDays" aria-label="Filtrar por día">'+days.map(d=>'<button type="button" data-demo-day="'+esc(d)+'" aria-pressed="'+(d===selectedDay)+'">'+esc(d)+'</button>').join("")+"</div>");
      app.innerHTML='<p class="demoNotice">'+esc(plan.aviso)+'</p>'+tabs+dayNav+'<div class="demoContent">'+inner+"</div>";
      $$("[data-demo-section]",app).forEach(b=>b.addEventListener("click",()=>{selectedSection=b.dataset.demoSection;selectedDay="Todos";render()}));
      $$("[data-demo-day]",app).forEach(b=>b.addEventListener("click",()=>{selectedDay=b.dataset.demoDay;render()}));
      $$("[data-video-demo]",app).forEach(btn=>btn.addEventListener("click",()=>{
        // Solo un video puede estar reproduciéndose dentro de esta demostración.
        $$(".demoVideoBox",app).forEach(p=>{p.hidden=true;p.replaceChildren()});
        const holder=$(".demoVideoBox",btn.parentElement);
        if(holder){holder.hidden=false;holder.append(videoFrame(info.previewVideos?.plan||info.videoEjemplo,"Video de ejemplo de System",true))}
        track("reproduccion_demo_plan",{seccion:selectedSection,provisional:true});
      }));
    }
    async function show(){
      returnFocus=document.activeElement;
      if(typeof dialog.showModal==="function")dialog.showModal();
      else dialog.setAttribute("open","");
      track("abrir_muestra_plan",{nivel:"Principiantes"});
      app.innerHTML="<p>Cargando copia independiente del plan…</p>";
      try{
        if(!plan){
          // La copia local precargada permite revisar desde un HTML abierto directamente
          // (file://), donde los navegadores bloquean fetch() de JSON por CORS.
          if(window.CTKD_BEGINNERS_DEMO && window.CTKD_BEGINNERS_DEMO.tab){
            plan=window.CTKD_BEGINNERS_DEMO;
          }else{
            const response=await fetch(base+"assets/system-beginners-demo.json");
            if(!response.ok)throw new Error("No se encontró el archivo de la demostración");
            plan=await response.json();
          }
        }
        selectedSection="resumen";selectedDay="Todos";render();
      }catch(error){app.innerHTML='<p class="demoNotice">No fue posible cargar el plan de demostración. '+esc(error.message)+'</p>'}
    }
    function hide(){
      $$(".demoVideoBox iframe",dialog).forEach(f=>f.src="about:blank");
      if(dialog.open&&typeof dialog.close==="function")dialog.close();else dialog.removeAttribute("open");
    }
    open.addEventListener("click",show);
    close.addEventListener("click",hide);
    dialog.addEventListener("click",e=>{if(e.target===dialog)hide()});
    dialog.addEventListener("close",()=>{
      $$(".demoVideoBox iframe",dialog).forEach(f=>f.src="about:blank");
      if(returnFocus&&typeof returnFocus.focus==="function")returnFocus.focus();
    });
    // Escape es nativo en <dialog>; el evento close devuelve el foco.
  }
  initPlanDemo();
})();
