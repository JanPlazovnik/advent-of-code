package main

import (
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	input, _ := ioutil.ReadFile("day-02/input.txt")
	inputArray := strings.Split(string(input), "\n")

	paper, ribbon := 0, 0
	for _, box := range inputArray {
		parts := strings.Split(box, "x")
		length, _ := strconv.Atoi(parts[0])
		width, _ := strconv.Atoi(parts[1])
		height, _ := strconv.Atoi(parts[2])

		// part 1
		surface := 2*length*width + 2*width*height + 2*height*length

		smallestSide := length * width
		if width*height < smallestSide {
			smallestSide = width * height
		}
		if height*length < smallestSide {
			smallestSide = height * length
		}

		paper += surface + smallestSide

		// part 2
		volume := length * width * height

		shortestPerimeter := 2*length + 2*width
		if 2*width+2*height < shortestPerimeter {
			shortestPerimeter = 2*width + 2*height
		}
		if 2*height+2*length < shortestPerimeter {
			shortestPerimeter = 2*height + 2*length
		}

		ribbon += volume + shortestPerimeter
	}

	// 499964 wrong
	// ^ of course it is, was using CRLF instead of LF for line endings :)
	println(paper, ribbon)
}
