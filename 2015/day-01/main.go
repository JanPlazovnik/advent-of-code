package main

import (
	"fmt"
	"io/ioutil"
	"strings"
)

func main() {
	input, _ := ioutil.ReadFile("day-01/input.txt")
	inputArray := strings.Split(string(input), "")

	floor, basement := 0, 0
	for i, value := range inputArray {
		if value == "(" {
			floor++
		} else {
			floor--
		}

		if floor == -1 && basement == 0 {
			basement = i + 1
		}
	}

	fmt.Println(floor)
	fmt.Println(basement)
}
