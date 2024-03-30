(() => {
    let body = document.querySelector("body");
    let sideCont = document.createElement("div");
    let pre = document.querySelectorAll("pre");
    let main = document.querySelector("main");

    style(main, {
        width: "50%",
        overflowY: "auto",
        height: "calc(100vh - 156px)",
        margin: "0",
        paddingBottom: "100px",
    });

    style(body, { overflowY: "hidden" });

    style(sideCont, {
        width: "50%",
        position: "fixed",
        right: "0",
        top: "0",
        height: "100vh",
        overflowY: "auto",
    });

    body.appendChild(sideCont);

    let markedItems = [...document.querySelectorAll("blockquote > p")];
    let documents = [...pre].map(getText);

    window.highlights = [];
    window.current = 0;

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
                color: "transparent",
            });
        }
    }

    style(pre[window.highlights[0][2]], { display: "block" });
    let currentItem = -1;
    main.onscroll = (e) => {
        let closestItem;
        let minDistance = Infinity;

        markedItems.forEach((item, i) => {
            if (isInViewport(item) || i == markedItems.length - 1) {
                const distance = Math.abs(item.getBoundingClientRect().top);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestItem = item;
                }
            }
        });

        let found = window.highlights[parseInt(closestItem.dataset.index)];
        if (currentItem != parseInt(closestItem.dataset.index)) {
            for (let i = 0; i < window.highlights.length; i++) {
                const element = window.highlights[i];
                unHighlight(pre[element[2]], element);
                style(pre[element[2]], { display: "none" });
            }

            style(pre[found[2]], { display: "block" });
            highlight(pre[found[2]], found);
            view(sideCont, pre[found[2]], found);
            currentItem = parseInt(closestItem.dataset.index);
        }
    };
})();

function style(el, styles) {
    for (const key in styles) {
        el.style[key] = styles[key];
    }
}

function getText(el) {
    let t = "";
    let code = el.querySelector("code");

    for (let a = 0; a < code.children.length; a++) {
        const element = code.children[a];
        t += element.children[1].innerText;
    }
    return t;
}

function find(text, documents) {
    let q = text.replace(/\s/g, "");

    let index = 0;
    let start = 0;
    let end = Infinity;

    for (let i = 0; i < documents.length; i++) {
        const d = documents[i].replace(/\s/g, "");
        if (d.indexOf(q) != -1) {
            let lines = documents[i].split("\n");
            for (let a = 0; a < lines.length; a++) {
                if (
                    lines
                        .slice(0, a)
                        .join("\n")
                        .replace(/\s/g, "")
                        .indexOf(q) != -1
                ) {
                    end = a;
                    for (let b = 0; b < a + 1; b++) {
                        if (
                            lines
                                .slice(b, a)
                                .join("\n")
                                .replace(/\s/g, "")
                                .indexOf(q) == -1
                        ) {
                            start = b;
                            index = i;
                            break;
                        }
                    }
                    break;
                }
            }
        }
    }
    return [start, end, index];
}

function highlight(el, lines) {
    let code = el.querySelector("code");

    for (let a = lines[0] - 1; a < lines[1]; a++) {
        const element = code.children[a];
        style(element, {
            background: "#d2dc0024",
        });
    }
}

function unHighlight(el, lines) {
    let code = el.querySelector("code");

    for (let a = lines[0] - 1; a < lines[1]; a++) {
        const element = code.children[a];
        style(element, {
            background: "",
        });
    }
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

function view(parentElement, el, lines) {
    let code = el.querySelector("code");
    let childElement = code.children[lines[0] - 1];
    const parentRect = parentElement.getBoundingClientRect();
    const childRect = childElement.getBoundingClientRect();
    const parentScrollTop = parentElement.scrollTop;

    // Calculate the vertical position to scroll to center the child element
    const targetScrollTop =
        childRect.top -
        parentRect.top -
        (parentRect.height - childRect.height) / 2;

    // Scroll the parent element to the calculated position
    parentElement.scrollTo({
        top: parentScrollTop + targetScrollTop,
        behavior: "smooth", // Optional: for smooth scrolling
    });
}
