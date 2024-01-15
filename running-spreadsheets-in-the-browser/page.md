# Running Spreadsheets in the Browser
Spreadsheets are used everywhere in business and just about everyone knows how to use them at least at the surface level. If you want to build functionality into your website or blog post without building out a complete system you could opt to embed a spreadsheet instead.

For the spreadsheet parser we will be building, we will use a table tag with a `spreadsheet` attribute and a `data` attribute that will contain the CSV data in the form of a two dimensional array. The size of the spreadsheet will be determined by a set of `rows` and `cells` attributes and the complete tag will look like this:
```html
<table
    spreadsheet
    cells="100"
    rows="20"
    data='[["Item","Cost"], ["Rent","1500"], ["Utilities","200"],["Groceries","360"], ["Transportation","450"], ["Entertainment","1203"], ["Total","=SUM(B2:B6)"]]'
></table>
```

This will be parsed into a HTML table that looks like this:

#{spreadsheet}
	Item | Cost
	Rent | 1500
	Utilities | 200
	Groceries | 360
	Transportation | 450
	Entertainment | 1203
	Total | =SUM(B2:B6)

<br>

If you click on `B6`, the cell will switch from containing the output value of the function assigned to it, to the function. All data can be edited and the function will reflect the updated values. The functionality of the spreadsheet be done using a library called [formulajs](https://formulajs.info/ "FormulaJS"). This removes a ton of work that would be needed if you were to build this from scratch.

### Building the table

Below is the first part of what we need to create this, I added comments going step by step over the main functionality it. We will need to add more later, however, this code is the part where we generate the HTML for the table and lay the groundwork for the interactivity.

#### Creating the head

```javascript
// Collect the table elements with the spreadsheet attribute
let sheets = document.querySelectorAll("table[spreadsheet]");

for (let a = 0; a < sheets.length; a++) {
    const sheet = sheets[a];
    // Get the CSV data in the form of JSON
    let contents = JSON.parse(sheet.getAttribute("data"));

    let cells = parseInt(sheet.getAttribute("cells"));
    let rows = parseInt(sheet.getAttribute("rows"));

    // Create the head of the table
    let head = document.createElement("thead");
    head.appendChild(document.createElement("td"));
    // Make the head fill the entire table
    for (let b = 0; b < cells; b++) {
        let label = document.createElement("td");
        // This takes the position of the cell and turns it into an alphabetic selector
        // For example 0 == "A" and 28 == "AB"
        label.innerHTML = (
            " abcdefghijklmnopqrstuvwxyz"[Math.floor(b / 26)] +
            "abcdefghijklmnopqrstuvwxyz"[Math.floor(b % 26)]
        )
            .trim()
            .toUpperCase();
        head.appendChild(label);
    }
    sheet.appendChild(head);
	/* ... */
```

First, we select all of the table elements with the spreadsheet attribute and parse the JSON data from the `data` attribute. Along with getting the JSON data, we will also need the dimensions of the table of the cells/rows attributes. After we have all the attributes we need to create the head of the table. The head will be the first row with alphabetic selectors To do this we can create a `for` loop that goes over each cell and create a `td` element inside of the `thead`. Generating the selector from the index of the cell is pretty simple, create two strings with all the letters. The first string needs a space in it so we can remove it using the `.trim()` method for the first 26 selectors. Then we clamp the index to 26 using the modulus operator to index the correct letter in the string.

 #### Creating the body

The creation of the body is the same process as the creation of the head, except that we will have to go through the two-dimensional array that contains the data. After we create the `tbody` element, we need to loop through the rows and create a `tr` element for each one. The `tr` or table row element will contain all the cells in the table. The first cell in the row should be a number to make reading, which row you are on more easily. 

Next we need to loop through the cells of the table and fill them with the data if the JSON object contains a value in its position. To do this we first have to create the cell, which is made up of a `td` or table data element and an input field. We give the input some extra `data-` attributes like `data-x` and `data-y` to help with building the reactivity of the spreadsheet. The data x/y attributes will help us locate the cell and map it to the appropriate selector when a function is called. The `data-value` attribute is the last attribute we will add, it's propose is to store the original value given in the sheet. This is only used when a cell contains a function, function cell will show the calculated value of the function until a user clicks on it. Once the cell is clicked, the value of the cell will be switched to the value of the `data-value` attribute. If you look at the code now, you might notice that we are setting the value to an empty string. This is because we still need to generate the cells that do not contain a value, we will give them a value after we add the event listeners.

```javascript
	/* ... */
    // Create the body of the table
    let body = document.createElement("tbody");
    for (let b = 0; b < rows; b++) {
        let row = document.createElement("tr");
        // Create the first column of number for the table
        let td = document.createElement("td");
        td.innerHTML = b;
        row.appendChild(td);
        // Fill the cells that contain values
        for (let c = 0; c < cells; c++) {
            let td = document.createElement("td");
            // Each cell is made up of a input element
            let input = document.createElement("input");
            input.type = "text";
            // The data-x and data-y attributes will be used to process data later
            input.dataset.x = c;
            input.dataset.y = b;

            // Initiate the input with nothing inside
            input.dataset.value = "";
            input.value = "";
			/* ... */
```

#### Event listeners

```javascript
            /* ... */
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
                        parseSheet(
                            e.target.parentNode.parentNode.parentNode.parentNode
                        )
                    )
                );
            });
		/* ... */
```

When building the reactivity of the spreadsheet, we will need to create events for three different cases: click-in, click-out, and editing. We will be using the `focusin` event to observe when the user clicks into the input. Once the user has clicked in, we  need to change the value of it to the raw value. If it is a function it will be the function instead of the output of the function and if it is just a value then there will be no change. We do this by setting the target value to the value stored in the `data-value` attribute. When the user clicks out of the input we will detect it using `focusout` and then the `exe` function below will handle the rest.

```javascript
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
```

The `exe` function takes the current table element (sheet) as a input, we get this value by getting the fourth removed parent of the input element. This will work every time because the event listener is on the input and the structure of the table looks like below:

```html
<table>
	<tbody>
		<tr>
			<td>
				<input>
```

```javascript
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
```

The `exe` function will need to get the contents of the table using the `parseSheet` function below. The `parseSheet` function has two arguments, the table and a boolean that if true will return the elements of the table and if false will return the values. For the `exe` function we want the elements so we can change the values of them. To keep this document from getting too long the `parseSheet` works by getting all of the `input` elements from the sheet variable, removing all empty elements and remapping them to a 2d array.

Once we have the cells that contain values flattened, we can loop through them and check to see if the value of the cell is a function by checking if the first character is an equals sign. If it is we will use the `Function` constructor to evaluate the statement we create next. The regex inside of the template literal replaces selectors i.e. `B6` or `B2:B6` within the function arguments with a JSON object containing the data in the sheet. Then it searches for function calls and i.e. `SUM()` with `formula.SUM()`, this allows us to use excel functions in javascript. 

```javascript
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
```

Within the replace statement, we use a function called `query`, this function will take the selector from the replace function and grabs the values off the table. It does this using the data-x/y attributes and  mapping the selector to corresponding x/y coordinates. Once it has the values, we need to turn them into the correct type variable. This is done using the `type` function, if you want to look at it and the mapping function they will be below.

```javascript
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
                        sheet.querySelector(
                            `input[data-x="${x}"][data-y="${y}"]`
                        ).value
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
```

```javascript
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
```

Finishing off the original for loop, we assign the input element it's value if the contents array has a value in it and append everything to the table element.

```javascript
			/* ... */	
            // Check if the cell has a set value and populate it
            if (contents[b]) {
                if (contents[b][c]) {
                    input.dataset.value = contents[b][c];
                    input.value = contents[b][c];
                }
            }

            td.appendChild(input);
            row.appendChild(td);
        }
        body.appendChild(row);
    }
    sheet.appendChild(body);
}
```

Don't forget to load FormulaJS!

```html
<script src="https://cdn.jsdelivr.net/npm/@formulajs/formulajs/lib/browser/formula.min.js"></script>
```

If you would like to have a self injecting version of this code, see [this](https://gist.github.com/lakefox/30e3c3e280f4a4e756aa5a2c4b70d83b) gist. This is the complete code put together from this tutorial, plus it will create a script tag and inject FormulaJS into the document.
