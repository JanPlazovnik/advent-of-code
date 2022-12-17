package main

import (
	"fmt"
	"io/ioutil"
	"strings"
)

type Courier struct {
	x, y int
	name string
}

func (c *Courier) Up() {
	c.y++
}

func (c *Courier) Down() {
	c.y--
}

func (c *Courier) Right() {
	c.x++
}

func (c *Courier) Left() {
	c.x--
}

func (c *Courier) Key() int {
	return c.x*10000 + c.y
}

func main() {
	// part 1 = 2565, part 2 = 2639
	input, _ := ioutil.ReadFile("day-03/input.txt")

	fmt.Println(Solve(string(input), 1))
	fmt.Println(Solve(string(input), 2))
}

func KeyExists(houses map[int]bool, key int) bool {
	_, exists := houses[key]
	return exists
}

func Solve(input string, part int) int {
	instructions := strings.Split(string(input), "")
	houses := map[int]bool{}

	santa := Courier{name: "Santa", x: 0, y: 0}
	robot := Courier{name: "Robo-Santa", x: 0, y: 0}

	// Set initial values
	unique, moves := 1, 0

	// Add the first house
	houses[santa.Key()] = true

	for _, instruction := range instructions {
		var who *Courier
		if part == 2 && moves%2 == 1 {
			who = &robot
		} else {
			who = &santa
		}

		// Move the couriers
		switch instruction {
		case "^":
			who.Up()
		case "v":
			who.Down()
		case ">":
			who.Right()
		case "<":
			who.Left()
		}

		if !KeyExists(houses, who.Key()) {
			houses[who.Key()] = true
			unique++
		}

		moves++
	}

	return unique
}

func Test() {
	fmt.Println("Part 1:")
	fmt.Println(">", Solve(">", 1), Solve(">", 1) == 2)
	fmt.Println("^>v<", Solve("^>v<", 1), Solve("^>v<", 1) == 4)
	fmt.Println("^v^v^v^v^v", Solve("^v^v^v^v^v", 1), Solve("^v^v^v^v^v", 1) == 2)

	fmt.Println("\nPart 2:")
	fmt.Println("^v", Solve("^v", 2), Solve("^v", 2) == 3)
	fmt.Println("^>v<", Solve("^>v<", 2), Solve("^>v<", 2) == 3)
	fmt.Println("^v^v^v^v^v", Solve("^v^v^v^v^v", 2), Solve("^v^v^v^v^v", 2) == 11)
}
