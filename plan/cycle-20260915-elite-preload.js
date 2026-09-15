(function(){
  const TARGET_IDS = new Set([
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

  const TARGET_PLAN_FILES = new Map([
    ["plan_karen_sanchez.json", "karen_sanchez"],
    ["plan_rodrigo_gonzalez.json", "rodrigo_gonzalez"],
    ["plan_leonardo_gonzalez.json", "leonardo_gonzalez"],
    ["plan_omar_azi.json", "omar_azi"],
    ["plan_rafa.json", "rafa_hernandez"],
    ["plan_scarlet_arianna.json", "scarlet_arianna"],
    ["plan_anna_georgia.json", "anna_georgia"],
    ["plan_patricio_leigh.json", "patricio_leigh"],
    ["plan_maria_ponce.json", "maria_ponce"],
    ["plan_leticia_erguera.json", "leticia_erguera"],
    ["plan_ximena_palacios.json", "ximena_palacios"]
  ]);

  const CYCLE = "Martes 15 al martes 29 de septiembre del 2026";
  const UPDATED = "Actualizado martes 15 de septiembre de 2026";

  const LINKS = {
    pre: "https://drive.google.com/file/d/1mV7dkockaExAief_qW7RsMUuouwfMKM7/view?usp=sharing",
    nivel3: "https://drive.google.com/file/d/16UN5_qf8r8Vr5SVuWnuU5KaNibrzFcDQ/view?usp=sharing",
    gluteo: "https://drive.google.com/file/d/1S4PWmc52Ot9k-IrXt38L-Spx0tjqj8Lr/view?usp=sharing",
    yopIso1: "https://drive.google.com/file/d/1ptuIEmfskjKeBhYfvW4JZVvW5hIIdCbx/view?usp=sharing",
    apIso1: "https://drive.google.com/file/d/1kbkZqudxFm3GqgXyrEiKM_ODwrMk3ppx/view?usp=sharing",
    caderaBanda: "https://drive.google.com/open?id=1-mLzWj3XiEzCeul7LaIWuPzP39qQ6VtQ&usp=drive_copy",
    circuitoElevacion: "https://drive.google.com/open?id=1Jrwnad5LdAZdG1d_75e2QI7U2sEVLcSP&usp=drive_copy",
    holdL2Koryo: "https://drive.google.com/open?id=1YiNFRyFkZFZH4Pk3eHe8cOZZorTd6rzK&usp=drive_copy",
    tobilloBanda: "https://drive.google.com/file/d/1Sux7kXiJImkagl3ye2nN2bMjqmJOa18O/view?usp=drive_link",
    holdApKoryo: "https://drive.google.com/open?id=1lww5GhU6ZYxtSnnqkniIr04Snu6H3A-L&usp=drive_copy",
    splitYop: "https://drive.google.com/file/d/1y5VPwL9XoGo8javxUs5KPpsFRhmVpoyA/view?usp=drive_link"
  };

  function item(titulo, dia, enfoque, reps, tipo, url){
    const out = { titulo, dia, enfoque, reps, tipo: tipo || (url ? "video" : "info") };
    if(url) out.url = url;
    return out;
  }

  function infoDay(date, text, en){
    return item(
      date,
      date.toUpperCase(),
      text,
      en ? "Follow the exact times and repetitions written in this block." : "Respeta exactamente los tiempos y repeticiones indicados en este bloque.",
      "info",
      ""
    );
  }

  function commonChanonaflex(en){
    return en ? [
      item("Pre-Chanonaflex - Initial Stretch", "BEFORE TRAINING", "Prepare the body before the main workload.", "Follow the video", "video", LINKS.pre),
      item("Chanonaflex From Proposal - Level 3", "BEFORE TRAINING", "Work range, control and alignment without forcing the movement.", "Follow the video", "video", LINKS.nivel3)
    ] : [
      item("Pre-Chanonaflex - Estiramiento inicial", "ANTES DE ENTRENAR", "Preparar el cuerpo antes del trabajo principal.", "Según indicación del video", "video", LINKS.pre),
      item("Chanonaflex Desde Propuesta - Nivel 3", "ANTES DE ENTRENAR", "Trabajar rango, control y alineación sin forzar el movimiento.", "Según indicación del video", "video", LINKS.nivel3)
    ];
  }

  function commonIsometric(en){
    return en ? [
      item("Glute and Hook - Active Isometric - Intermediate", "MONDAY - FRIDAY", "Work glute strength, hip control and support for the hook kick.", "Follow the video", "video", LINKS.gluteo),
      item("Active Isometric - Yop Chagui - Level 1", "TUESDAY - THURSDAY", "Work chamber, support leg, hip control and alignment.", "Follow the video", "video", LINKS.yopIso1),
      item("Active Isometric - Ap Chagui - Level 1", "WEDNESDAY - SATURDAY", "Work front-kick strength, knee lift and clean recovery.", "Follow the video", "video", LINKS.apIso1)
    ] : [
      item("Glúteo y gancho - Isométrico activo - Intermedio", "LUNES - VIERNES", "Trabajar fuerza de glúteo, control de cadera y base para gancho.", "Según indicación del video", "video", LINKS.gluteo),
      item("Isométrico Activo - Yop Chagui - Nivel 1", "MARTES - JUEVES", "Trabajar cámara, pierna de apoyo, control de cadera y alineación.", "Según indicación del video", "video", LINKS.yopIso1),
      item("Isométrico activo - Ap Chagui - Nivel 1", "MIÉRCOLES - SÁBADO", "Trabajar fuerza de Ap Chagui, elevación de rodilla y recobro limpio.", "Según indicación del video", "video", LINKS.apIso1)
    ];
  }

  function commonKicking(en){
    return en ? [
      item("Hip rotation with elastic band", "MONDAY - WEDNESDAY - FRIDAY", "Work hip direction, resistance and technical control.", "30 reps / 2 series", "video", LINKS.caderaBanda),
      item("Elevation + hold + circular circuit", "MONDAY - WEDNESDAY - FRIDAY", "Work knee elevation, hold and circular control.", "20 reps / 3 series", "video", LINKS.circuitoElevacion),
      item("L2 Koryo - Hold circuit with band", "TUESDAY - FRIDAY", "Work strength, chamber and stability with resistance.", "20 reps / 1 series", "video", LINKS.holdL2Koryo),
      item("Ankle strengthening exercise with band", "MONDAY TO FRIDAY", "Strengthen the ankle and support base.", "10 reps each side / 1 series", "video", LINKS.tobilloBanda),
      item("L2 Koryo - Hold in Ap Chagui", "MONDAY TO FRIDAY", "Work Ap Chagui chamber and control related to Koryo line 2.", "20 reps / 1 series", "video", LINKS.holdApKoryo),
      item("Yop Chagui Split", "AS ASSIGNED", "Work range and control per leg without sacrificing posture.", "30 reps / 1 series per leg", "video", LINKS.splitYop)
    ] : [
      item("Torción de cadera con banda elástica", "LUNES - MIÉRCOLES - VIERNES", "Trabajar dirección de cadera, resistencia y control técnico.", "30 reps / 2 series", "video", LINKS.caderaBanda),
      item("Circuito elevacion + sostener + circular", "LUNES - MIÉRCOLES - VIERNES", "Trabajar elevación de rodilla, sostén y control circular.", "20 reps / 3 series", "video", LINKS.circuitoElevacion),
      item("Circuito Hold con banda L2 Koryo", "MARTES - VIERNES", "Trabajar fuerza, cámara y estabilidad con resistencia.", "20 reps / 1 serie", "video", LINKS.holdL2Koryo),
      item("Ejercicio de fortalecimiento de tobillo con banda", "LUNES A VIERNES", "Fortalecer tobillo y base de apoyo.", "10 reps por lado / 1 serie", "video", LINKS.tobilloBanda),
      item("L2 Koryo - hold en ap chaguis", "LUNES A VIERNES", "Trabajar cámara y control de Ap Chagui relacionado con la línea 2 de Koryo.", "20 reps / 1 serie", "video", LINKS.holdApKoryo),
      item("Split de Yop Chagui", "SEGÚN INDICACIÓN", "Trabajar rango y control por pierna sin sacrificar la postura.", "30 reps / 1 serie por pierna", "video", LINKS.splitYop)
    ];
  }

  const SCHEDULES = {
    karen_sanchez: [
      ["Martes 15 de septiembre", "Taeguk 4 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 5 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 6 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Koryo (Líneas 2 y 4): 10 min total (5 min por línea) | Keumgang (Línea 3): 10 min / 1 serie | Poomsae completa: Taeguk 4 (5 repeticiones)."],
      ["Miércoles 16 de septiembre", "Taeguk 4 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 5 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 6 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 7 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 8 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Koryo (Líneas 1 y 3): 20 min total (10 min por línea) | Keumgang (Jakdari Sogui): 10 min / 1 serie / con calcetas | Poomsae completa: Taeguk 5 (5 repeticiones)."],
      ["Jueves 17 de septiembre", "Taeguk 4 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 5 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 6 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Koryo (Líneas 2 y 4): 10 min total (5 min por línea) | Keumgang (Línea 3): 10 min / 1 serie | Poomsae completa: Taeguk 6 (5 repeticiones)."],
      ["Viernes 18 de septiembre", "Taeguk 4 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 5 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 6 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 7 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 8 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Koryo (Líneas 1 y 3): 20 min total (10 min por línea) | Poomsae completa: Taeguk 7 (5 repeticiones)."],
      ["Sábado 19 de septiembre", "Taeguk 4 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 5 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 6 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Keumgang (Jakdari Sogui): 10 min / 1 serie / con calcetas | Poomsae completa: Taeguk 8 (5 repeticiones)."],
      ["Lunes 21 de septiembre", "Taeguk 4 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 5 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 6 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 7 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 8 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Koryo (Líneas 1 y 3): 20 min total (10 min por línea) | Poomsae completa: Koryo (5 repeticiones)."],
      ["Martes 22 de septiembre", "Taeguk 4 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 5 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 6 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Koryo (Líneas 2 y 4): 10 min total (5 min por línea) | Keumgang (Línea 3): 10 min / 1 serie | Poomsae completa: Keumgang (5 repeticiones)."]
    ],

    leonardo_gonzalez: [
      ["Martes 15 de septiembre", "Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Koryo (Líneas 2 y 4): 10 min total (5 min por línea) | Keumgang (Línea 3): 10 min / 1 serie | Taebaek (Líneas 2, 3 y 4): bloque técnico de líneas centrales | Poomsae completa: Taeguk 7 (5 repeticiones)."],
      ["Miércoles 16 de septiembre", "Taeguk 7 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 8 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Koryo (Líneas 1 y 3): 20 min total (10 min por línea) | Keumgang (Jakdari Sogui): 10 min / 1 serie / con calcetas | Pyeonwon (lados izquierdo y derecho): trabajo bilateral | Sipjin (Línea 1): bloque inicial de control | Poomsae completa: Taeguk 8 (5 repeticiones)."],
      ["Jueves 17 de septiembre", "Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Koryo (Líneas 2 y 4): 10 min total (5 min por línea) | Keumgang (Línea 3): 10 min / 1 serie | Taebaek (Líneas 1 y 5): bloque de extremos | Poomsae completa: Koryo (5 repeticiones)."],
      ["Viernes 18 de septiembre", "Taeguk 7 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 8 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Koryo (Líneas 1 y 3): 20 min total (10 min por línea) | Pyeonwon completo: 10 repeticiones a plena consciencia | Sipjin (Línea 2 completo): desarrollo completo de la segunda sección | Poomsae completa: Keumgang (5 repeticiones)."],
      ["Sábado 19 de septiembre", "Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Keumgang (Jakdari Sogui): 10 min / 1 serie / con calcetas | Taebaek (Líneas 2, 3 y 4): refuerzo de líneas centrales | Poomsae completa: Taebaek (5 repeticiones)."],
      ["Lunes 21 de septiembre", "Taeguk 7 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 8 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Koryo (Líneas 1 y 3): 20 min total (10 min por línea) | Taebaek (Líneas 1 y 5): estructura inicial y final | Sipjin (Línea 1): repaso de línea inicial | Poomsae completa: Pyeonwon (5 repeticiones)."],
      ["Martes 22 de septiembre", "Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Koryo (Líneas 2 y 4): 10 min total (5 min por línea) | Keumgang (Línea 3): 10 min / 1 serie | Pyeonwon completo: 10 repeticiones a consciencia | Poomsae completa: Sipjin (5 repeticiones)."]
    ],

    omar_azi: [
      ["Martes 15 de septiembre de 2026", "Taeguk 7 (Líneas 1, 2 y 3) | Taeguk 8 (Líneas 1, 2 y 3) | Koryo (Líneas 1, 2 y 3) | Keumgang (Líneas 1, 2 y 3) | Taebaek (Líneas 1 y 2) | Sipjin (Líneas 1 y 2)."],
      ["Miércoles 16 de septiembre de 2026", "Taeguk 7 (Líneas 4, 5 y 6) | Taeguk 8 (Líneas 4, 5 y 6) | Koryo (Líneas 4 y 5) | Keumgang (Líneas 4, 5 y 6) | Taebaek (Líneas 3, 4 y 5) | Sipjin (Líneas 3 y 4)."],
      ["Jueves 17 de septiembre de 2026", "Poomsae completas, repaso final a consciencia: Taeguk 7 (5 reps) | Taeguk 8 (5 reps) | Koryo (5 reps) | Keumgang (5 reps) | Taebaek (5 reps) | Pyeonwon (lado derecho, izquierdo y completo - 10 reps) | Sipjin (5 reps)."]
    ],

    rafa_hernandez: [
      ["Martes 15 de septiembre", "Taeguk 5 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 6 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Koryo (Líneas 2 y 4): 10 min total (5 min por línea) | Keumgang (Línea 3): 10 min / 1 serie | Taebaek (Líneas 2, 3 y 4): bloque técnico central | Poomsae completa: Taeguk 5 (5 repeticiones)."],
      ["Miércoles 16 de septiembre", "Taeguk 5 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 6 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 7 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 8 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Koryo (Líneas 1 y 3): 20 min total (10 min por línea) | Keumgang (Jakdari Sogui): 10 min / 1 serie / con calcetas | Pyeonwon (lados izquierdo y derecho): trabajo bilateral técnico | Poomsae completa: Taeguk 6 (5 repeticiones)."],
      ["Jueves 17 de septiembre", "Taeguk 5 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 6 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Koryo (Líneas 2 y 4): 10 min total (5 min por línea) | Keumgang (Línea 3): 10 min / 1 serie | Taebaek (Líneas 1 y 5): bloque de extremos | Poomsae completa: Taeguk 7 (5 repeticiones)."],
      ["Viernes 18 de septiembre", "Taeguk 5 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 6 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 7 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 8 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Koryo (Líneas 1 y 3): 20 min total (10 min por línea) | Pyeonwon completo: 10 repeticiones a consciencia | Poomsae completa: Taeguk 8 (5 repeticiones)."],
      ["Sábado 19 de septiembre", "Taeguk 5 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 6 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Keumgang (Jakdari Sogui): 10 min / 1 serie / con calcetas | Taebaek (Líneas 2, 3 y 4): refuerzo de líneas centrales | Poomsae completa: Koryo (5 repeticiones)."],
      ["Lunes 21 de septiembre", "Taeguk 5 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 6 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 7 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 8 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Koryo (Líneas 1 y 3): 20 min total (10 min por línea) | Taebaek (Líneas 1 y 5): estructura inicial y final | Poomsae completa: Keumgang (5 repeticiones)."],
      ["Martes 22 de septiembre", "Taeguk 5 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 6 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Koryo (Líneas 2 y 4): 10 min total (5 min por línea) | Keumgang (Línea 3): 10 min / 1 serie | Pyeonwon completo: 10 repeticiones a consciencia | Poomsae completa: Taebaek y Pyeonwon (5 repeticiones de cada una)."]
    ],

    scarlet_arianna: [
      ["Martes 15 de septiembre de 2026", "Taeguk 4 (Líneas 1 y 2) | Taeguk 5 (Líneas 1 y 2) | Taeguk 6 (Líneas 1 y 2) | Taeguk 7 (Líneas 1 y 2) | Taeguk 8 (Líneas 1 y 2) | Koryo (Línea 1) | Keumgang (Líneas 1 y 2)."],
      ["Miércoles 16 de septiembre de 2026", "Taeguk 4 (Líneas 3 y 4) | Taeguk 5 (Líneas 3 y 4) | Taeguk 6 (Líneas 3 y 4) | Taeguk 7 (Líneas 3 y 4) | Taeguk 8 (Líneas 3 y 4) | Koryo (Línea 2) | Keumgang (Líneas 3 y 4)."],
      ["Jueves 17 de septiembre de 2026", "Taeguk 4 (Líneas 5 y 6) | Taeguk 5 (Líneas 5 y 6) | Taeguk 6 (Líneas 5 y 6) | Taeguk 7 (Líneas 5 y 6) | Taeguk 8 (Líneas 5 y 6) | Koryo (Líneas 3 y 4) | Keumgang (Líneas 5 y 6)."],
      ["Viernes 18 de septiembre de 2026", "Poomsae completa: Taeguk 4 (5 reps) | Taeguk 5 (5 reps) | Taeguk 6 (5 reps) | Taeguk 7 (5 reps) | Taeguk 8 (5 reps)."],
      ["Sábado 19 de septiembre de 2026", "Poomsae completa: Koryo (5 reps) | Keumgang (5 reps) | Taeguk 4 (Líneas 1, 3 y 5) | Taeguk 5 (Líneas 2, 4 y 6) | Taeguk 6 (Líneas 1, 3 y 5)."],
      ["Lunes 21 de septiembre de 2026", "Taeguk 7 (Líneas 2, 4 y 6) | Taeguk 8 (Líneas 1, 3 y 5) | Koryo (Líneas 1 y 3) | Keumgang (Líneas 2, 4 y 6) | Taeguk 4 (Líneas 2, 4 y 6)."],
      ["Martes 22 de septiembre de 2026", "Taeguk 5 (Líneas 1, 3 y 5) | Taeguk 6 (Líneas 2, 4 y 6) | Taeguk 7 (Líneas 1, 3 y 5) | Taeguk 8 (Líneas 2, 4 y 6) | Koryo (Líneas 2 y 4) | Keumgang (Líneas 1, 3 y 5)."],
      ["Miércoles 23 de septiembre de 2026", "Taeguk 4 (Líneas 1 a 3) | Taeguk 5 (Líneas 4 a 6) | Taeguk 6 (Líneas 1 a 3) | Taeguk 7 (Líneas 4 a 6) | Taeguk 8 (Líneas 1 a 3) | Keumgang (Líneas 4 a 6)."],
      ["Jueves 24 de septiembre de 2026", "Taeguk 4 (Líneas 4 a 6) | Taeguk 5 (Líneas 1 a 3) | Taeguk 6 (Líneas 4 a 6) | Taeguk 7 (Líneas 1 a 3) | Taeguk 8 (Líneas 4 a 6) | Koryo (Líneas 1 a 3)."],
      ["Viernes 25 de septiembre de 2026", "Poomsae completa: Taeguk 4 (5 reps) | Taeguk 5 (5 reps) | Taeguk 6 (5 reps) | Taeguk 7 (5 reps) | Taeguk 8 (5 reps)."],
      ["Sábado 26 de septiembre de 2026", "Poomsae completa: Koryo (5 reps) | Keumgang (5 reps) | Taeguk 4 (Líneas 2 y 5) | Taeguk 5 (Líneas 1 y 6) | Taeguk 6 (Líneas 3 y 4)."],
      ["Lunes 28 de septiembre de 2026", "Taeguk 7 (Líneas 2 y 5) | Taeguk 8 (Líneas 1 y 6) | Koryo (Líneas 2 y 4) | Keumgang (Líneas 2 y 5) | Taeguk 4 (Líneas 3 y 6)."],
      ["Martes 29 de septiembre de 2026", "Repaso general de cierre técnico: Taeguk 4 al 8 (Líneas 1 a 6), Koryo (Líneas 1 a 4) y Keumgang (Líneas 1 a 6)."]
    ],

    anna_georgia: [
      ["Tuesday, September 15, 2026", "Taeguk 8: Lines 1 and 2 (5 min per line) | Koryo: Lines 1 and 2 (5 min per line)."],
      ["Wednesday, September 16, 2026", "Taeguk 8: Lines 3 and 4 (5 min per line) | Koryo: Lines 3 and 4 (5 min per line)."],
      ["Thursday, September 17, 2026", "Taeguk 8: Lines 1 and 3 (5 min per line) | Koryo: Lines 1 and 3 (5 min per line)."],
      ["Friday, September 18, 2026", "Complete Poomsae: Taeguk 8 (5 conscious repetitions) | Complete Poomsae: Koryo (5 conscious repetitions)."],
      ["Saturday, September 19, 2026", "Taeguk 8: Lines 2 and 4 (5 min per line) | Koryo: Lines 2 and 4 (5 min per line)."],
      ["Monday, September 21, 2026", "Taeguk 8: Lines 1, 2, 3 and 4 (5 min per line) | Koryo: Lines 1 and 2 (5 min per line)."],
      ["Tuesday, September 22, 2026", "Taeguk 8: Lines 1 and 3 (5 min per line) | Koryo: Lines 3 and 4 (5 min per line)."],
      ["Wednesday, September 23, 2026", "Taeguk 8: Lines 2 and 4 (5 min per line) | Koryo: Lines 1 and 3 (5 min per line)."],
      ["Thursday, September 24, 2026", "Taeguk 8: Lines 1 to 4 (quick review, 3 min per line) | Koryo: Lines 2 and 4 (5 min per line)."],
      ["Friday, September 25, 2026", "Complete Poomsae: Taeguk 8 (5 conscious repetitions) | Complete Poomsae: Koryo (5 conscious repetitions)."],
      ["Saturday, September 26, 2026", "Taeguk 8: Lines 1 and 2 (5 min per line) | Koryo: Lines 1 and 2 (5 min per line)."],
      ["Monday, September 28, 2026", "Taeguk 8: Lines 3 and 4 (5 min per line) | Koryo: Lines 3 and 4 (5 min per line)."],
      ["Tuesday, September 29, 2026", "General closing review: Taeguk 8 (Lines 1 to 4) and Koryo (Lines 1 to 4)."]
    ],

    rodrigo_gonzalez: [
      ["Martes 15 de septiembre", "Taeguk 5 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 6 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Koryo (Líneas 2 y 4): 10 min total (5 min por línea) | Keumgang (Línea 3): 10 min / 1 serie | Taebaek (Líneas 2, 3 y 4): bloque técnico central | Poomsae completa: Taeguk 5 (5 repeticiones)."],
      ["Miércoles 16 de septiembre", "Taeguk 5 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 6 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 7 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 8 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Koryo (Líneas 1 y 3): 20 min total (10 min por línea) | Keumgang (Jakdari Sogui): 10 min / 1 serie / con calcetas | Pyeonwon (lados izquierdo y derecho): trabajo bilateral técnico | Poomsae completa: Taeguk 6 (5 repeticiones)."],
      ["Jueves 17 de septiembre", "Taeguk 5 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 6 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Koryo (Líneas 2 y 4): 10 min total (5 min por línea) | Keumgang (Línea 3): 10 min / 1 serie | Taebaek (Líneas 1 y 5): bloque de extremos | Poomsae completa: Taeguk 7 (5 repeticiones)."],
      ["Viernes 18 de septiembre", "Taeguk 5 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 6 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 7 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 8 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Koryo (Líneas 1 y 3): 20 min total (10 min por línea) | Pyeonwon completo: 10 repeticiones a consciencia | Poomsae completa: Taeguk 8 (5 repeticiones)."],
      ["Sábado 19 de septiembre", "Taeguk 5 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 6 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Keumgang (Jakdari Sogui): 10 min / 1 serie / con calcetas | Taebaek (Líneas 2, 3 y 4): refuerzo de líneas centrales | Poomsae completa: Koryo (5 repeticiones)."],
      ["Lunes 21 de septiembre", "Taeguk 5 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 6 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 7 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Taeguk 8 (Líneas 1, 2 y 3): 15 min total (5 min por línea) | Koryo (Líneas 1 y 3): 20 min total (10 min por línea) | Taebaek (Líneas 1 y 5): estructura inicial y final | Poomsae completa: Keumgang (5 repeticiones)."],
      ["Martes 22 de septiembre", "Taeguk 5 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 6 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 7 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Taeguk 8 (Líneas 4, 5 y 6): 15 min total (5 min por línea) | Koryo (Líneas 2 y 4): 10 min total (5 min por línea) | Keumgang (Línea 3): 10 min / 1 serie | Pyeonwon completo: 10 repeticiones a consciencia | Poomsae completa: Taebaek y Pyeonwon (5 repeticiones de cada una)."]
    ],

    maria_ponce: [
      ["Martes 15 de septiembre de 2026", "Taeguk 7: Línea 1 (5 min) y Línea 2 (5 min)."],
      ["Miércoles 16 de septiembre de 2026", "Taeguk 7: Línea 3 (5 min) y Línea 4 (5 min)."],
      ["Jueves 17 de septiembre de 2026", "Taeguk 7: Línea 5 (5 min) y Línea 6 (5 min)."],
      ["Viernes 18 de septiembre de 2026", "Poomsae completa: Taeguk 7 (5 repeticiones a consciencia)."],
      ["Sábado 19 de septiembre de 2026", "Taeguk 7: Línea 1 (5 min) y Línea 3 (5 min)."],
      ["Lunes 21 de septiembre de 2026", "Taeguk 7: Línea 2 (5 min) y Línea 4 (5 min)."],
      ["Martes 22 de septiembre de 2026", "Taeguk 7: Línea 5 (5 min) y Línea 6 (5 min)."],
      ["Miércoles 23 de septiembre de 2026", "Taeguk 7: Línea 1 (5 min), Línea 2 (5 min) y Línea 3 (5 min)."],
      ["Jueves 24 de septiembre de 2026", "Taeguk 7: Línea 4 (5 min), Línea 5 (5 min) y Línea 6 (5 min)."],
      ["Viernes 25 de septiembre de 2026", "Poomsae completa: Taeguk 7 (5 repeticiones a consciencia)."],
      ["Sábado 26 de septiembre de 2026", "Taeguk 7: Línea 2 (5 min) y Línea 5 (5 min)."],
      ["Lunes 28 de septiembre de 2026", "Taeguk 7: Línea 1 (5 min) y Línea 6 (5 min)."],
      ["Martes 29 de septiembre de 2026", "Taeguk 7: repaso general y ajuste de todas las líneas (Líneas 1 a 6)."]
    ],

    leticia_erguera: [
      ["Martes 15 de septiembre de 2026", "Taeguk 4: Líneas 1 y 2 (5 min por línea) | Taeguk 5: Líneas 1 y 2 (5 min por línea)."],
      ["Miércoles 16 de septiembre de 2026", "Taeguk 4: Líneas 3 y 4 (5 min por línea) | Taeguk 5: Líneas 3 y 4 (5 min por línea)."],
      ["Jueves 17 de septiembre de 2026", "Taeguk 4: Líneas 5 y 6 (5 min por línea) | Taeguk 5: Línea 5 (5 min)."],
      ["Viernes 18 de septiembre de 2026", "Poomsae completa: Taeguk 4 (5 repeticiones a consciencia) | Poomsae completa: Taeguk 5 (5 repeticiones a consciencia)."],
      ["Sábado 19 de septiembre de 2026", "Taeguk 4: Líneas 1, 3 y 5 (5 min por línea) | Taeguk 5: Líneas 1, 3 y 5 (5 min por línea)."],
      ["Lunes 21 de septiembre de 2026", "Taeguk 4: Líneas 2, 4 y 6 (5 min por línea) | Taeguk 5: Líneas 2 y 4 (5 min por línea)."],
      ["Martes 22 de septiembre de 2026", "Taeguk 4: Líneas 1 a 6 (repaso rápido de 3 min por línea) | Taeguk 5: Línea 1."]
    ]
  };

  const POOMSAE_DAYS = {
    karen_sanchez: "15, 16, 17, 18, 19, 21 y 22 de septiembre",
    leonardo_gonzalez: "15, 16, 17, 18, 19, 21 y 22 de septiembre",
    omar_azi: "15, 16 y 17 de septiembre",
    rafa_hernandez: "15, 16, 17, 18, 19, 21 y 22 de septiembre",
    scarlet_arianna: "15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 28 y 29 de septiembre",
    anna_georgia: "September 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 28 and 29",
    rodrigo_gonzalez: "15, 16, 17, 18, 19, 21 y 22 de septiembre",
    maria_ponce: "15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 28 y 29 de septiembre",
    leticia_erguera: "15, 16, 17, 18, 19, 21 y 22 de septiembre",
    patricio_leigh: "No asignado en este ciclo"
  };

  function scheduleFor(id, en){
    if(id === "patricio_leigh") return [];
    const raw = SCHEDULES[id];
    if(!raw) return null;
    return raw.map(([date, text]) => infoDay(date, text, en));
  }

  function indications(en){
    return en ? [
      "Working from the plan may not guarantee that we win, but it does allow us to measure how much we can improve. So let’s give it everything. This time I will not add common mistakes because we are going to focus on direct practice and on the rhythm of our movements and exercises."
    ] : [
      "Trabajar en base al plan quizá no nos garantiza ganar, pero sí nos permite medir cuánto podemos mejorar, así que a darle con todo. En esta ocasión no pondré errores comunes ya que vamos a estar enfocados en la práctica directa y el ritmo de nuestros movimientos y ejercicios."
    ];
  }

  function finalNotes(en){
    return en ? [
      "These next two weeks should be slightly lighter than the previous ones. If you feel overloaded or you are not performing the way you know you can, lower the intensity slightly by removing two reps or lowering the movement height, but always protect the technique. Technique is not negotiable.",
      "We continue focusing on the fine details. Do not focus on the maximum speed of the whole Poomsae; focus on the speed of each movement and its correct finish.",
      "Happy training. Let’s keep giving it everything and working the way we should."
    ] : [
      "Estas siguientes dos semanas deben ser ligeramente menos pesadas que las anteriores. Si sientes que tienes una sobrecarga o no estás rindiendo como tú te conoces, baja ligeramente la intensidad, ya sea quitando dos reps o bajando la altura del movimiento, pero siempre protegiendo la técnica; esa no es negociable.",
      "Seguimos con el enfoque de los detalles finos. No te enfoques en la velocidad máxima de toda la Poomsae, sino en la velocidad de cada movimiento y su finalización correcta.",
      "Feliz entrenamiento y seguimos dándole con todo como se debe."
    ];
  }

  function summaryDays(plan, id, en){
    const pDays = POOMSAE_DAYS[id] || plan.poomsaeDias || (en ? "Follow the Poomsae section" : "Según la sección de Poomsae");
    if(en){
      return `ChanonaFlex: before training. Active isometrics: Monday and Friday / Tuesday and Thursday / Wednesday and Saturday. Technical kicking: Monday-Wednesday-Friday / Tuesday-Friday / Monday to Friday; Yop Chagui Split as assigned. Poomsae: ${pDays}.`;
    }
    return `ChanonaFlex: antes de entrenar. Isométrico activo: lunes y viernes / martes y jueves / miércoles y sábado. Pateo técnico: lunes-miércoles-viernes / martes-viernes / lunes a viernes; Split de Yop Chagui según indicación. Poomsae: ${pDays}.`;
  }

  function patchPlan(plan, id){
    if(!plan || !TARGET_IDS.has(id)) return plan;
    const en = id === "anna_georgia";
    plan.ciclo = CYCLE;
    plan.updated_at = UPDATED;
    plan.enfoque_corto = en
      ? "September 15–29 cycle: direct practice, rhythm and fine technical details"
      : "Ciclo 15 al 29 de septiembre: práctica directa, ritmo y detalles técnicos finos";
    plan.chanonaflexDias = en ? "Before training" : "Antes de entrenar";
    plan.isometricoDias = en
      ? "Monday and Friday / Tuesday and Thursday / Wednesday and Saturday"
      : "lunes y viernes / martes y jueves / miércoles y sábado";
    plan.pateoDias = en
      ? "Monday-Wednesday-Friday / Tuesday-Friday / Monday to Friday / Split as assigned"
      : "lunes-miércoles-viernes / martes-viernes / lunes a viernes / Split según indicación";
    plan.chanonaflex = commonChanonaflex(en);
    plan.isometrico = commonIsometric(en);
    plan.pateoTecnico = commonKicking(en);

    const schedule = scheduleFor(id, en);
    if(schedule !== null){
      plan.poomsae = schedule;
      plan.poomsaeDias = POOMSAE_DAYS[id] || (en ? "Not assigned" : "No asignado");
    }

    plan.enfoque = summaryDays(plan, id, en);
    plan.indicacionesExtras = indications(en);
    plan.notasFinales = finalNotes(en);
    return plan;
  }

  window.__CHANONA_CYCLE_20260915_TARGETS = TARGET_IDS;
  window.__isCycle20260915Target = function(){
    const id = new URL(location.href).searchParams.get("alumno") || "";
    return TARGET_IDS.has(id);
  };
  window.__chanonaCycle20260915Patch = patchPlan;

  const originalFetch = typeof window.fetch === "function" ? window.fetch.bind(window) : null;
  if(!originalFetch) return;

  window.fetch = async function(input, init){
    const response = await originalFetch(input, init);
    try{
      const url = typeof input === "string" ? input : (input && input.url) || "";
      const match = String(url).match(/data\/planes\/([^?#/]+\.json)/);
      const planFile = match ? match[1] : "";
      const id = TARGET_PLAN_FILES.get(planFile);
      if(id){
        const data = await response.clone().json();
        const patched = patchPlan(data, id);
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