# walk-through

Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.

<input name="name" placeholder="Enter Name">

## Getting started

Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.

> function d() {
> l ? (console.log("Loaded @{name}"), e()) : (l = !0);
> }

Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.

> i.src = "https://unpkg.com/dragselect@latest/dist/ds.min.js";

## TRext

> this is a text

Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.

> let doc = {
> html: "",
> css: "",
> js: "",
> };

text

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
            for (let p = 0; p < r.length; p++)
                d.appendChild(r[p].cloneNode(!0));
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
        l ? (console.log("Loaded @{name}"), e()) : (l = !0);
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
                t.push(e),
                    e.children.length > 0 && t.push(...r([...e.children]));
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

```javascript
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
```

<div editor>

```html
<h1>Hello</h1>
```

```css
h1 {
    color: red;
}
```

```javascript
document.querySelector("h1").innerText += " @{name}";
```

</div>

Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.

```javascript
for (let i = 0; i < markedItems.length; i++) {
    const text = markedItems[i].innerText;
    let found = find(text, documents);
    console.log(text, found);
    if (found[0] == 0 && found[1] == Infinity && found[0] == 0) {
        markedItems.splice(i, 1);
        i--;
    } else {
        window.highlights.push(found);
        sideCont.appendChild(pre[found[2]]);
        style(pre[found[2]], { display: "none" });
        markedItems[i].dataset.index = window.highlights.length - 1;
        style(markedItems[i], {
            background: "#673AB7",
            border: "none",
            borderRadius: "10px",
            color: "transparent",
            padding: "5px",
        });
    }
}
```

Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.

<table
  spreadsheet
  cells="100"
  rows="20"
  data='[["Item","Cost"], ["Rent","1500"], ["Utilities","200"],["Groceries","360"], ["Transportation","450"], ["Entertainment","1203"], ["Total","=SUM(B2:B6)"]]'
></table>

facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.

facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.
facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolor voluptatem sunt deleniti quas neque recusandae optio culpa amet, sed voluptate labore magnam quasi, dolorem fugiat, facere esse ad veritatis.

<script src="/plugins/codepen.js"></script>
<script src="/plugins/spreadsheet.js"></script>
<script src="/plugins/sidebyside.js"></script>
<script src="/plugins/mdxt.js"></script>
