(function(){
  const SYSTEM_ID = "chanonatkd_system";
  const VERSION = "system-cycle-20260901-no-classes";
  const CYCLE = "Lunes 31 agosto al sábado 12 de septiembre del 2026";
  const UPDATED = "Actualizado martes 1 de septiembre de 2026";

  const LINKS = {
    apDollyoYopRegreso: "https://drive.google.com/open?id=1pUIqQv-TZfUGYydpdg8bMH9qJrEpVTXR&usp=drive_copy",
    secuenciaApDollyoYop: "https://drive.google.com/file/d/1mpJeBddYKmXUuJUMocQN42QzRwtlzSqr/view?usp=drive_link",
    holdBandaL2Koryo: "https://drive.google.com/open?id=1YiNFRyFkZFZH4Pk3eHe8cOZZorTd6rzK&usp=drive_copy",
    apYopTurnHipsSilla: "https://drive.google.com/open?id=1x5bWaaZb97dh3Kl8KyfoBbh7c6uE_dJO&usp=drive_copy",
    yopToquePiso: "https://drive.google.com/open?id=1ZQ3ud3bkEQJcvSnUelWDVR4ECdwv1_Vn&usp=drive_copy",
    dobleYopHoldLanding: "https://drive.google.com/open?id=1t70roD4P_sHZHdkCqufINYq2RJ3lNTNZ&usp=drive_copy"
  };

  const TEACHER_NOTES = [
    "Taeguk 5: evita que las transiciones de pies se crucen o se desordenen; primero organiza la base y después finaliza la técnica.",
    "Taeguk 5: evita que los codazos, golpes y defensas terminen suaves; cada movimiento debe tener trayectoria clara y cierre firme.",
    "Keumgang: evita abrir demasiado la preparación de Santul Makki; mantén la trayectoria cerrada, limpia y directa.",
    "Keumgang: evita perder eje en Jakdari Seogui y en el giro; controla pie de apoyo, cadera, torso y mirada antes de finalizar."
  ];

  const FINAL_NOTES = [
    "Vamos trabajando y avanzando de manera muy positiva, sobre todo porque llevamos una secuencia positiva. Si eres nuevo o nueva, no pasa nada: toma los entrenamientos grabados desde el primero y sigue la secuencia, más los entrenamientos individuales que dejo en esta sección.",
    "Sigan trabajando duro como se debe; poco a poco nos vamos acercando más a nuestra meta.",
    "Abrazo a todos de parte del Mtro. Chanona."
  ];

  const POOMSAE_WORK = [
    "Nuestro entrenamiento de las próximas semanas será enfocado en Taeguk 5: línea 3, línea 4 y línea 5.",
    "En Keumgang, el enfoque será Jakdari Seogui y el giro o transición.",
    "Trabaja con calma, cuidando base, trayectoria, alineación y finalización correcta de cada movimiento."
  ];

  const BEGINNER_PATEO = [
    item("Ap + Dollyo + Yop con regreso", "LUNES - MIÉRCOLES - VIERNES", "Trabajar la secuencia completa con regreso limpio, controlando cámara, apoyo y equilibrio.", "7 repeticiones completas / 2 series", "video", LINKS.apDollyoYopRegreso),
    item("Secuencia Ap + Dollyo + Yop", "MARTES - JUEVES", "Trabajar la secuencia con orden, ritmo y control técnico desde nivel principiante.", "7 repeticiones completas / 2 series", "video", LINKS.secuenciaApDollyoYop)
  ];

  const MAIN_PATEO = [
    item("Circuito Hold con banda L2 Koryo", "LUNES - MIÉRCOLES - VIERNES", "Fortalecer cámara, sostén y control de pierna usando banda.", "8 reps por pierna / 3 series", "video", LINKS.holdBandaL2Koryo),
    item("Ap + Yop + Turn hips silla", "MARTES - JUEVES", "Trabajar combinación de Ap Chagui, Yop Chagui y rotación de cadera con apoyo de silla.", "7 reps / 3 series", "video", LINKS.apYopTurnHipsSilla),
    item("Yop Chagui + toque piso + equilibrio", "MARTES - JUEVES - SÁBADO", "Trabajar cámara, toque controlado al piso, equilibrio y regreso técnico.", "5 reps x pierna / 2 series", "video", LINKS.yopToquePiso),
    item("Doble yop hold - landing L3 Koryo", "LUNES - MIÉRCOLES - VIERNES", "Trabajar doble Yop, sostén y aterrizaje con control para línea 3 de Koryo.", "8 reps por lado / 1 serie", "video", LINKS.dobleYopHoldLanding)
  ];

  function isSystem(){
    return new URL(location.href).searchParams.get("alumno") === SYSTEM_ID;
  }

  function h(value){
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
  }

  function norm(value){
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function item(titulo, dia, enfoque, reps, tipo, url){
    const data = { titulo, dia, enfoque, reps, tipo: tipo || (url ? "video" : "info") };
    if(url) data.url = url;
    return data;
  }

  function mutatePlan(plan){
    if(!plan) return plan;
    plan.ciclo = CYCLE;
    plan.updated_at = UPDATED;
    plan.enfoque_corto = "Ciclo 31 agosto al 12 septiembre";
    plan.enfoque = "Resumen por días: Pateo principiante lunes, miércoles y viernes / martes y jueves. Pateo común lunes, miércoles y viernes / martes, jueves y sábado. Poomsae enfocado en Taeguk 5 y Keumgang.";

    if(!Array.isArray(plan.sistemaTabs)) return plan;

    const tabs = Object.fromEntries(plan.sistemaTabs.map(tab => [tab.id, tab]));

    if(tabs.principiantes){
      tabs.principiantes.pateoDias = "Ap + Dollyo + Yop con regreso: LUNES - MIÉRCOLES - VIERNES / Secuencia Ap + Dollyo + Yop: MARTES - JUEVES";
      tabs.principiantes.pateoTecnico = BEGINNER_PATEO;
      tabs.principiantes.frecuencias = (Array.isArray(tabs.principiantes.frecuencias) ? tabs.principiantes.frecuencias : [])
        .filter(text => !norm(text).includes("pateo tecnico"));
      tabs.principiantes.frecuencias.push("Pateo técnico principiante: lunes, miércoles y viernes / martes y jueves.");
    }

    if(tabs.pateo){
      tabs.pateo.descripcion = "Esta pestaña concentra el pateo técnico común para el ciclo actual. Haz solo los ejercicios indicados y respeta los días marcados.";
      tabs.pateo.recomendacion = "Trabaja con control, sin correr las repeticiones y cuidando la calidad de la cámara, cadera, sostén y aterrizaje.";
      tabs.pateo.pateoDias = "Circuito Hold y Doble Yop: LUNES - MIÉRCOLES - VIERNES / Ap + Yop + Turn hips: MARTES - JUEVES / Yop toque piso: MARTES - JUEVES - SÁBADO";
      tabs.pateo.pateoTecnico = MAIN_PATEO;
      tabs.pateo.frecuencias = [
        "Circuito Hold con banda L2 Koryo y Doble Yop Hold: lunes, miércoles y viernes.",
        "Ap + Yop + Turn hips silla: martes y jueves.",
        "Yop Chagui + toque piso + equilibrio: martes, jueves y sábado."
      ];
    }

    if(tabs.poomsae){
      tabs.poomsae.descripcion = "Trabajo de Poomsae para las próximas semanas, con enfoque en Taeguk 5 y Keumgang.";
      tabs.poomsae.recomendacion = "Usa el buscador de la pestaña para trabajar Taeguk 5 línea 3, 4 y 5. En Keumgang, pon atención especial a Jakdari Seogui y al giro o transición.";
      tabs.poomsae.frecuencias = POOMSAE_WORK;
      tabs.poomsae.poomsaeDias = "Taeguk 5 línea 3, 4 y 5 / Keumgang Jakdari Seogui y giro-transición";
      tabs.poomsae.indicacionesExtras = TEACHER_NOTES;
      tabs.poomsae.notasFinales = FINAL_NOTES;
    }

    return plan;
  }

  const previousRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(previousRenderPage){
    renderPage = function(plan, alumno){
      if(isSystem()) mutatePlan(plan);
      previousRenderPage(plan, alumno);
      scheduleApply();
    };
  }

  function updateHero(){
    if(!isSystem()) return;
    const sub = document.getElementById("planSub");
    if(sub){
      const text = sub.textContent || "";
      sub.textContent = text.includes("• Para:")
        ? text.replace(/Ciclo:\s*.*?\s*•\s*Para:/, `Ciclo: ${CYCLE} • Para:`)
        : `Ciclo: ${CYCLE}`;
    }
    const updated = document.getElementById("chipUpdated");
    if(updated) updated.textContent = `🕒 ${UPDATED}`;
  }

  function findSectionByTitle(words){
    return [...document.querySelectorAll("section")].find(section => {
      const title = norm(section.querySelector("h3")?.textContent || "");
      return words.every(word => title.includes(norm(word)));
    });
  }

  function renderNotes(items){
    return `<div class="cardsGrid">${items.map((text, index) => `
      <article class="itemRow">
        <div class="itemTop">
          <div><p class="itemTitle">${h(text)}</p></div>
          <div class="badgeRow"><span class="badge">${index + 1}</span><span class="badge">INFO</span></div>
        </div>
      </article>`).join("")}</div>`;
  }

  function updateTeacherNotes(){
    if(!isSystem()) return;
    const section = findSectionByTitle(["indicaciones"]);
    const body = section?.querySelector(".sectionBody");
    if(!body || body.dataset.systemNotesVersion === VERSION) return;
    const title = section.querySelector("h3");
    const eyebrow = section.querySelector(".eyebrow");
    if(title) title.textContent = "Indicaciones del profesor";
    if(eyebrow) eyebrow.textContent = "Errores comunes a evitar";
    body.dataset.systemNotesVersion = VERSION;
    body.innerHTML = renderNotes(TEACHER_NOTES);
  }

  function updateFinalNotes(){
    if(!isSystem()) return;
    const section = findSectionByTitle(["notas"]);
    const body = section?.querySelector(".sectionBody");
    if(!body || body.dataset.systemFinalVersion === VERSION) return;
    const title = section.querySelector("h3");
    const eyebrow = section.querySelector(".eyebrow");
    if(title) title.textContent = "Notas finales";
    if(eyebrow) eyebrow.textContent = "Mensaje del Mtro. Chanona";
    body.dataset.systemFinalVersion = VERSION;
    body.innerHTML = renderNotes(FINAL_NOTES);
  }

  function scheduleApply(){
    setTimeout(updateHero, 0);
    setTimeout(updateTeacherNotes, 100);
    setTimeout(updateFinalNotes, 120);
    setTimeout(updateHero, 450);
    setTimeout(updateTeacherNotes, 500);
    setTimeout(updateFinalNotes, 520);
  }

  document.addEventListener("click", scheduleApply, true);
  document.addEventListener("change", scheduleApply, true);

  scheduleApply();
})();
