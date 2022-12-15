package main

import (
	"fmt"
	"io/ioutil"
	"math"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"
)

type Beacon struct {
	x int
	y int
}

type Sensor struct {
	x    int
	y    int
	dist int
}

func main() {
	wd, _ := os.Getwd()
	input, _ := ioutil.ReadFile(wd + "/src/day-15/input/input.txt")

	start := time.Now()
	fmt.Println(partOne(string(input), 2000000))
	elapsed := time.Since(start)
	fmt.Printf("Part 1 took %s", elapsed)
}

func hasBeacon(s []Beacon, e Beacon) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}

func getDistance(x1, y1, x2, y2 int) int {
	return int(math.Abs(float64(x1)-float64(x2)) + math.Abs(float64(y1)-float64(y2)))
}

func parseInput(input string) ([]Sensor, []Beacon) {
	lines := strings.Split(input, "\n")
	sensors := []Sensor{}
	beacons := []Beacon{}
	re := regexp.MustCompile(`Sensor at x=(-*\d+), y=(-*\d+): closest beacon is at x=(-*\d+), y=(-*\d+)`)

	for _, line := range lines {
		matches := re.FindStringSubmatch(line)

		if len(matches) == 0 {
			continue
		}

		sensorX, _ := strconv.Atoi(matches[1])
		sensorY, _ := strconv.Atoi(matches[2])
		beaconX, _ := strconv.Atoi(matches[3])
		beaconY, _ := strconv.Atoi(matches[4])

		sensor := Sensor{
			x:    sensorX,
			y:    sensorY,
			dist: getDistance(sensorX, sensorY, beaconX, beaconY),
		}

		beacon := Beacon{
			x: beaconX,
			y: beaconY,
		}

		sensors = append(sensors, sensor)

		if !hasBeacon(beacons, beacon) {
			beacons = append(beacons, beacon)
		}
	}

	return sensors, beacons
}

func partOne(input string, row int) int {
	sensors, beacons := parseInput(input)

	ranges := [][]int{}
	for _, sensor := range sensors {
		dist := sensor.dist - int(math.Abs(float64(row)-float64(sensor.y)))

		if dist > 0 {
			ranges = append(ranges, []int{sensor.x - dist, sensor.x + dist})
		}
	}

	minY := 0
	maxY := 0
	for i, range_ := range ranges {
		if i == 0 {
			minY = range_[0]
			maxY = range_[1]
		} else {
			if range_[0] < minY {
				minY = range_[0]
			}
			if range_[1] > maxY {
				maxY = range_[1]
			}
		}
	}

	available_beacons := []Beacon{}
	for _, beacon := range beacons {
		if beacon.y == row {
			available_beacons = append(available_beacons, beacon)
		}
	}

	range_ := int(math.Abs(float64(maxY)-float64(minY))) + 1 // because 0
	return range_ - len(available_beacons)
}
