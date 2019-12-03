package main

import (
	"fmt"
	"math"
)

func calc(mass int, recursive bool) int {
	rounded := int(math.Round(float64(mass/3)) - 2)

	if rounded <= 0 {
		return 0
	}

	if recursive {
		return rounded + calc(rounded, true)
	}

	return rounded
}

func part1(input []int) int {
	acc := 0
	for _, val := range input {
		acc += calc(val, false)
	}

	return acc
}

func part2(input []int) int {
	acc := 0
	for _, val := range input {
		acc += calc(val, true)
	}

	return acc
}

func main() {
	input := []int{143366, 140649, 64402, 118831, 76720, 105690, 68872, 148364, 111123, 140366, 105116, 106380, 99652, 130407, 68301, 112756, 142857, 112879, 52610, 106354, 66057, 91038, 120227, 140647, 92586, 51719, 72209, 89889, 114041, 107964, 71319, 53380, 71847, 69679, 117732, 73292, 91021, 72955, 105172, 50072, 102110, 138680, 131054, 135512, 63784, 148675, 113290, 58014, 52405, 115305, 87654, 127350, 119585, 122089, 52428, 131275, 70782, 148645, 66124, 66831, 81547, 85435, 134481, 102166, 120218, 140673, 84889, 86363, 71518, 143509, 80705, 75446, 72286, 130977, 80386, 121639, 54013, 149257, 73345, 143555, 95205, 107501, 97520, 109658, 85991, 50993, 54642, 92644, 96798, 102846, 125411, 93821, 78950, 94047, 55698, 63822, 147460, 121708, 139290, 117748}

	fmt.Println("Fuel needed: ", part1(input))
	fmt.Println("Fuel needed (recursive)", part2(input))
}
