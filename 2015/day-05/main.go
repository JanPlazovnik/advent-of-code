package main

import (
	"fmt"
	"io/ioutil"
	"regexp"
	"strings"
)

func main() {
	input, _ := ioutil.ReadFile("day-05/input.txt")
	fmt.Println(partOne(string(input)))
	fmt.Println(partTwo(string(input)))
}

func partOne(input string) int {
	instructions := strings.Split(string(input), "\n")

	vowels := regexp.MustCompile(`[aeiou]`)
	bad := regexp.MustCompile(`ab|cd|pq|xy`)

	niceCount := 0
	for _, instruction := range instructions {
		nice := true

		if len(vowels.FindAllString(instruction, -1)) < 3 {
			nice = false
		}

		// Can't use a backreference in regexp, so I'll just do it manually instead :(
		for i := 0; i < len(instruction)-1; i++ {
			if instruction[i] == instruction[i+1] {
				break
			}
			if i == len(instruction)-2 {
				nice = false
			}
		}

		if bad.MatchString(instruction) {
			nice = false
		}

		if nice {
			niceCount++
		}
	}

	return niceCount
}

func partTwo(input string) int {
	instructions := strings.Split(string(input), "\n")
	niceCount := 0

	for _, instruction := range instructions {
		nice := true

		for i := 0; i < len(instruction)-1; i++ {
			pair := instruction[i : i+2]
			if strings.Count(instruction, pair) > 1 {
				break
			}
			if i == len(instruction)-2 {
				nice = false
			}
		}

		for i := 0; i < len(instruction)-2; i++ {
			if instruction[i] == instruction[i+2] {
				break
			}
			if i == len(instruction)-3 {
				nice = false
			}
		}

		if nice {
			niceCount++
		}
	}

	return niceCount
}
