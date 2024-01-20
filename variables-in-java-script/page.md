# Variables in JavaScript

Today we will go over the most fundamental operator in programming, the variable. A variable is a keyword used to represent a piece of data in memory.

@[showquiz:checkbox]{false}(role="switch") Enable knowledge checks?

Using variables in JavaScript is easy as there is no need for types. Types are an identifier the programmer sets that tell the computer how to set/get the variable's data. Types can help protect your code from unintentionally doing things you don't want. If you would like to use types in JavaScript you can install TypeScript.

Variables are used as a container to store data the basic syntax is shown below:

```>javascript
var hello = "world"
console.log("Hello " + hello);
```

The `var` keyword tells the computer to store the string `"world"` in a variable named `hello`. There are four ways in total to assign a variable, all of which have different features.

- `var`
- `let`
- `const`
- none

?{@{showquiz}}
Before we get into how each variable type differs from each other let's do a quick knowledge check.

    <article>

    ##### What is a variable?
    @[#ans:radio]{false} A value that can change
    @[#ans:radio]{false} A expression that can be executed
    @[#ans:radio]{false} A mathematical symbol used to represent a quantity
    @[#ans:radio]{false} A container for storing data
    </article>

> [quiz1]{!@{ans}[0] && !@{ans}[1] && !@{ans}[2] && @{ans}[3]};

?{@{quiz1} && @{showquiz}}
<article>
Correct! Variables can be used as a container to store data.
</article>

?{@{quiz1} || !@{showquiz}}

    ### What's the difference between `var`, `let`, and `const`?
    Let's start off easy with `const`, `const` lets you define a variable that contains a set chunk of data that cannot be set to anything else. This is the only variable assigner that will not let you change the data stored in it.
    > NOTE: While you cannot change the value assigned to the `const` variable, if you assign an object of an array to it, you are able to change the data inside the object.

    `let` and `var` both store data and that data can be changed to anything you want, including a different type of data. The difference between the two is with scope. The scope of the variable is where in a program the data the variable contains can be accessed. A global variable defined by not using `const`, `let`, or `var` can be accessed anywhere in the program. This might sound like it is a good thing however, this can cause memory issues.

    Looking at the code below and its output, you can see when using `var` the data stored in `j` can be accessed outside of the for loop it was declared in. In the next example, the function only outputs the value of `i` when inside the loop. This is because the scope of `i` is defined inside of the for loop.

    ```>javascript
    "use strict";
    console.log("var:");
    for (var j = 0; j < 2; j++) {
      console.log(j);
    }

    console.log(j);

    console.log("let:");
    for (let i = 0; i < 2; i++) {
      console.log(i);
    }
    console.log(i);
    ```

?{@{showquiz} && @{quiz1}}
Let's see what you learned about scope:
<article> ##### What is the scope?
@[#ans2:radio]{false} The part of the program where a variable is accessible
@[#ans2:radio]{false} The range of values that a variable can take
@[#ans2:radio]{false} The lifespan of a variable
@[#ans2:radio]{false} The amount of memory allocated to a variable
</article>

> [quiz2]{@{ans2}[0] && !@{ans2}[1] && !@{ans2}[2] && !@{ans2}[3]};

?{@{quiz2} && @{quiz1} && @{showquiz}}
<article>
Correct! The scope is the part of the program where a variable is accessible.
</article>

?{@{quiz2} && @{quiz1} || !@{showquiz}}
Learning what variables do and how the scope of variables operate is fundamental to know how your code runs and being about to effectively debug your code. If you liked this interactive lesson please let us know! There will be many more to come.
