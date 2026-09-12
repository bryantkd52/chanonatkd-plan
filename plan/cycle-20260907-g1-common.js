(function(){
  const TARGETS = new Set([
    "sr_jeremias",
    "mario_lopez",
    "evan_mael",
    "daniele_biasetti",
    "mtro_mariano_agustina",
    "mariano_agustina",
    "rodrigo_jalisco"
  ]);

  const VERSION = "cycle-20260907-g1-common-3";
  const CYCLE = "Lunes 7 al sábado 12 de septiembre de 2026";
  const UPDATED = "Actualizado viernes 11 de septiembre de 2026";
  const FOCUS_SHORT = "Ciclo 7 al 12 de septiembre: flexibilidad inicial, fuerza isométrica y pateo técnico";
  const FOCUS = "Continuamos trabajando este ciclo del lunes 7 al sábado 12 de septiembre de 2026 con una estructura clara: Chanonaflex antes de entrenar, fuerza isométrica por días y pateo técnico para cuidar base, control, cadera y equilibrio.";

  const LINKS = {
    pre: "https://drive.google.com/file/d/1mV7dkockaExAief_qW7RsMUuouwfMKM7/view?usp=sharing",
    bloque: "https://drive.google.com/file/d/13FYNM5nMd65YYPXZC9iuQTQ_dJUvnH1m/view?usp=sharing",
    gluteo: "https://drive.google.com/file/d/1S4PWmc52Ot9k-IrXt38L-Spx0tjqj8Lr/view?usp=sharing",
    yopIso1: "https://drive.google.com/file/d/1ptuIEmfskjKeBhYfvW4JZVvW5hIIdCbx/view?usp=sharing",
    apIso1: "https://drive.google.com/file/d/1kbkZqudxFm3GqgXyrEiKM_ODwrMk3ppx/view?usp=sharing",
    caderaBanda: "https://drive.google.com/open?id=1-mLzWj3XiEzCeul7LaIWuPzP39qQ6VtQ&usp=drive_copy",
    circuitoElevacion: "https://drive.google.com/open?id=1Jrwnad5LdAZdG1d_75e2QI7U2sEVLcSP&usp=drive_copy",
    apPared: "https://drive.google.com/file/d/1CX6PkR9CrTaOvZxrZPKTyc1mPfcfJ4wp/view?usp=drive_link",
    tobilloBanda: "https://drive.google.com/file/d/1Sux7kXiJImkagl3ye2nN2bMjqmJOa18O/view?usp=drive_link",
    sentadillaAp: "https://drive.google.com/file/d/1erT1zgvLi0aFMDJb562Y2t7wNwmGWPmj/view?usp=sharing",
    yopToquePiso: "https://drive.google.com/open?id=1ZQ3ud3bkEQJcvSnUelWDVR4ECdwv1_Vn&usp=drive_copy"
  };

  function current(){
    return new URL(location.href).searchParams.get("alumno") || "";
  }

  function isTarget(){
    return TARGETS.has(current());
  }

  function item(titulo, dia, enfoque, reps, tipo, url){
    const data = { titulo, dia, enfoque, reps, tipo: tipo || (url ? "video" : "info") };
    if(url) data.url = url;
    return data;
  }

  const CHANONAFLEX = [
    item("Pre-Chanonaflex - Estiramiento inicial", "ANTES DE ENTRENAR", "Preparar el cuerpo antes del trabajo principal.", "Según indicación del video", "video", LINKS.pre),
    item("Estiramiento inicial con bloque", "ANTES DE ENTRENAR", "Usar el bloque para mejorar apertura, alineación y control sin forzar el movimiento.", "Según indicación del video", "video", LINKS.bloque)
  ];

  const ISOMETRICOS = [
    item("Glúteo y gancho - Isométrico activo - Intermedio", "LUNES - VIERNES", "Trabajar fuerza de glúteo, control de cadera y base para gancho.", "Según indicación del video", "video", LINKS.gluteo),
    item("Isométrico Activo - Yop Chagui - Nivel 1", "MARTES - JUEVES", "Trabajar cámara, pierna de apoyo, control de cadera y alineación.", "Según indicación del video", "video", LINKS.yopIso1),
    item("Isométrico activo - Ap Chagui - Nivel 1", "MIÉRCOLES - SÁBADO", "Trabajar fuerza de Ap Chagui, elevación de rodilla y recobro limpio.", "Según indicación del video", "video", LINKS.apIso1)
  ];

  const PATEO = [
    item("Torción de cadera con banda elástica", "LUNES - MIÉRCOLES - VIERNES", "Trabajar dirección de cadera, resistencia y control.", "10 reps / 2 series", "video", LINKS.caderaBanda),
    item("Circuito elevacion + sostener + circular", "LUNES - MIÉRCOLES - VIERNES", "Trabajar elevación de rodilla, sostén y control del pateo circular.", "10 reps / 3 series", "video", LINKS.circuitoElevacion),
    item("Ap Chagui contra pared", "LUNES - VIERNES", "Trabajar alineación del Ap Chagui, pierna de apoyo y postura.", "10 reps / 2 series", "video", LINKS.apPared),
    item("Ejercicio de fortalecimiento de tobillo con banda", "LUNES A VIERNES", "Fortalecer tobillo y base de apoyo para un pateo más limpio.", "10 reps por lado / 1 serie", "video", LINKS.tobilloBanda),
    item("Sentadilla Ap Chagui", "LUNES - VIERNES", "Trabajar fuerza de piernas y control técnico de Ap Chagui.", "10 reps (ambas es una) / 2 series", "video", LINKS.sentadillaAp),
    item("Yop Chagui + toque piso + equilibrio", "LUNES - MIÉRCOLES", "Trabajar cámara de Yop Chagui, toque controlado al piso y equilibrio sin prisa.", "5 reps / 2 series", "video", LINKS.yopToquePiso)
  ];

  function cloneItems(items){
    return items.map(entry => ({ ...entry }));
  }

  function patchPlan(plan){
    if(!plan || !isTarget()) return plan;
    plan.ciclo = CYCLE;
    plan.updated_at = UPDATED;
    plan.enfoque_corto = FOCUS_SHORT;
    plan.enfoque = FOCUS;
    plan.chanonaflexDias = "Antes de entrenar";
    plan.isometricoDias = "lunes y viernes / martes y jueves / miércoles y sábado";
    plan.pateoDias = "lunes, miércoles y viernes / martes, jueves y sábado según ejercicio";
    plan.chanonaflex = cloneItems(CHANONAFLEX);
    plan.isometrico = cloneItems(ISOMETRICOS);
    plan.pateoTecnico = cloneItems(PATEO);
    return plan;
  }

  function verifyHeroOnce(){
    if(!isTarget()) return;
    const sub = document.getElementById("planSub");
    if(sub && !sub.textContent.includes(CYCLE)){
      const para = sub.textContent.includes("• Para:") ? sub.textContent.split("• Para:").pop().trim() : "";
      sub.textContent = para ? `Ciclo: ${CYCLE} • Para: ${para}` : `Ciclo: ${CYCLE}`;
    }
    const focus = document.getElementById("chipFocus");
    if(focus && !focus.textContent.includes("7 al 12 de septiembre")){
      focus.textContent = `🎯 Enfoque: ${FOCUS_SHORT}`;
    }
    const updated = document.getElementById("chipUpdated");
    if(updated && !updated.textContent.includes(UPDATED)){
      updated.textContent = `🕒 ${UPDATED}`;
    }
  }

  const previousRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(previousRenderPage){
    renderPage = function(plan, alumno){
      const result = previousRenderPage(patchPlan(plan), alumno);
      requestAnimationFrame(verifyHeroOnce);
      return result;
    };
  }
})();
