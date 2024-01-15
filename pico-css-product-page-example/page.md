# PicoCSS product page example

Pico CSS is a great tool for building low code interfaces, today we will be going through the process of creating a product page for a ecommerce store. The image below shows what you will have at the end.

![Product Page Example](./localhost_5173_products_XONOYt44nT.webp)

## Header

The header takes advantage of Pico’s built in styles with a few lines of extra CSS.

```html
<!— HTML —>
<nav>
  <ul>
    <li>
      <img id="favicon" src="/logo.png" alt="Logo" /><strong class="bold"
        >LOW</strong
      >
    </li>
  </ul>
</nav>
```

```css
/* CSS */
nav > ul > li {
  margin-left: 30px;
  font-size: 30px;
  color: black;
}
#favicon {
  height: 25px;
  margin-top: -5px;
  margin-right: 5px;
}
```

### The container

This is the core of our page, the `main` element containes all of our content for the page so we can pass style from it to the other element reducing the amount of CSS that is needed.

```html
<!— HTML —>
<main>
 <h1 class="bold">Products</h1>
 <div id="products”></div>
</main>
```

```css
/* CSS */
main {
  margin: auto;
  width: 90%;
  max-width: 1100px;
  margin-top: 100px;
  margin-bottom: 100px;
}
.bold {
  font-family: "Arial Black", Helvetica, sans-serif;
  font-weight: 900;
}
#products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
```

### The cards

The card will contain the actual product information in it, as long with any images we want to add in. We will use the `h4` and `h6` elements for the label formating and the `button` element to add the product to the cart. Add these cards into the `#products` div to add a new product.

```html
<!— HTML —>
<div class="card”>
 <img src="https://i.imgur.com/GIeyjWd.jpg" alt="Product" />
 <h4>Adobe Photoshop</h4>
 <h6 class="right">$12.00</h6>
 <button>Add to Card</button>
</div>
```

```css
/* CSS */
.card {
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 50px -30px #212121;
  margin: 20px;
}
.card > img {
  border-radius: 10px;
}
/* This is optional if you want the text to align left you can remove this */
.right {
  text-align: end;
}
```

### Everything together

```html
<!— HTML —>
<nav>
  <ul>
    <li>
      <img id="favicon" src="/logo.png" alt="Logo" /><strong class="bold"
        >LOW</strong
      >
    </li>
  </ul>
</nav>

<main>
  <h1 class="bold">Products</h1>
  <div id="products">
    <div class="card">
      <img src="https://i.imgur.com/GIeyjWd.jpg" alt="Product" />
      <h4>Adobe Photoshop</h4>
      <h6 class="right">$12.00</h6>
      <button>Add to Card</button>
    </div>
  </div>
</main>
```

```css
/* CSS */
<style>
 nav > ul > li {
  margin-left: 30px;
  font-size: 30px;
  color: black;
 }
 #favicon {
  height: 25px;
  margin-top: -5px;
  margin-right: 5px;
 }
 main {
  margin: auto;
  width: 90%;
  max-width: 1100px;
  margin-top: 100px;
  margin-bottom: 100px;
 }
 .bold {
  font-family: 'Arial Black', Helvetica, sans-serif;
  font-weight: 900;
 }
 #products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
 }
 .card {
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 50px -30px #212121;
  margin: 20px;
 }
 .card > img {
  border-radius: 10px;
 }
 .right {
  text-align: end;
 }
</style>
```
