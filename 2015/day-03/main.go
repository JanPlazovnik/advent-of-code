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

func (c *Courier) up() {
	c.y++
}

func (c *Courier) down() {
	c.y--
}

func (c *Courier) right() {
	c.x++
}

func (c *Courier) left() {
	c.x--
}

func (c *Courier) key() int {
	return c.x*10000 + c.y
}

func main() {
	// part 1 = 2565, part 2 = 2639
	input, _ := ioutil.ReadFile("day-03/input.txt")

	fmt.Println(solve(string(input), 1))
	fmt.Println(solve(string(input), 2))
}

func solve(input string, part int) int {
	instructions := strings.Split(string(input), "")
	houses := map[int]bool{}

	santa := Courier{name: "Santa", x: 0, y: 0}
	robot := Courier{name: "Robo-Santa", x: 0, y: 0}

	// Set initial values
	unique, moves := 1, 0

	// Add the first house
	houses[santa.key()] = true

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
			who.up()
		case "v":
			who.down()
		case ">":
			who.right()
		case "<":
			who.left()
		}

		if !houses[who.key()] {
			houses[who.key()] = true
			unique++
		}

		moves++
	}

	return unique
}

func test() {
	fmt.Println("Part 1:")
	fmt.Println(">", solve(">", 1), solve(">", 1) == 2)
	fmt.Println("^>v<", solve("^>v<", 1), solve("^>v<", 1) == 4)
	fmt.Println("^v^v^v^v^v", solve("^v^v^v^v^v", 1), solve("^v^v^v^v^v", 1) == 2)

	fmt.Println("\nPart 2:")
	fmt.Println("^v", solve("^v", 2), solve("^v", 2) == 3)
	fmt.Println("^>v<", solve("^>v<", 2), solve("^>v<", 2) == 3)
	fmt.Println("^v^v^v^v^v", solve("^v^v^v^v^v", 2), solve("^v^v^v^v^v", 2) == 11)
}
