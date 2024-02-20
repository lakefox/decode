let inputs = document.querySelectorAll("[name]");

let state = {};

for (let i = 0; i < inputs.length; i++) {
  let input = inputs[i];
  if (input.name != "") {
    if (!state[input.name]) {
      state[input.name] = input.value;
    }
    if (input.type == "radio") {
      inputs[i].addEventListener("input", (e) => {
        state[input.name] = e.checked;
        updateState();
      });
    } else if (input.type == "number") {
      inputs[i].addEventListener("input", (e) => {
        state[input.name] = parseFloat(e.target.value);
        updateState();
      });
    } else {
      inputs[i].addEventListener("input", (e) => {
        state[input.name] = e.target.value;
        updateState();
      });
    }
  }
}
let els = getTextNodes(document.body);

let tester = /\@\{(.*?)\}/;
let stack = [];
for (let i = 0; i < els.length; i++) {
  let text = els[i].textContent;
  if (tester.test(text)) {
    let match = tester.exec(text);
    let name = "";
    if (match) {
      name = match[1];
    }
    els[i].parentElement.innerHTML = text.replace(
      tester,
      `<span data-node="${name}"></span>`
    );
  }
  if (tester.test(stack.map((e) => e.textContent).join("") + text)) {
    let stackSlice = [];
    for (let a = 0; a < stack.length; a++) {
      if (
        !tester.test(
          stack
            .slice(a)
            .map((e) => e.textContent)
            .join("") + text
        )
      ) {
        stackSlice = stack.slice(a - 1).concat(els[i]);
        break;
      }
    }
    let ss = stackSlice.map((e) => e.textContent).join("");
    let match = tester.exec(ss);
    let name = "";
    if (match) {
      name = match[1];
    }
    if (tester.test(ss)) {
      stackSlice[0].parentElement.innerHTML = ss.replace(
        tester,
        `<span data-node="${name}"></span>`
      );
      for (let a = 1; a < stackSlice.length; a++) {
        stackSlice[a].textContent = "";
      }
    }
    stack = [];
  }
  stack.push(els[i]);
}

updateState();

function updateState() {
  let outputs = document.querySelectorAll("[data-node]");
  for (let i = 0; i < outputs.length; i++) {
    outputs[i].innerHTML = state[outputs[i].dataset.node];
  }
}

// .match(/\@\{(.*?)\}/g);
function getTextNodes(element, textNodes = []) {
  for (let node of element.childNodes) {
    if (node.nodeType === 3) {
      // Check if it's a text node
      textNodes.push(node);
    } else if (node.nodeType === 1) {
      // Check if it's an element node
      getTextNodes(node, textNodes); // Recursively traverse child nodes
    }
  }
  return textNodes;
}
