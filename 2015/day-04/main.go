package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"strings"
	"time"
)

func main() {
	secret := "yzbqklnj"

	fmt.Println(solve(secret, "00000"))  // 282749
	fmt.Println(solve(secret, "000000")) // 9962624
}

func solve(secret string, prefix string) int {
	defer timeTrack(time.Now(), prefix)
	number := 0

	for {
		input := secret + fmt.Sprint(number)
		if hash := getMD5Hash(input); strings.HasPrefix(hash, prefix) {
			return number
		}
		number++
	}
}

func timeTrack(start time.Time, name string) {
	elapsed := time.Since(start)
	fmt.Println("Time taken for", name, ":", elapsed)
}

func getMD5Hash(text string) string {
	hash := md5.Sum([]byte(text))
	return hex.EncodeToString(hash[:])
}
