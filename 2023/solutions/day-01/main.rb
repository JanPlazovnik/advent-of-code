require_relative '../base'

class DayOne < BaseSolution
  def initialize(input_file)
    super(input_file)

    @input_data = @input_data.split("\n")
  end

  def part_one
    # Day One - Part One logic here
    # Access input using @input_data
    puts "Day 01 - Part One Solution"
    puts @input_data
  end

  def part_two
    # Day One - Part Two logic here
    # Access input using @input_data
    puts "Day 01 - Part Two Solution"
    puts @input_data.reverse
  end
end
