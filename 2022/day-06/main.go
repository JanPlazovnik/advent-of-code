package main

import (
	"fmt"
	"io/ioutil"
)

func main() {
	input, err := ioutil.ReadFile("./input/input.txt")
	if err != nil {
		fmt.Println("Error reading file")
		return
	}

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
		sub := input[i : i+length]
		set := getSet(sub)

		if len(set) == len(sub) {
			return i + length
		}
	}

	return -1
}
