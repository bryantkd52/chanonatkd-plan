(function(){
  const TARGET_ID = "rafa_hernandez";
  const VERSION = "rafa-indicaciones-20260910-1";

  const FEEDBACK = [
    {
      title: "Koryo",
      items: [
        "En la línea 3, cuando hacemos la transición hacia Sonnal y ejecutamos el golpe hacia la mano, estamos inclinando el cuerpo hacia el lado contrario. Aquí necesitamos mantener la alineación del torso en todo momento.",
        "Hay que torcer un poco más el torso cuando hagamos el último movimiento de la línea 2.",
        "En la transición de izquierda a derecha de la línea 1, estamos preparando Sonnal Montong Bakkat Makki de una forma que se ve pequeña. Mucho cuidado con eso para que se vea la amplitud del movimiento."
      ]
    },
    {
      title: "Keumgang",
      items: [
        "A nivel general, necesitamos darle un poco más de velocidad a nuestra Poomsae.",
        "En la línea 1, en los golpes frontales, la pierna trasera se está extendiendo después del golpe; está llegando algo tarde.",
        "La cabeza ya no se mueve como antes. Se ve mucho más firme y fluido en los giros; aún queda un porcentaje mínimo por corregir, lo que significa que debemos seguir trabajando.",
        "La muñeca en Olgul Makki ya no se está torciendo hacia atrás; se reparó de forma óptima.",
        "En el último golpe o movimiento de la Poomsae, el golpe no llega completamente en línea con el cuerpo; se queda en medio del torso."
      ]
    },
    {
      title: "Taebaek",
      items: [
        "En la línea 2, el movimiento del brazo está pasando muy por arriba de los hombros. Debe mantenerse en línea con los hombros, con solo un pequeño margen permitido para sobrepasarlos.",
        "En la línea 3, en el brazo que llega al codazo, estamos levantando el codo al flexionar; es parecido a lo que también está pasando en Pyeonwong.",
        "La transición de lado a lado en Bom Sogui aún nos está costando fijarla después del giro. Debemos flexionar ligeramente más las rodillas, en especial la trasera, para sembrar bien nuestro peso.",
        "En el golpe después de Sonnal Montong Bakkat Makki, el brazo asistente debe elevarse ligeramente."
      ]
    },
    {
      title: "Pyeonwong",
      items: [
        "En el aterrizaje final después de nuestra Yeop Chagui, estamos flexionando mucho el brazo que abre la mano para recibir el codazo. Necesitamos que flexione menos para que se vea más natural.",
        "Procura darle ese pequeño espacio de preparación a los movimientos. Aunque sean rápidos, siempre existe un punto en el que debemos darles espacio.",
        "En la segunda Dwit Kubi, estamos llevando el peso a 60/40."
      ]
    }
  ];

  function current(){
    return new URL(location.href).searchParams.get("alumno") || "";
  }

  function isRafa(){
    return current() === TARGET_ID;
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

  function findIndicacionesSection(){
    return [...document.querySelectorAll("section")].find(section => {
      const title = norm(section.querySelector("h3")?.textContent || "");
      return title.includes("indicaciones");
    });
  }

  function renderFeedback(){
    return `
      <div class="systemNotice" id="rafaIndicaciones20260910" data-version="${VERSION}">
        <strong>Rafa Hernández - Miércoles 9 sep</strong>
        <p>Retroalimentación técnica para trabajar con calma, precisión y detalle fino.</p>
      </div>
      <div class="cardsGrid" data-rafa-feedback="${VERSION}">
        ${FEEDBACK.map((group, groupIndex) => `
          <article class="itemRow">
            <div class="itemTop">
              <div>
                <p class="itemTitle">${h(group.title)}</p>
                <ol>${group.items.map(item => `<li>${h(item)}</li>`).join("")}</ol>
              </div>
              <div class="badgeRow">
                <span class="badge">${groupIndex + 1}</span>
                <span class="badge">INFO</span>
                <span class="badge red">Indicaciones</span>
              </div>
            </div>
          </article>`).join("")}
      </div>`;
  }

  function patchIndicaciones(){
    if(!isRafa()) return;
    const section = findIndicacionesSection();
    const body = section?.querySelector(".sectionBody");
    if(!section || !body || document.getElementById("rafaIndicaciones20260910")) return;

    const title = section.querySelector("h3");
    const eyebrow = section.querySelector(".eyebrow");
    if(title) title.textContent = "Indicaciones del profesor";
    if(eyebrow) eyebrow.textContent = "Correcciones técnicas";

    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderFeedback();
    body.appendChild(wrapper);
  }

  function schedulePatch(){
    setTimeout(patchIndicaciones, 0);
    setTimeout(patchIndicaciones, 250);
    setTimeout(patchIndicaciones, 700);
  }

  const previousRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(previousRenderPage){
    renderPage = function(plan, alumno){
      previousRenderPage(plan, alumno);
      schedulePatch();
    };
  }

  document.addEventListener("click", () => {
    setTimeout(patchIndicaciones, 120);
    setTimeout(patchIndicaciones, 450);
  }, true);

  document.addEventListener("change", () => {
    setTimeout(patchIndicaciones, 120);
    setTimeout(patchIndicaciones, 450);
  }, true);

  schedulePatch();
})();
