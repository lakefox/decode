// change the code to use contenteditable code tags and format them using md
(() => {
  const editors = document.querySelectorAll("[editor]");
  for (let a = 0; a < editors.length; a++) {
    spawn(editors[a]);
  }
  function spawn(editor) {
    let doc = {
      html: "",
      css: "",
      js: "",
    };

    let ta = editor.querySelectorAll("code");
    let frame = document.createElement("iframe");
    editor.prepend(frame);
    for (let i = 0; i < ta.length; i++) {
      ta[i].contentEditable = true;
      let innerText = [...ta[i].querySelectorAll(`span`)]
        .filter((e) => e.getAttribute("style") == null)
        .map((e) => e.innerText)
        .join("");
      doc[Object.keys(doc)[i]] = innerText;
      ta[i].addEventListener("keyup", (e) => {
        let innerText = [...ta[i].querySelectorAll(`span`)]
          .filter((e) => e.getAttribute("style") == null)
          .map((e) => e.innerText)
          .join("");
        doc[Object.keys(doc)[i]] = innerText;
        update(doc, frame);
      });
      update(doc, frame);
    }
  }

  function update(doc, frame) {
    const html = `<!DOCTYPE html><html><head><style>${doc.css}</style></head><body>${doc.html}<script>${doc.js}</script></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    frame.src = URL.createObjectURL(blob);
  }
})();
