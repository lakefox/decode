# Seeded Random Number Generator in JS

Random numbers are an essential tool for developers, whether it's for generating random colors for page elements, creating dynamic content on canvas, or any other purpose. However, one issue with the default Math.random() function is you can not repeat the results. This can be a problem if you want to generate randomness but still need some control over the output.

Seeded random numbers can be helpful if you want to create randomness but also need to control the output. Below is an example of a simple seeded random number generator that is a drop-in replacement for `Math.random()`.

<example>

```javascript
function random(seed) {
  var m = 2 ** 35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
}
```

</example>

## How it works

Linear congruential generators (LCGs) work by using a linear equation to generate a sequence of numbers that appears to be random. The general form of the equation is:

```javascript
Xn+1 = (aXn + c) % m
```

Where `Xn` is the current random number, `a` is the multiplier, `c` is the increment, and `m` is the modulus. To start the sequence, a seed value `(X0)` is used to generate the first random number `(X1)`. The next number in the sequence is then generated using the value of `X1`, and so on. The resulting sequence of numbers will appear to be random but are actually determined by the values of `a`, `c`, and `m`. These values can be chosen to produce an extended period (the number of random numbers that can be generated before the sequence repeats). However, LCGs are still limited by their tendency to produce sequences of numbers that are not evenly distributed.

In the code above `m` or the modulus is 2 to the power of 35 then 31 is subtracted. These numbers are not random but are pulled from [this paper](https://www.ams.org/journals/mcom/1999-68-225/S0025-5718-99-00996-5/S0025-5718-99-00996-5.pdf). The multiplier `a` is `185852`, then the `seed` number that you passed is modules by `m` the modulus to start the sequence. The function returns another function allowing you to continue the sequence by setting the variable `s` to the operation's output.

The output of this function is not truly random so it is essential to not use this for anything that needs a secure random number generator. However, this function is a great way to quickly generate a seeded random number.

## How to use

This is a very simple function to use, below is a example:

```javascript
function random(seed) {
  var m = 2 ** 35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
}

let rng = random(12345);

console.log(rng());
// 0.06677416799560885
```

## Demo

<demo>
Seed: <input type="number" value="10" onchange="changeSeed()" id="val"/>
Results: <code id="rng"></code>

<br/><br/>
<input type="button" onclick="genRandom()" value="Generate"/>

<script>
function random(seed) {
    var m = 2 ** 35 - 31
    var a = 185852
    var s = seed % m
    return function () {
        return (s = s * a % m) / m
    }
}

let rng = random(parseFloat(document.querySelector("#val").value));

function genRandom() {
 document.querySelector("#rng").innerHTML = rng();
}

function changeSeed() {
 rng = random(parseFloat(document.querySelector("#val").value));
 genRandom();
}

</script>
</demo>
