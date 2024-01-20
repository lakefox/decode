# Svelte Stores

Svelte stores are an important feature of the Svelte framework that enables the sharing of state between components. In this tutorial, we will learn how to use Svelte stores.

Before we begin, let's define what a store is in Svelte. A store is an object that holds a piece of reactive state. When the state in the store changes, any component that has subscribed to the store will be automatically updated.

There are two types of stores in Svelte: `writable` and `readable` stores. A writable store allows you to update the value of the store, while a readable store only allows you to read the value of the store.

Now, let's dive into the steps for using Svelte stores:

## Import the stores module

The first step is to import the stores module from Svelte.

```javascript
import { writable, readable } from "svelte/store";
```

## Create a writable store

To create a writable store, call the writable function and pass in the initial value of the store. Here is an example of creating a writable store with an initial value of 0:

```javascript
const count = writable(0);
```

## Update the writable store

To update the value of the writable store, call the set method on the store and pass in the new value. Here is an example of updating the count store:

```javascript
count.set(1);
```

To receive updates when the value of the writable store changes, you can subscribe to the store by calling the subscribe method and passing in a function that will be called with the new value of the store whenever it changes. Here is an example of subscribing to the count store:

```javascript
count.subscribe((value) => {
  console.log(value);
});
```

## Create a readable store

To create a readable store, call the readable function and pass in an object with a subscribe method. Here is an example of creating a readable store:

```javascript
const theme = readable({
  primary: "blue",
  secondary: "green",
});
```

## Subscribe to the readable store

To receive updates when the value of the readable store changes, you can subscribe to the store by calling the subscribe method and passing in a function that will be called with the current value of the store. Here is an example of subscribing to the theme store:

```javascript
theme.subscribe((value) => {
  console.log(value.primary);
});
```

And that's it! You now know how to use writable and readable Svelte stores. Use these stores to share state between components in your Svelte applications.
