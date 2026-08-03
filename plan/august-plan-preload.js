(function(){
  const CICLO = "Lunes 3 al sábado 15 de agosto de 2026";
  const UPDATED = "Actualizado lun 3 de agosto de 2026";
  const RESUMEN = "Continuamos trabajando en base a nuestra estructura y a lo que necesitamos, por favor sigue las instrucciones tal y como te las dejo en el plan.";

  const G1 = new Set(["sr_jeremias","luis_holanda","alma_patricia","mario_lopez","evan_mael","martin_morales","daniele_biasetti","mtro_mariano_agustina","rodrigo_jalisco"]);
  const G2 = new Set(["karen_sanchez","rodrigo_gonzalez","leonardo_gonzalez","omar_azi","rafa_hernandez","scarlet_arianna","anna_georgia","patricio_leigh","ruben_guerrero"]);
  const G3 = new Set(["maria_ponce","zayre_zuleyka","diana_rodriguez","benyoced_calzadilla","emilio_cdmx","leticia_erguera"]);
  const TARGETS = new Set([...G1, ...G2, ...G3]);
  const NO_PATEO_UPDATE = new Set(["zayre_zuleyka","benyoced_calzadilla","emilio_cdmx"]);

  const LINKS = {
    ap3:"https://drive.google.com/open?id=1iUBOiNH65FT8PGaRTv8kT4gxDV2M6_Az&usp=drive_copy",
    ap2:"https://drive.google.com/open?id=1cdbZKTfQ1kzIFEfiUBQb7wusgY2fhXXa&usp=drive_copy",
    yop1:"https://drive.google.com/open?id=1IEhzAjlydHdjRSleXxWLABQfMTMsOMG1&usp=drive_copy",
    yop2:"https://drive.google.com/open?id=1QQtR5ObV1iiSqYx-GxFfOM1Lr1jnln70&usp=drive_copy",
    bandaCadera:"https://drive.google.com/open?id=1-mLzWj3XiEzCeul7LaIWuPzP39qQ6VtQ&usp=drive_copy",
    bandaTobillo:"https://drive.google.com/file/d/1Sux7kXiJImkagl3ye2nN2bMjqmJOa18O/view?usp=drive_link",
    pre:"https://drive.google.com/file/d/1mV7dkockaExAief_qW7RsMUuouwfMKM7/view?usp=sharing",
    basico:"https://drive.google.com/file/d/1jnSjVKx7mPFKco3HttgzmQUQgAsMm9Kt/view?usp=sharing",
    gluteo:"https://drive.google.com/file/d/1S4PWmc52Ot9k-IrXt38L-Spx0tjqj8Lr/view?usp=sharing",
    yopIso1:"https://drive.google.com/file/d/1ptuIEmfskjKeBhYfvW4JZVvW5hIIdCbx/view?usp=sharing",
    apIso1:"https://drive.google.com/file/d/1kbkZqudxFm3GqgXyrEiKM_ODwrMk3ppx/view?usp=sharing",
    benyFlex2:"https://drive.google.com/file/d/1PQZMTjewQ8-gdkR1cME_t55gC4bIkG4D/view?usp=drive_link",
    t1:"https://drive.google.com/open?id=1AP1did1HVwyMQy8byxTCLx9fy32IHhWM&usp=drive_copy",
    t2:"https://drive.google.com/open?id=153in4ZZtofBlf44rwqhrtyyIwBUrU9_8&usp=drive_copy",
    t3:"https://drive.google.com/open?id=1bquwnq6Y9_hq12xGclMuhlcyEqwbqCrl&usp=drive_copy",
    t5l1:"https://drive.google.com/open?id=1nS4odRmRR7Da-q3oGTI1UOYhuqKpzCah&usp=drive_copy",
    t5l2:"https://drive.google.com/open?id=1PVxwOGM_EDJm0SIrRumga-CUDv466-rj&usp=drive_copy",
    t5l3:"https://drive.google.com/open?id=1yFJM2dRU3-OJCETZq5i9iYkz72W2aOnT&usp=drive_copy",
    t7l1:"https://drive.google.com/open?id=1H4mcONZfDmg2fP7UA-nSSgXdPsg42lJC&usp=drive_copy",
    t7l2:"https://drive.google.com/open?id=12F-yyH4XJl3A4FRt_3biwxE0th5Mtsq1&usp=drive_copy",
    t7l3:"https://drive.google.com/open?id=1J8Nph6ySfCBldhOCVqTembIz0THwfxfk&usp=drive_copy",
    t7l4:"https://drive.google.com/open?id=1I4Re5fJg2XESqdKWWlZnHZSiwUc11AcE&usp=drive_copy",
    k1:"https://drive.google.com/open?id=1F8o4BF5j1dkZdPwxREY4JodRuFLwwRMK&usp=drive_copy",
    k2:"https://drive.google.com/open?id=1D2ScTJYlw1cCZw5SfoXn5QlF0LiSjOpv&usp=drive_copy",
    k22:"https://drive.google.com/open?id=1p90iF0JXyFoMq7AW28VYw4g4bQekSYgQ&usp=drive_copy",
    k3r:"https://drive.google.com/open?id=116eSAk3WUKVvXneFxAAyuyrG0mu7pwIi&usp=drive_copy",
    k3l:"https://drive.google.com/open?id=1d39Oz_ASS6Yb-BIUclGe9QrT-WP9BgwS&usp=drive_copy",
    k3c:"https://drive.google.com/open?id=12W8m2JmF9ICQiA6T1q8DB2TNpoSa_wNJ&usp=drive_copy",
    k4:"https://drive.google.com/open?id=1UHV_mYsNFt3pZIiQKAWXIYWjGcpoguwP&usp=drive_copy"
  };

  function currentAlumno(){ return new URL(location.href).searchParams.get("alumno") || ""; }
  function norm(v){ return String(v || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim(); }
  function item(titulo, dia, enfoque, reps, url){ return { titulo, dia, enfoque, reps, tipo:"video", url }; }
  function addUnique(arr, value){
    const list = Array.isArray(arr) ? [...arr] : [];
    const title = typeof value === "string" ? value : (value.titulo || value.enfoque || "");
    if(!list.some(x => norm(typeof x === "string" ? x : (x.titulo || x.enfoque || "")) === norm(title))) list.push(value);
    return list;
  }

  function makePateo(plan){
    const old = Array.isArray(plan.pateoTecnico) ? plan.pateoTecnico : [];
    const day = (i) => old[i]?.dia || old[i]?.dias || "MARTES - JUEVES - SÁBADO";
    const reps = (i,fb) => old[i]?.reps || fb;
    return [
      item("Ap Chagui 3 niveles", day(0), "Trabajar cámara, extensión y regreso de Ap Chagui con control.", reps(0,"8 a 10 reps por pierna / 2 series"), LINKS.ap3),
      item("Ap chaguis dos bloques", day(1), "Mejorar precisión, cámara y estabilidad de Ap Chagui.", reps(1,"8 a 10 reps por pierna / 2 series"), LINKS.ap2),
      item("Ejercicio 1 - Yop Chagui", day(2), "Preparar cámara, cadera y alineación antes de extender.", reps(2,"8 a 10 reps por pierna / 2 series"), LINKS.yop1),
      item("Ejercicio 2 - Yop Chagui", day(3), "Controlar extensión, regreso y postura del torso.", reps(3,"8 a 10 reps por pierna / 2 series"), LINKS.yop2),
      item("Torción de cadera con banda", day(4), "Trabajar control de cadera, dirección y resistencia con banda elástica.", reps(4,"8 a 10 reps por lado / 2 series"), LINKS.bandaCadera),
      item("Fortalecimiento de tobillo con banda", day(5), "Fortalecer tobillo, base y estabilidad para pateo técnico.", reps(5,"8 a 10 reps por pierna / 2 series"), LINKS.bandaTobillo)
    ];
  }

  function finalNotes(en){
    if(en) return [
      "Listen to your body if an exercise feels too heavy. Do only what you can tolerate while keeping technique and continuity as the priority.",
      "Focus on the fine details of preparation and execution. Stay conscious of every movement before it becomes automatic.",
      "Use the tools in this plan; they will help you a lot.",
      "Have an excellent training week and keep working properly."
    ];
    return [
      "Toma en cuenta que si algún ejercicio sientes que no aguantas, escucha a tu cuerpo y solo haz lo que puedas soportar, pero siempre dándole prioridad a exigirnos sin perder la técnica o la continuidad. Algunos dolores son necesarios, pero jamás debe arder cuando estiramos o sentirse como desgarre; el trabajo debe ser cómodo, pero a su vez exigente.",
      "Enfócate en los detalles finos de preparación y ejecución. No olvides estar consciente de los movimientos y no hacerlos de forma automática en este momento, ya que estamos en etapa de desarrollo de nuevos hábitos para que después se conviertan en movimientos automáticos, pero de forma correcta.",
      "Usa las herramientas que te dejo en este plan; te ayudarán mucho.",
      "Feliz entrenamiento y a seguirle dando como se debe."
    ];
  }

  const GENERAL_G2 = [
    "Algunos errores comunes son los siguientes: evita llevar el torso hacia el frente o hacia atrás al ejecutar Yop Chagui.",
    "Mantén la cabeza y el cuello firmes; no permitas que la cervical compense durante Ap Chagui o Yop Chagui.",
    "Mantén la pierna de apoyo completamente extendida al patear y usa glúteo, abdomen e isquiotibial para sostener la postura.",
    "En los codazos, prepara de pectoral a pectoral y evita que los puños se separen del cuerpo.",
    "Sostén los tiempos reglamentarios y mantén un ritmo claro de principio a fin."
  ];
  const PERSONAL = {
    karen_sanchez: ["T4: corrige la mano asistente, que debe quedar detrás del codo y no en la axila.", "T5: en línea 5, coordina mejor brazos y Yop Chagui; evita torcer el puño lateral.", "T6: las defensas a la cara deben llegar realmente a la cara, no al hombro."],
    rodrigo_gonzalez: ["T8: aterriza las Ap Chaguis saltando en la misma línea y aumenta explosividad en dobles golpes.", "Koryo: en línea 3, mantén el torso lineal y aumenta la confianza en Yop Chagui.", "Keumgang: evita adelantar la preparación de los golpes laterales; espera a que el talón llegue al piso."],
    leonardo_gonzalez: ["T8: en Bom Sogui lleva el peso 90% atrás y mantén la primera Twit Kubi atrás.", "T8: Batanson necesita más explosividad después del golpe.", "T8: prepara los golpes desde la cintura y usa más torsión del torso."],
    omar_azi: ["Sipjin: cuida dimensiones del primer movimiento y dirige la vista hacia donde avanzas.", "Sipjin: en Ap Chagui, guarda los puños directo a la cintura y golpea explosivo al aterrizar.", "Pyonwong: mantén cadera alineada y no cruces de más en Ap Sogui."],
    rafa_hernandez: ["Pyonwong: el torso debe regresar con la inercia, no de forma forzada.", "Pyonwong: mantén el torso abierto hasta el codazo de aterrizaje.", "Keumgang: aumenta velocidad y explosividad en el primer movimiento y en Santul Makki."],
    patricio_leigh: ["Keumgang: en línea 2, los brazos asistentes deben mantener flexión y bajar ligeramente al pecho.", "Taebaek: en Bom Sogui conserva 90/10 y evita pasar peso a la pierna delantera.", "Taebaek: prepara mejor los golpes de línea 3; no los dejes pasar de largo."],
    anna_georgia: ["T4: Ap Sogui should be shorter, about one foot distance.", "T4: reverse punch should travel more directly, not circularly.", "T5: close the fists fully and increase speed while keeping the torso almost frontal."],
    ruben_guerrero: ["Trabaja los errores comunes del grupo: torso alineado, apoyo fuerte, cámara clara y ritmo constante."]
  };
  const G3_COMMON = [
    "Algunos errores comunes son los siguientes: mantén el torso alineado, evita mover la cervical y no bajes la velocidad cuando aparece el cansancio.",
    "Cuida las preparaciones completas de brazos antes de ejecutar golpes, defensas o codazos.",
    "En patadas, marca cámara de rodilla, pierna de apoyo firme y recobro controlado."
  ];

  function assignPoomsae(plan, id){
    if(id === "maria_ponce"){
      plan.poomsaeDias = "Taeguk 7 líneas 1, 2, 3 y 4 / según indicación del Profesor Chanona";
      plan.poomsae = [
        item("Taeguk 7 - Línea 1", "Según indicación del Profesor Chanona", "Línea 1 de Taeguk 7 con precisión y ritmo.", "8 a 10 reps / 2 series", LINKS.t7l1),
        item("Taeguk 7 - Línea 2", "Según indicación del Profesor Chanona", "Línea 2 de Taeguk 7 con control de transiciones.", "8 a 10 reps / 2 series", LINKS.t7l2),
        item("Taeguk 7 - Línea 3", "Según indicación del Profesor Chanona", "Línea 3 de Taeguk 7 con postura, brazos y dirección.", "8 a 10 reps / 2 series", LINKS.t7l3),
        item("Taeguk 7 - Línea 4 / Kawi Makki", "Según indicación del Profesor Chanona", "Kawi Makki con precisión, fuerza y velocidad.", "8 a 10 reps / 2 series", LINKS.t7l4)
      ];
    }
    if(id === "diana_rodriguez"){
      plan.poomsaeDias = "Taeguk 1, Taeguk 2, Taeguk 3 y Koryo completo / según indicación del Profesor Chanona";
      plan.poomsae = [
        item("Taeguk 1 - Espejo paso a paso", "Según indicación del Profesor Chanona", "Referencia completa de Taeguk 1.", "1 repaso completo", LINKS.t1),
        item("Taeguk 2 completo", "Según indicación del Profesor Chanona", "Referencia completa de Taeguk 2.", "1 repaso completo", LINKS.t2),
        item("Taeguk 3 completo", "Según indicación del Profesor Chanona", "Referencia completa de Taeguk 3.", "1 repaso completo", LINKS.t3),
        item("Koryo línea 1 - Precisión + Timing", "Según indicación del Profesor Chanona", "Koryo línea 1 con timing y precisión.", "8 a 10 reps / 2 series", LINKS.k1),
        item("Koryo línea 2 - Ap Chagui + golpes", "Según indicación del Profesor Chanona", "Koryo línea 2 con Ap Chagui y golpes.", "8 a 10 reps / 2 series", LINKS.k2),
        item("Koryo línea 2.2", "Según indicación del Profesor Chanona", "Bloque complementario de Koryo línea 2.", "8 a 10 reps / 2 series", LINKS.k22),
        item("Koryo línea 3 - Lado derecho", "Según indicación del Profesor Chanona", "Yop Chagui, torso, cadera y control.", "15 reps / 1 serie", LINKS.k3r),
        item("Koryo línea 3 - Lado izquierdo", "Según indicación del Profesor Chanona", "Yop Chagui, torso, cadera y control.", "15 reps / 1 serie", LINKS.k3l),
        item("Koryo línea 3 - Concentración 8 seg", "Según indicación del Profesor Chanona", "Timing, respiración y postura.", "10 reps / 1 serie", LINKS.k3c),
        item("Koryo línea 4 - Golpes y defensas", "Según indicación del Profesor Chanona", "Última línea de Koryo con final fuerte.", "8 a 10 reps / 2 series", LINKS.k4)
      ];
    }
    if(id === "leticia_erguera"){
      plan.poomsaeDias = "Taeguk 5 líneas 1, 2 y 3 / según indicación del Profesor Chanona";
      plan.poomsae = [
        item("Taeguk 5 - Línea 1", "Según indicación del Profesor Chanona", "Línea 1 de Taeguk 5 con preparación clara.", "8 a 10 reps / 2 series", LINKS.t5l1),
        item("Taeguk 5 - Línea 2", "Según indicación del Profesor Chanona", "Línea 2 de Taeguk 5 con aterrizaje y golpe de revés.", "8 a 10 reps / 2 series", LINKS.t5l2),
        item("Taeguk 5 - Línea 3", "Según indicación del Profesor Chanona", "Sonnal y codazo con timing correcto.", "8 a 10 reps / 2 series", LINKS.t5l3)
      ];
    }
  }

  function apply(plan, id){
    if(!TARGETS.has(id) || !plan || typeof plan !== "object") return plan;
    plan.updated_at = UPDATED;
    plan.ciclo = CICLO;
    plan.enfoque = RESUMEN;
    plan.enfoque_corto = id === "anna_georgia" ? "August cycle: technical structure and assigned work" : "Ciclo 3 al 15 de agosto: estructura técnica y trabajo asignado";
    if(!NO_PATEO_UPDATE.has(id)) plan.pateoTecnico = makePateo(plan);
    if(id === "benyoced_calzadilla"){
      plan.chanonaflex = addUnique(plan.chanonaflex, item("Flexibilidad nivel 2 - Benyoced", "Según indicación del Profesor Chanona", "Clase complementaria de flexibilidad nivel 2.", "1 clase completa", LINKS.benyFlex2));
    }
    if(id === "emilio_cdmx"){
      plan.chanonaflexDias = "PRE-CHANONAFLEX + CHANONAFLEX NIVEL 1";
      plan.chanonaflex = [
        item("Pre-Chanonaflex - Estiramiento inicial", "Según indicación del Profesor Chanona", "Entrada inicial de flexibilidad.", "1 clase completa", LINKS.pre),
        item("Circuito Chanonaflex - Básico", "Según indicación del Profesor Chanona", "Trabajo base de Chanonaflex nivel 1.", "1 clase completa", LINKS.basico)
      ];
      plan.isometricoDias = "ISOMÉTRICO ACTIVO NIVEL 1: AP CHAGUI + YOP CHAGUI + GLÚTEO";
      plan.isometrico = [
        item("Glúteo y gancho - Isométrico activo", "Según indicación del Profesor Chanona", "Fuerza de glúteo y control de cadera.", "8 a 10 reps / 2 series", LINKS.gluteo),
        item("Isométrico Activo - Yop Chagui - Nivel 1", "Según indicación del Profesor Chanona", "Control de Yop Chagui nivel 1.", "8 a 10 reps / 2 series", LINKS.yopIso1),
        item("Isométrico Activo - Ap Chagui - Nivel 1", "Según indicación del Profesor Chanona", "Control de Ap Chagui nivel 1.", "8 a 10 reps / 2 series", LINKS.apIso1)
      ];
      plan.pateoTecnico = [];
      plan.poomsae = [];
      plan.poomsaeDias = "NO ASIGNADO EN ESTE CICLO";
    }
    assignPoomsae(plan, id);
    if(G2.has(id)){
      const extras = id === "anna_georgia" ? [
        "General focus: keep the torso aligned, stabilize the support leg and avoid moving the neck during kicks.",
        "Timing: hold the required positions and keep a clear rhythm from start to finish."
      ] : GENERAL_G2;
      plan.indicacionesExtras = [...extras, ...(PERSONAL[id] || [])];
    } else if(G3.has(id) && !["zayre_zuleyka","emilio_cdmx","benyoced_calzadilla"].includes(id)){
      plan.indicacionesExtras = [...G3_COMMON];
    }
    plan.notasFinales = finalNotes(id === "anna_georgia");
    return plan;
  }

  const originalFetch = window.fetch.bind(window);
  window.fetch = async function(input, init){
    const response = await originalFetch(input, init);
    try{
      const url = typeof input === "string" ? input : input.url;
      const id = currentAlumno();
      if(TARGETS.has(id) && /\/data\/planes\/|\.\.\/data\/planes\//.test(String(url || ""))){
        const clone = response.clone();
        const plan = await clone.json();
        apply(plan, id);
        const headers = new Headers(response.headers);
        headers.set("content-type", "application/json; charset=utf-8");
        return new Response(JSON.stringify(plan), { status: response.status, statusText: response.statusText, headers });
      }
    }catch(err){
      console.warn("August preload update skipped:", err);
    }
    return response;
  };
})();
