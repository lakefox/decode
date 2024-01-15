# JS Switches
The switch statement is a control structure used to perform multiple operations based on different cases, often as an alternative to if-else statements.

Here's the basic syntax:

## Syntax
```
switch (expression) {
  case value1:
    // code to be executed if expression matches value1
    break;
  case value2:
    // code to be executed if expression matches value2
    break;
  ...
  default:
    // code to be executed if expression doesn't match any cases
}
```
* `expression` is the value that is being tested against each case.
* `value1`, `value2`, ... are the possible values for the expression.
* `break` is used to exit the switch statement and prevent execution from continuing to the next case.
* `default` is an optional case that will be executed if none of the other cases match the expression.

### Example 1:

```
let day = "Monday";
switch (day) {
  case "Monday":
    console.log("Today is Monday.");
    break;
  case "Tuesday":
    console.log("Today is Tuesday.");
    break;
  case "Wednesday":
    console.log("Today is Wednesday.");
    break;
  default:
    console.log("Today is some other day.");
}
// Output: Today is Monday.
```

### Example 2:

```
let grade = "A";
switch (grade) {
  case "A":
    console.log("Excellent!");
    break;
  case "B":
    console.log("Good.");
    break;
  case "C":
    console.log("OK.");
    break;
  case "D":
    console.log("You need to work harder.");
    break;
  case "F":
    console.log("Fail.");
    break;
  default:
    console.log("Invalid grade.");
}
// Output: Excellent!
```

Note that switch statements are commonly used for testing simple equality between the expression and the cases, but it is also possible to use other types of comparison (e.g. greater than, less than) and logical operators inside the cases.