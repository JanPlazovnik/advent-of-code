require_relative '../base'

class ScratchCard
  def initialize(winning_numbers, used_numbers)
    @winning_numbers = winning_numbers
    @used_numbers = used_numbers
  end

  def winning_numbers
      @winning_numbers
  end

  def used_numbers
      @used_numbers
  end

  def get_matches
    @winning_numbers.count do |number|
      @used_numbers.include?(number)
    end
  end
end

class DayFour < BaseSolution
  def initialize(input_file)
    super(input_file)

    @input_data = @input_data.split("\n")
    @cards = @input_data.map { |card| parse_card(card) }
  end

  def part_one
    puts "Day 04 - Part One Solution"

    sum = @cards.map(&:get_matches).sum do |count|
      count.zero? ? 0 : 2 ** (count - 1)
    end

    puts "Sum: #{sum}"
  end

  def part_two
    puts "Day 04 - Part Two Solution"
    puts "I don't want to bother with this one."
  end
end

private
def parse_card(card)
  _, numbers = card.split(": ")
  winning, mine = numbers.split(" | ").map(&:strip)

  winning_numbers = winning.split(" ").map(&:to_i)
  used_numbers = mine.split(" ").map(&:to_i)

  ScratchCard.new(winning_numbers, used_numbers)
end
