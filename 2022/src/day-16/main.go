package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"regexp"
	"strconv"
	"strings"
)

type Valve struct {
	name    string
	flow    int
	tunnels []string
	closed  bool
}

func main() {
	wd, _ := os.Getwd()
	input, _ := ioutil.ReadFile(wd + "/src/day-16/input/input.txt")

	fmt.Println(parseInput(string(input)))

	// Aand, that's it. I can't be bothered to do the rest.
	// Started struggling at around day 12 and finnally decided to call it on day 15.
	// Thought I'd try day 16 but eh, this ain't it.
}

func parseInput(input string) map[string]Valve {
	valves := map[string]Valve{}
	lines := strings.Split(input, "\n")
	regex := regexp.MustCompile(`([A-Z]{2}).+=(\d+).+valves? (.+)`)

	for _, line := range lines {
		matches := regex.FindStringSubmatch(line)

		flow, _ := strconv.Atoi(matches[2])
		tunnels := strings.Split(matches[3], ", ")

		valve := Valve{
			name:    matches[1],
			flow:    flow,
			tunnels: tunnels,
			closed:  true,
		}

		valves[matches[1]] = valve
	}

	return valves
}
