# Styling HTML Tables in CSS

Tables in HTML play an important role in laying out complex sets of data. By default the table styling is boring, with this guide learn how to create awesome tables.

![CSS Tables](./css_tables_header_lhtn7xcmxz.webp)

## Overview

CSS Tables are formed out of four main elements, `<table>`, `<tr>`, `<th>`, and `<td>`.

- Table Element
  - Defines the Table container, all elements are contained in this tag
- Table Row
  - Table Row (TR) is the element where the columns are placed into
- Table Header
  - Table Header (TH) is a column designated for the head of the table. Using a unique element allows for easier styling
- Table Data
  - Table Data (TD) is the main column element for a table

### Other Elements

There are two other elements that are not required to use but make the styling of your data much easy. They are the `<thead>` and `<tbody>` elements, all that they do is specify which rows are part of the body and head. If you do not declare these elements then they default to the tbody.

## Usage

Using tables is very straightforward, put all of the contents into the main tag. Wrap each row in a `<tr>` tag. The tags inside of the `<tr>` tag can be either a `<th>` or a `<td>` tag. For the column you want to style as the header, make sure to put all of the elements in a `<th>` tag. Wrap each column in a `<td>` tag for the rest of the data.

```html
<table>
  <thead>
    <tr>
      <th class="c">Name</th>
      <th class="c">Phone Number</th>
      <th class="c">Country</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Kathy W. Botello</td>
      <td>Rebekka Gjerstad</td>
      <td>Maximiliana Chapa Longoria</td>
    </tr>
    <tr>
      <td>919 726 4691</td>
      <td>987 77 711</td>
      <td>714 963 731</td>
    </tr>
    <tr>
      <td>Unitied States</td>
      <td>Norway</td>
      <td>Spain</td>
    </tr>
  </tbody>
</table>
```

### Result

| Name                       | Phone Number | Country       |
| -------------------------- | ------------ | ------------- |
| Kathy W. Botello           | 919 726 4691 | United States |
| Rebekka Gjerstad           | 987 77 711   | Norway        |
| Maximiliana Chapa Longoria | 714 963 731  | Spain         |

This table is styled with PicoCSS, which is a great option (along with any other CSS framework) if you don't want to manually style your entire page.

## Styling the table

![Table Example](./users_masonwright_desktop_social_css_table_html_yCbtonpg1M.png)

Breaking out each section of the table using the `<th>` and `<td>` tags makes styling very intuitive. The best way I have found to style the table it to style the tags directly so the entire page's tables all look the same. Here is the code for the table above.

```css
table {
  border-spacing: 1;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  font: 400 14px "Calibri", "Arial";
}

table * {
  position: relative;
}

table td,
table th {
  padding-left: 8px;
}

table thead tr {
  height: 60px;
  background: #17232c;
  color: #fff;
  font-size: 16px;
}

table tbody tr {
  height: 48px;
  border-bottom: 1px solid #7d7d7d;
}

table tbody tr:last-child {
  border: 0;
}
```

## Aligning table items

By default, all the text inside of the table will be right aligned, if you want to align the items in other way the best method is to create some custom classes. The classes below will align the text inside of a table `td` or `th` element by adding an `l`, `c`, or `r` class.

```css
table td,
table th {
  text-align: left;
}

table td.l,
table th.l {
  text-align: right;
}

table td.c,
table th.c {
  text-align: center;
}

table td.r,
table th.r {
  text-align: center;
}
```

## Styling specific rows

Styling specific rows can be useful when you want to create tables that have alternating rows or different parts of the data that need to look different for better readability. This can be done using the `:nth-child` selector like below.

```css
tbody > tr:nth-child(2n + 1) {
  background-color: #fff;
}

tbody > tr:nth-child(2n + 2) {
  background-color: #ddd;
}
```

The `:nth-child` selector takes a single argument formatted with this `<An+B>` format. The `A` is the step size or how big your selection group is. The `n` is the representation of where the selector is and the `+B` is the offset.

In our example `2` is in place of `A` because we want to do every other element, `n` stays as `n`. Then `+B` is `+1` and `+2`, `+1` tells the browser to apply the style to the first element in the selection and the `+2` tells it to apply the respective style to the second one.
