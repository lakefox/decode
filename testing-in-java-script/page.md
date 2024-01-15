# Testing in JavaScript

Testing in Javascript can be done on your own, by writing application-specific tests to ensure your code is working the way you want it to or, it can be done with a testing library that can help remove some of the extra code.

Testing is usually done at a library level if you make a custom library for example named `sum.js` the best way to manage your test would be to put them into a `sum.text.js` file. This method of storing your tests removes the testing part of your application from the rest of it and makes sure none of the tests get bundled and sent to the client.

### Installing Jest

```bash
npm install --save-dev jest
```

<div share data-width="500" data-height="500" data-padding="50px">

### Building tests with Jest

Jest is one of the most popular testing libraries out there and is one of my favorites to use. Jest makes writing tests easy by using an almost plain English syntax like below.

```javascript
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

</div>

This is a test for a function that adds two numbers called `sum`. We first define the test inside of the `test` function. The first argument is the text that displays when the function passes the test. The next argument is the function to run during the test, inside this function we use the Jest syntax to configure the test. `expect` is the main function where we put the `sum` function with test parameters. Then off of that function, we are expecting the sum function when giving the parameters `1` and `2` to be `3`. All of Jest's testing criteria are written this way making the experience super easy to get started with.

To get a full list of all of the matches visit the jest docs [here](https://jestjs.io/docs/using-matchers "Jest Documentation")

<div share data-width="500" data-height="500" data-padding="50px">

### Running tests

To set up Jest to run tests first you will need to edit your project's `package.json` file and add the test script. Most `package.json` files include a test script like below.

```javascript
"scripts": {
   "test": "echo \"Error: no test specified\" && exit 1"
 },
```

to get Jest running change it to look like this:

```javascript
"scripts": {
   "test": "jest"
 },
```

</div>

To run the tests run `npm test` in a terminal and the output will look something like this:
![Jest Output](./screen_shot_2023_04_03_at_3_29_09_pm_IJ2MRHMrvx.png)
