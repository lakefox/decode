# Shortcuts

Description

## Pastable Links

### Auto Post Liker

```javascript
javascript: (async () => {
  let e = [...document.querySelectorAll("a")].slice(10);
  for (let l = 0; l < e.length; l++) {
    let a = e[l];
    if (-1 != a.href.indexOf("/p/")) {
      a.click(), await i(3e3);
      let t = [...document.querySelectorAll("svg[aria-label='Like']")];
      await i(2e3);
      for (let r = 0; r < t.length; r++) t[r].parentNode.click(), await i(1e3);
      document.querySelector("svg[aria-label='Close']").parentNode.click(),
        await i(500);
    }
  }
  function i(e) {
    return new Promise((l) => {
      setTimeout(l, e);
    });
  }
})();
```

### Screen Shot Tool

```javascript
javascript: (() => {
  function e() {
    let e = prompt("Enter Width (in pixels)", "1080") + "px",
      t = prompt("Enter Height (in pixels)", "1080") + "px",
      n = prompt("Enter Padding (in pixels)", "100") + "px",
      i = new DragSelect({
        selectables: r([...document.querySelector("body").children]),
        draggability: !1,
      });
    i.subscribe("callback", (l) => {
      let d = document.createElement("div"),
        r = a(l.items);
      for (let p = 0; p < r.length; p++) d.appendChild(r[p].cloneNode(!0));
      document.body.appendChild(d),
        (d.style.background = o(d)),
        (d.style.width = e),
        (d.style.height = t),
        (d.style.padding = n),
        (d.style.display = "flex"),
        (d.style.flexDirection = "column"),
        (d.style.justifyContent = "center"),
        domtoimage
          .toPng(d)
          .then(function (e) {
            var t = new Image();
            t.src = e;
            let n = document.createElement("dialog");
            n.open = !0;
            let l = document.createElement("div");
            (l.innerHTML = "X"),
              (l.onclick = () => {
                document.body.removeChild(n), i.start();
              }),
              n.appendChild(l),
              n.appendChild(t),
              document.body.appendChild(n),
              i.stop(),
              document.body.removeChild(d);
          })
          .catch(function (e) {
            console.error("oops, something went wrong!", e);
          });
    });
  }
  let t = document.createElement("style");
  (t.innerHTML =
    "dialog > img { width: 700px; max-width: 90%;} dialog {display: flex; flex-direction: column;} dialog > div {text-align: right; font-weight: 900; font-family: sans-serif;width: 700px;margin: 0 12px -32px 0px;z-index: 2;cursor: pointer;max-width: 90%;}"),
    document.head.appendChild(t);
  let n = document.createElement("script");
  n.src = "https://unpkg.com/dom-to-image";
  let i = document.createElement("script");
  i.src = "https://unpkg.com/dragselect@latest/dist/ds.min.js";
  let l = !1;
  function d() {
    l ? (console.log("Loaded"), e()) : (l = !0);
  }
  function o(e) {
    let t = !1;
    for (var n in e) {
      let i = getComputedStyle((e = e.parentNode)).getPropertyValue(
        "background-color"
      );
      if ("rgba(0, 0, 0, 0)" != i) {
        t = i;
        break;
      }
      if (!e.parentNode) break;
    }
    return t;
  }
  function r(e) {
    let t = [];
    return (
      e.forEach((e) => {
        t.push(e), e.children.length > 0 && t.push(...r([...e.children]));
      }),
      t.filter((e) => "DIV" != e.nodeName && "MAIN" != e.nodeName)
    );
  }
  function a(e) {
    let t = [];
    for (let n = 0; n < e.length; n++)
      -1 == e.indexOf(e[n].parentNode) && t.push(e[n]);
    return t;
  }
  (n.onload = d),
    (i.onload = d),
    document.body.appendChild(n),
    document.body.appendChild(i);
})();
```
