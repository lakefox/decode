# Understanding Classes in JavaScript
Classes are blueprints for creating objects (a type of data structure), providing initial values for state (using a constructor), and implementations of behavior (member functions or methods). They support inheritance and polymorphism, which are fundamental concepts in object-oriented programming.

JavaScript classes were introduced in ECMAScript 2015 (ES6) and are a way to define a constructor function and a set of methods all at once. The class syntax is a shorthand for defining constructor functions and their prototypes.

Example:
```
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    console.log(`Hello, my name is ` + this.name);
  }
}

let person1 = new Person("John");
person1.sayHello(); // Output: "Hello, my name is John"
```

Here, "Person" is a class, person1 is an object created from the class, and sayHello() is a method of the class.