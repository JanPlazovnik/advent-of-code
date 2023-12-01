require_relative '../base'

class DayOne < BaseSolution
  def initialize(input_file)
    super(input_file)

    @input_data = @input_data.split("\n")
  end

  def part_one
    puts "Day 01 - Part One Solution"

    sum = @input_data.sum do |line|
      parts = line.scan(/(\d)/).flatten()
      (parts[0] + parts[-1]).to_i
    end

    puts "Sum: #{sum}"
  end

  def part_two
    puts "Day 01 - Part Two Solution"

    digits = %w(one two three four five six seven eight nine)

    sum = @input_data.sum do |line|
      digits.each_with_index do |digit, i|
        first, *middle, last = digit.chars
        line.gsub!(digit, "#{first}#{i + 1}#{last}")
      end

      parts = line.scan(/\d/)

      (parts[0] + parts[-1]).to_i
    end

    puts "Sum: #{sum}"
  end
end
