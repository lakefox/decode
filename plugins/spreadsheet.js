(() => {
  let script = document.createElement("script");
  script.onload = () => {
    let sheets = document.querySelectorAll("table[spreadsheet]");
    for (let a = 0; a < sheets.length; a++) {
      const sheet = sheets[a];
      let contents = JSON.parse(sheet.getAttribute("data"));
      let cells = parseInt(sheet.getAttribute("cells"));
      let rows = parseInt(sheet.getAttribute("rows"));
      let head = document.createElement("thead");
      head.appendChild(document.createElement("td"));
      for (let b = 0; b < cells; b++) {
        let label = document.createElement("td");
        label.innerHTML = (
          " abcdefghijklmnopqrstuvwxyz"[Math.floor(b / 26)] +
          "abcdefghijklmnopqrstuvwxyz"[Math.floor(b % 26)]
        )
          .trim()
          .toUpperCase();
        head.appendChild(label);
      }
      sheet.appendChild(head);
      let html = document.createElement("tbody");
      for (let b = 0; b < rows; b++) {
        let row = document.createElement("tr");
        let td = document.createElement("td");
        td.innerHTML = b;
        row.appendChild(td);
        for (let c = 0; c < cells; c++) {
          let td = document.createElement("td");
          let input = document.createElement("input");
          input.type = "text";
          input.dataset.x = c;
          input.dataset.y = b;
          input.dataset.value = "";
          input.value = "";
          input.addEventListener("focusin", (e) => {
            e.target.value = e.target.dataset.value;
          });
          input.addEventListener("focusout", (e) => {
            exe(e.target.parentNode.parentNode.parentNode.parentNode);
          });
          input.addEventListener("keyup", (e) => {
            e.target.dataset.value = e.target.value;
            e.target.parentNode.parentNode.parentNode.parentNode.setAttribute(
              "data",
              JSON.stringify(
                parseSheet(e.target.parentNode.parentNode.parentNode.parentNode)
              )
            );
          });

          if (contents[b]) {
            if (contents[b][c]) {
              input.dataset.value = contents[b][c];
              input.value = contents[b][c];
            }
          }

          td.appendChild(input);
          row.appendChild(td);
        }
        html.appendChild(row);
      }
      sheet.appendChild(html);
      exe(sheet);
    }

    function parseSheet(sheet, elements = false) {
      let inputs = [...sheet.querySelectorAll("input")].filter(
        (e) => e.value.length > 0
      );
      let values = [];
      inputs.forEach((e) => {
        if (!values[parseInt(e.dataset.y)]) {
          values[parseInt(e.dataset.y)] = [];
        }
        if (elements) {
          values[parseInt(e.dataset.y)][parseInt(e.dataset.x)] = e;
        } else {
          values[parseInt(e.dataset.y)][parseInt(e.dataset.x)] = e.value;
        }
      });
      return values;
    }

    function query(sheet, selector) {
      let sSplit = selector.toLowerCase().split(":");
      if (sSplit.length > 1) {
        let start = mapSelector(sSplit[0]);
        let end = mapSelector(sSplit[1]);
        let selected = [];
        for (let y = start[1]; y < end[1] + 1; y++) {
          let row = [];
          for (let x = start[0]; x < end[0] + 1; x++) {
            row.push(
              type(
                sheet.querySelector(`input[data-x="${x}"][data-y="${y}"]`).value
              )
            );
          }
          selected.push(row);
        }
        return selected;
      } else {
        let xy = mapSelector(sSplit[0]);
        return type(
          sheet.querySelector(`input[data-x="${xy[0]}"][data-y="${xy[1]}"]`)
            .value
        );
      }
    }

    function mapSelector(selector) {
      let selectors = "abcdefghijklmnopqrstuvwxyz";
      return [
        selector
          .replace(/[^a-z]/g, "")
          .split("")
          .map((e) => selectors.indexOf(e))
          .reduce((e, a) => e + a, 0),
        parseInt(selector.replace(/[a-z]/g, "")) - 1,
      ];
    }

    function type(val) {
      if (val == "false" || val == "true") {
        return val == "true";
      } else {
        if (isNaN(val)) {
          return `"${val}"`;
        } else {
          return parseFloat(val);
        }
      }
    }

    function exe(sheet) {
      let functions = parseSheet(sheet, true)
        .flat()
        .filter((e) => e.dataset.value);
      for (let i = 0; i < functions.length; i++) {
        if (functions[i].dataset.value.trim()[0] == "=") {
          let res = new Function(
            `return ${functions[i].dataset.value
              .replace(/[A-Z0-9]+\:[A-Z0-9]+/g, (e) => {
                return JSON.stringify(query(sheet, e));
              })
              .replace(/[A-Z]+[0-9]+/g, (e) => {
                return JSON.stringify(query(sheet, e));
              })
              .replace(/[A-Z]+\((.*?)\)/g, (e) => `formulajs.${e}`)
              .slice(1)}`
          )();
          functions[i].value = res;
        }
      }
    }
  };
  script.src =
    "https://cdn.jsdelivr.net/npm/@formulajs/formulajs/lib/browser/formula.min.js";
  document.body.appendChild(script);
})();
