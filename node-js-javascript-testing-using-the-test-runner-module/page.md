# NodeJS/Javascript Testing Using the Test Runner Module
The test runner API is a new set of built-in tools allowing you to natively create tests for your code. No more need for Jest, Mocha, or Ava! This will bring Node up with most modern languages (Dart, Rust, GO) and reduce the package size of your code base.

The test runner API is not a drop-in replacement for other frameworks, so you must migrate all of your tests to the new syntax. However, its syntax is very straightforward and takes inspiration from the existing frameworks. This will make transitioning to the built-in test runner much easier.

### Getting Started
#### Installing Node v19.0.0
To get the latest version of Node, you can either install version `v19.0.0` from the Node.JS website [here](https://nodejs.org/en "Node JS Website"), or you can install `nvm`. NVM is a node version manager, allowing you to run multiple versions of Node on your computer. 
##### Installing NVM
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
To install Node `v19.0.0`
```bash
nvm install 19
node -v
```

To install a specific version use the `nvm install` command if you want to switch to a certain version of Node that you have previously installed 

#### Importing the Test Runner

The test runner module lives inside `node:test`, below is the basic syntax for importing it into your script.
```javascript
import test from 'node:test';
```

To run the tests, use the `--test` flag on Node and specify the folder where the tests are located at.
```bash
node --test src/*.mjs
```

### Syntax
Test is the main method that will be used to define the tests and it can be used synchronously or asynchronously. The examples below will be using the assert module which is also a built-in method. 
```javascript
import test from 'node:test';
import assert from 'node:assert/strict';

test('synchronous passing test', (t) => {
  // This test passes because it does not throw an exception.
  assert.equal(1, 1, "Sync Test Passed 1 == 1");
});


test('asynchronous passing test', async (t) => {
  // This test passes because the Promise returned by the async
  // function is not rejected.
  assert.equal(1, 1, "Async Test Passed 1 == 1");
});
```

To run this test, save the code above as a `mjs` file and run the following command.
```bash
node --test ./*.mjs
```

###### Output
```bash
✔ synchronous passing test (0.72425ms)
✔ asynchronous passing test (0.050875ms)
ℹ tests 2
ℹ suites 0
ℹ pass 2
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 54.186084
```

### Assert
Now that we have run a test, let's dive into how the assert method works. Assert is a method that enables a deeper level of comparison than the traditional `if` statements allow. Assert also throw `AssertionError's` notifying you of potential issues within your tests.

We won't go over every method of the assert module here but I feel it's important to go over a few so you can have some background knowledge for the rest of this tutorial. `deepEqual` enables deep comparison of objects and their nested values. Below is a comparison of two multi-dimensional arrays with one value changed to a string `'3'` this will throw an assertion error
```javascript
assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);
```
###### Outputs
```bash
AssertionError: Expected values to be strictly deep-equal:
  + actual - expected

    [
      [
        [
          1,
          2,
  +       3
  -       '3'
        ]

      4,
      5
    ]
```

To learn more about the other methods provided by `assert` check out the official documentation [here](https://nodejs.org/api/assert.html "Assert Documentation").

### Describe/It
Describe/It is an alternative syntax to the regular `test()` syntax. Describe defines the suite of tests and It defines the test inside.
###### Importing
```javascript
import { describe, it } from 'node:test';
```

###### Syntax
```javascript
describe('A thing', () => {
  it('should work', () => {
    assert.strictEqual(1, 1);
  });

  it('should be ok', () => {
    assert.strictEqual(2, 2);
  });

  describe('a nested thing', () => {
    it('should work', () => {
      assert.strictEqual(3, 3);
    });
  });
}); 
```

By declaring a suite of tests, the output when is organized into groups based on the nested level when defined. Below is what you should expect when running the code above.
```bash
▶ A thing
  ✔ should work (0.19025ms)
  ✔ should be ok (0.04475ms)
  ▶ a nested thing
    ✔ should work (0.106542ms)
  ▶ a nested thing (0.1605ms)

▶ A thing (1.167875ms)

ℹ tests 3
ℹ suites 2
ℹ pass 3
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 44.25425
```

Node test runner is an exciting new feature that will change how tests are made in nodejs. I find that the syntax is very easy to learn and I am excited to use this feature in new projects.