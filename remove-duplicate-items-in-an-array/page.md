# Remove Duplicate Items in an Array
Eliminating duplicate items from an array can be challenging, but this simple one-liner makes it easy to do so in any situation.

The `Set` object in JavaScript is a collection of unique values. It can be used to store and manipulate a collection of primitive values (such as strings or numbers) or object references. We can use this to remove all repeat values from an array by initializing the `Set` object with an array as an argument. This will create a `Set` object, the next step to convert it back to an array is to use the spread operator to spread the object into an array

#### Example
```
let array1 = [1,1,2,2,3,3,4,4];
let array2 = [...new Set(array1)];
```