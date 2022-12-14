package main

// This is the same implementation as the TS one in the same directory, so go there for comments and well, the main AOC entry solution
// I just ported it to Go because I was curious how it would perform and look like with Go's syntax
// I'm not a Go expert, so I'm sure there are better ways to do this, but it works just as well as the TS version
// I've done day 6 in Go as well, and as it turns out, I definitely like it. Maybe not as much as TS, but it's definitely a nice language to work with
// Also I don't think this is a great implementation in the first place, looks a bit drawn out and I believe there's a much cleaner way to solve it, but this is mine and it works

import (
	"fmt"
	"io/ioutil"
	"math"
	"os"
	"strconv"
	"strings"
)

func main() {
	wd, _ := os.Getwd()
	input, _ := ioutil.ReadFile(wd + "/src/day-14/input/input.txt")

	fmt.Println(solve(string(input), 1))
	fmt.Println(solve(string(input), 2))
}

func splitLocation(location string) (int, int) {
	coords := strings.Split(location, ",")
	x, _ := strconv.Atoi(coords[0])
	y, _ := strconv.Atoi(coords[1])

	return x, y
}

func hash(x, y int) int {
	return x*10000 + y
}

func parseInput(input string) (int, map[int]bool) {
	rocks := strings.Split(input, "\n")
	rockPixels := make(map[int]bool)

	maxY := 0

	for _, rock := range rocks {
		path := strings.Split(rock, " -> ")
		for i := 0; i < len(path)-1; i++ {
			x1, y1 := splitLocation(path[i])
			x2, y2 := splitLocation(path[i+1])

			if y1 > maxY {
				maxY = y1
			}
			if y2 > maxY {
				maxY = y2
			}

			if x1 == x2 {
				yStart := math.Min(float64(y1), float64(y2))
				yEnd := math.Max(float64(y1), float64(y2))
				for y := yStart; y <= yEnd; y++ {
					rockPixels[hash(int(x1), int(y))] = true
				}
			} else {
				xStart := math.Min(float64(x1), float64(x2))
				xEnd := math.Max(float64(x1), float64(x2))
				for x := xStart; x <= xEnd; x++ {
					rockPixels[hash(int(x), int(y1))] = true
				}
			}
		}
	}

	return maxY, rockPixels
}

func solve(input string, part int) int {
	maxY, rockLocations := parseInput(string(input))
	sandLocations := make(map[int]bool)
	simulating := true

	for simulating {
		particle := [2]int{500, 0}
		falling := true

		for falling {
			x := particle[0]
			y := particle[1]

			if part == 1 && (y > maxY) {
				simulating = false
				falling = false
				continue
			}

			down := !rockLocations[hash(x, y+1)] && !sandLocations[hash(x, y+1)]
			left := !rockLocations[hash(x-1, y+1)] && !sandLocations[hash(x-1, y+1)]
			right := !rockLocations[hash(x+1, y+1)] && !sandLocations[hash(x+1, y+1)]

			if (part == 1 && down) || (part == 2 && down && y <= maxY) {
				particle[1]++
				continue
			}

			if (part == 1 && left) || (part == 2 && left && y <= maxY) {
				particle[0]--
				particle[1]++
				continue
			}

			if (part == 1 && right) || (part == 2 && right && y <= maxY) {
				particle[0]++
				particle[1]++
				continue
			}

			sandLocations[hash(x, y)] = true
			falling = false
		}

		if part == 2 && particle[0] == 500 && particle[1] == 0 {
			simulating = false
		}
	}

	return len(sandLocations)
}
