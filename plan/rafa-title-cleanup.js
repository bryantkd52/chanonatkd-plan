(function(){
  const TARGET = "rafa_hernandez";
  const current = () => new URL(location.href).searchParams.get("alumno") || "";

  function cleanTitles(){
    if(current() !== TARGET) return;
    document.querySelectorAll("#poomsae .itemTitle").forEach(title => {
      title.textContent = title.textContent
        .replace(/\s*\/\s*trabajo relacionado/gi, "")
        .replace(/\s*\(trabajo relacionado\)/gi, "")
        .replace(/\s+/g, " ")
        .trim();
    });
  }

  const content = document.getElementById("content");
  if(content){
    let queued = false;
    new MutationObserver(() => {
      if(queued) return;
      queued = true;
      setTimeout(() => { queued = false; cleanTitles(); }, 80);
    }).observe(content, { childList:true, subtree:true, characterData:true });
  }

  setTimeout(cleanTitles, 200);
  setTimeout(cleanTitles, 700);
  setTimeout(cleanTitles, 1400);
})();
