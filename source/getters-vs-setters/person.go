package main

// import (
// 	"testing"
// )

import "fmt"

type Person struct {
	age  int
	name string
}

// Simple Getters/Setters
func (p *Person) GetAge() int {
	return p.age
}

func (p *Person) SetAge(age int) {
	p.age = age
}

// Getter and Setter with String Property Name
func (p *Person) Get(property string) interface{} {
	var data interface{}
	switch property {
		case "age":
			data = p.age
	}
	return data
}

func (p *Person) Set(property string, value interface{}) {
	switch property {
		case "age":
			p.age = value.(int)
	}
}

// Universal Getter/Setter
func (p *Person) Age(age ...int) int {
	if len(age) != 0 {
		p.age = age[0]
	}
	return p.age
}

func main() {
	p := Person{age: 30, name: "David"}

	p.Age(50)

	fmt.Println(p.Age())
}

// const numIterations = 1000000
//
// func BenchmarkSimpleGetSet(b *testing.B) {
// 	p := Person{age: 30, name: "Alice"}
// 	for i := 0; i < b.N; i++ {
// 		p.SetAge(i % 100)
// 		_ = p.GetAge()
// 	}
// }
//
// func BenchmarkStringGetSet(b *testing.B) {
// 	p := Person{age: 30, name: "Bob"}
// 	for i := 0; i < b.N; i++ {
// 		p.Set("age", i%100)
// 		_ = p.Get("age").(int)
// 	}
// }
//
// func BenchmarkUniversalGetSet(b *testing.B) {
// 	p := Person{age: 30, name: "Charlie"}
// 	for i := 0; i < b.N; i++ {
// 		p.Age(i % 100)
// 		_ = p.Age()
// 	}
// }
//
// func BenchmarkDirectAccess(b *testing.B) {
// 	p := Person{age: 30, name: "David"}
// 	for i := 0; i < b.N; i++ {
// 		p.age = i % 100
// 		_ = p.age
// 	}
// }
