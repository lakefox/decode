# Generating Random Colors on a Range
If you want to add some visual interest to your website, consider incorporating random colors. While using the Math.random() function to generate colors can be a quick and easy option, it may result in some less-than-appealing hues. An alternative approach is to create a set of random colors that all conform to a specific color profile. Here's a simple method for doing so.

#### Code

<example>

```
function color(min, max, rng) {
    let c = [min, max, Math.floor(Math.random() * (max - min)) + min].sort(() =>
        Math.random() > 0.5 ? 1 : -1
    );
    return `rgb(${c[0]},${c[1]},${c[2]})`;
}
```

</example>

#### How it works
The `color` function takes in two parameters, `min` and `max`, which determine the range from which the randomly generated color will be selected. To generate a random color, an array `c` is created with two of the values being the `min` and `max` numbers, and the third value being a random number within that range. This array is then used to create an RGB string using a template string. In this way, you can easily create a random color that fits within a specified range.

#### How to get the `min` and `max`
Matching the `min` and `max` values to a specific color is straightforward. Simply use the lowest and highest values of the color's RGB values as the `min` and `max` values, respectively. This ensures that the randomly generated color will be within the same color range as the target color.

#### Demo
##### `MIN: 54` `MAX: 177`
R
@[r]{125}
G
@[g]{125}
B
@[b]{125}

<div style="width: 100%; height: 100px; background: rgb(${r},${g},${b})" id="color"/>

<input type="button" onclick="regen()" value="Generate Color" style="margin-top: 20px;">

<script>
function color(min, max, rng) {
    let c = [min, max, Math.floor(Math.random() * (max - min)) + min].sort(() =>
        Math.random() > 0.5 ? 1 : -1
    );
    return c;
};
function regen() {
let co = color(54,177);
document.querySelector(`input[data-name="r"]`).value = co[0];
document.querySelector(`input[data-name="g"]`).value = co[1];
document.querySelector(`input[data-name="b"]`).value = co[2];

document.querySelector(`input[data-name="r"]`).onkeyup();
document.querySelector(`input[data-name="g"]`).onkeyup();
document.querySelector(`input[data-name="b"]`).onkeyup();
}
</script>