# Ternary Operators in JS
A ternary operator is a type of conditional operator that allows for inline if statements. The ternary operator is suer useful once you know how to use it and can reduce the amount of logic in an application and are often used when you need to assign a value to a variable based on a condition.

The basic syntax of a ternary operator is as follows:

```javascript
condition ? expressionIfTrue : expressionIfFalse
```

The condition is evaluated first. If it's true, the `expressionIfTrue` is executed and its result is returned. If it's false, the `expressionIfFalse` is executed and its result is returned.

First, you need to identify the condition that you want to evaluate. This can be any expression that evaluates to a boolean value (true or false).

For example, you might want to check if a variable is equal to a certain value:

```javascript
const x = 5;
const condition = x === 5;
```

Step 2: Write the ternary operator
Next, you can write the ternary operator using the condition you identified in step 1.

```javascript
const result = condition ? 'Yes' : 'No';
```

In this example, if the condition is true, the string 'Yes' is returned. If it's false, the string 'No' is returned.

Step 3: Use the result
Finally, you can use the result of the ternary operator wherever you need it in your code. For example:

```javascript
console.log(result); // Output: 'Yes'
```

Here's a more complex example that demonstrates how you can use ternary operators to build more complex expressions:

```javascript
const age = 25;
const isAdult = age >= 18 ? true : false;
const message = isAdult ? 'You are an adult' : 'You are not an adult';
console.log(message); // Output: 'You are an adult'
```

In this example, the condition `age >= 18` is evaluated first. If it's true, the `isAdult` variable is assigned the value true. If it's false, `isAdult` is assigned the value false.

Next, the ternary operator is used to determine the value of the message variable. If `isAdult` is true, the message `'You are an adult'` is returned. If it's false, the message `'You are not an adult'` is returned.