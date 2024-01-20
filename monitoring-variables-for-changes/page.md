# Monitoring Variables for Changes

All frameworks have this ability, but what if you wanted to do it in plain JavaScript? In this tutorial, we will explore how to track the state of your application and update the DOM on the fly.

In a project I am currently working on, I cannot use any frameworks due to the nature of the environment it will run in. So I went about making a traditionally built site however, I have been using Svelte so much recently I could barely stand having to keep the DOM synced with the data behind the scenes. So I attempted to create a mini framework that would help keep everything up to date. This isn't about the framework I made for myself, this is about creating reactivity in a traditional application without manually keeping track of the data.

I found the easiest way to implement this is to use a borrowing system. Where a function asks for a variable from the object the state is stored in and returns the updated value once complete. After the value is updated rerunning every function that uses the changed variable.

To give context for all the code we will be talking about, here is the shell of the constructor function. We will use this to contain the state of the document and the methods will be used to interact with the state.

```javascript
function State(v) {
  let context = {};
  let dependencies = {};
  let renders = {};
  this.f = async (render = () => {}) => {};
  this.define = (name, element) => {};
  this.listen = (name, event, handler) => {};
}
```

The `context` object will be used to store the state of the document, the `dependencies` object is used to track which render function uses which properties. The `renders` object will contain the code that is executed when there is a change. The functions `f`, `define` and `listen` are used to interact with the state.

The `f`function or the "function" function is used to define a chunk of code that renders or updates the state or the DOM. To use create a `f` function you need to break the code used to update the DOM into chunks that are related to each other. Below is an example of a to-do app.

```javascript
f(({ list, text, todos }) => {
  list.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = todos[i];
    list.appendChild(li);
  }
  text.value = "";
});
```

This function will execute when one of the deconstructed properties is updated. We can check which properties a function uses by using a getter in the main object. To keep things clean in the `context` object, I chose to create a new object and assign the values of the `context` object with a getter function attached.

```javascript
let require = {};
for (const key in context) {
  if (Object.hasOwnProperty.call(context, key)) {
    Object.defineProperty(require, key, {
      get() {
        if (dependencies[key] == undefined) {
          dependencies[key] = [];
        }
        if (dependencies[key].indexOf(name) == -1) {
          dependencies[key].push(name);
        }
        return context[key];
      },
    });
  }
}
```

Now we have a copy of the `context` object with getter functions assigned to every value. The getter function is called when a property from the object is read (in this case via deconstruction). In our function, it checks to see if the name of the rendering function is a dependency of the called property. The `dependencies` object will allow us to track which rendering functions use what properties of the `context` object.

The name of the rendering function is created when the function is first declared with the `f` method. Here is the code used.

```javascript
this.f = async (render = () => {}) => {
  let name = `f${Object.keys(renders).length}`;
  renders[name] = render;
  try {
    await run(render, name, context);
  } catch (error) {
    // This doesn't need to do anything
  }
};
```

The three things that happen here are the name is defined as the current index on the renders object prefixed with an `f`. The render function is stored in the `renders` object and the function is executed for the first time. You might wonder what the try/catch statement is for. When the code is executed for the first time more than likely all the data you want will not exist and the function will fail. This is fine only for the first run, we are trying to get the dependencies of each function so it doesn't matter if the function runs successfully or not.

I've talked a lot about getting properties from the `context` object but I haven't talked about setting the properties in the first place. This is done using the `define` function, the define function is the simplest method we have. It takes two arguments, a name, and a value, then defines them in the context.

```javascript
this.define = (name, element) => {
  context[name] = element;
};
```

For a to-do app, our HTML might look something like this, a `ul` that holds the to-do items. A text input to enter a new item to the list and a button that submits it.

```html
<h1>To-Do</h1>
<ul id="todo"></ul>
<input type="text" id="text" />
<button id="submit">Enter</button>
```

To register each element to the context we can use the `define` method like below.

```javascript
let { define, listen, f } = new IXO();

define("list", document.querySelector("#todo"));
define("text", document.querySelector("#text"));
define("submit", document.querySelector("#submit"));
```

This gives us the HTML elements in the context, but to keep the to-do's stored in memory we also need to create an array.

```javascript
define("todos", []);
```

Now we have all of the variables to make the first `f` function work. To detect user input we can use the `listen` method that we have not talked about yet. Here is the code behind it.

```javascript
this.listen = (name, event, handler) => {
  context[name].addEventListener(event, async () => {
    let ctx = context;
    ctx.parent = context[name];
    await run(handler, name, ctx, dependencies);
  });
};
```

After the initial rendering of the document events are the main thing that drives a need for rendering of the DOM. For the to-do app, the `listen` events are defined like this.

```javascript
listen("submit", "click", ({ text, todos }) => {
  todos.push(text.value);
  return { todos };
});
```

Once the submit button is clicked the callback function is called the value of the text input that was defined using the `define` method and is stored in the todo's array. This causes the `f` function to be re-run because the callback has updated the todo's array and the `f` function requires it.

The callback functions of both `listen` and `f` are executed by a single function called `run`. We've already covered some of it when talking about the getter functions but here it is fully.

```javascript
async function run(func, name, context) {
    let require = {};
    for (const key in context) {
        if (Object.hasOwnProperty.call(context, key)) {
            Object.defineProperty(require, key, {
                get() {
                    if (dependencies[key] == undefined) {
                        dependencies[key] = [];
                    }
                    if (dependencies[key].indexOf(name) == -1) {
                        dependencies[key].push(name);
                    }
                    return context[key];
                },
            });
        }
    }
 /* ... */
```

The first half of the function is dedicated to creating the getter functions from the context object. The context object is copied directly to the require object which is then passed into the callback.

```javascript
/* ... */
let data = func(require);
if (typeof data?.then === "function") {
  data = await data;
}
/* ... */
```

This is where the code is run, `func` is the callback function passed into the run function. The if statement checks whether the function is a promise, if it is we await the function to complete.

After we have the results of the function, we need to merge the returned data back into the `context` using Object.assign(). The function running will update the dependencies object so we need to rerun every function that has updated using the code below.

```javascript
 /* ... */
    Object.assign(context, data);
    for (const key in dependencies) {
        if (Object.hasOwnProperty.call(dependencies, key)) {
            for (let i = 0; i < dependencies[key].length; i++) {
                if (
                    renders[dependencies[key][i]] &&
                    dependencies[key][i] != name
                ) {
                    console.log(name, key, dependencies[key][i]);
                    renders[dependencies[key][i]](context);
                }
            }
        }
    }
}
```

While this project is by no means a stable working framework and will never be. I hope this helped shed some light on how variable change tracking can be implemented pretty simply. If you have any suggestions please leave them in the comments below. The full code for this tutorial can be found [here](https://gist.github.com/lakefox/a94be6d342f4a836301d7b172756aa7c).
