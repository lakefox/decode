# JS Chunk Array
Here's a simple function that uses generators to chunk an array. Generators are a type of function that returns an iterator and traverse it one at a time if you use the spread operator with a generator you get a very efficient function that is easy to work with.

### Code
```
function* chunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}
```
The function above takes two parameters: an array arr, and an integer n.

The function uses a for loop that starts at index 0 and increments by n for each iteration. For each iteration, the generator yields a new array that is a slice of the original array, starting at the current index i and ending at i + n.

In other words, the function chunks takes an array and splits it into chunks of size n. Each time the generator function is called, it will return the next chunk of the array.

Here is an example of the output:
```
let myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let chunkSize = 3;
let generator = chunks(myArray, chunkSize);

console.log(generator.next().value); // [1, 2, 3]
console.log(generator.next().value); // [4, 5, 6]
console.log(generator.next().value); // [7, 8, 9]
console.log(generator.next().value); // [10]
```
In this example, we have an array of 10 elements and we want to split it into chunks of size 3. The first call to generator.next().value will return the first chunk of 3 elements [1,2,3], the second call will return the next chunk [4,5,6], and so on. The last call will return the last chunk of size 1, [10].

This function is useful when working with large arrays, as it allows you to process and work with the array in smaller chunks, rather than loading the entire array into memory at once.

It also could be useful for pagination, where you would want to retrieve a certain number of elements from an array at a time.

Another example usage of this function is to use it in a spread operator like below:
```
let myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let chunkSize = 3;
let chunkedArray = [...chunks(myArray, chunkSize)];
console.log(chunkedArray); // [[1,2,3],[4,5,6],[7,8,9],[10]]
```