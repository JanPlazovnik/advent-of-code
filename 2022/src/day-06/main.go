package main

import (
	"fmt"
	"io/ioutil"
	"os"
)

func main() {
	wd, _ := os.Getwd()
	input, _ := ioutil.ReadFile(wd + "/src/day-06/input/input.txt")

	fmt.Println(getMarkerLocation(string(input), 4))
	fmt.Println(getMarkerLocation(string(input), 14))
}

// Go apparently doesn't have a set data structure, so this is the way
func getSet(input string) map[rune]bool {
	set := make(map[rune]bool)
	for _, char := range input {
		set[char] = true
	}

	return set
}

// Get the marker location
func getMarkerLocation(input string, length int) int {
	for i := 0; i < len(input); i++ {
		set := getSet(input[i : i+length])

		if len(set) == length {
			return i + length
		}
	}

	return -1
}
