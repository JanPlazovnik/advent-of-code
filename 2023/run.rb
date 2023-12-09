# Day number
day = ARGV[0].to_i

# Demo input mode
test_mode = ARGV[1] == "--demo"

# Get input file path
def get_input_path(day, test_mode)
  "solutions/day-#{day.to_s.rjust(2, "0")}/input/" + (test_mode ? "demo.txt" : "input.txt")
end

begin
  case day
  when 1
    require_relative 'solutions/day-01/main'
    day_one = DayOne.new(get_input_path(day, test_mode))
    day_one.part_one
    day_one.part_two
  when 2
    require_relative 'solutions/day-02/main'
    day_two = DayTwo.new(get_input_path(day, test_mode))
    day_two.part_one
    day_two.part_two
  when 4
    require_relative 'solutions/day-04/main'
    day_four = DayFour.new(get_input_path(day, test_mode))
    day_four.part_one
    day_four.part_two
  else
    puts "Day #{day} solution not found"
  end
rescue => exception
  puts exception
end
