package main

import (
	"fmt"
	"io/ioutil"
	"regexp"
	"strconv"
	"strings"
	"time"
)

type Coordinate struct {
	x, y int
}

type Instruction struct {
	from, to Coordinate
	action   string
}

func main() {
	input, _ := ioutil.ReadFile("day-06/input.txt")

	fmt.Println(solve(string(input)))
}

func solve(input string) (int, int) {
	defer timeTrack(time.Now())
	instructions := parseInput(input)

	grid := map[int]bool{}
	brightness := map[int]int{}

	for _, instruction := range instructions {
		for x := instruction.from.x; x <= instruction.to.x; x++ {
			for y := instruction.from.y; y <= instruction.to.y; y++ {
				key := x*10000 + y
				if _, ok := brightness[key]; !ok {
					brightness[key] = 0
				}

				switch instruction.action {
				case "on":
					brightness[key]++
					grid[key] = true
				case "off":
					if brightness[key] > 0 {
						brightness[key]--
					}
					delete(grid, key)
				case "toggle":
					brightness[key] += 2
					if _, ok := grid[key]; ok {
						delete(grid, key)
					} else {
						grid[key] = true
					}
				}
			}
		}
	}

	brightnessSum := 0
	for _, value := range brightness {
		brightnessSum += value
	}

	return len(grid), brightnessSum
}

func parseInput(input string) []Instruction {
	lines := strings.Split(string(input), "\n")
	regex := regexp.MustCompile(`(\w+|toggle) (\d+),(\d+) through (\d+),(\d+)`)

	instructions := []Instruction{}

	for _, instruction := range lines {
		matches := regex.FindStringSubmatch(instruction)

		if len(matches) == 0 {
			continue
		}

		fromX, _ := strconv.Atoi(matches[2])
		fromY, _ := strconv.Atoi(matches[3])
		toX, _ := strconv.Atoi(matches[4])
		toY, _ := strconv.Atoi(matches[5])

		from := Coordinate{x: fromX, y: fromY}
		to := Coordinate{x: toX, y: toY}

		instructions = append(instructions, Instruction{from: from, to: to, action: matches[1]})
	}
	return instructions
}

func timeTrack(start time.Time) {
	elapsed := time.Since(start)
	fmt.Println("Time taken :", elapsed)
}
