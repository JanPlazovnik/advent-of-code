input = File.read("./input/input.txt").split("\n")

depth = 0
horizontal_position = 0

for instruction in input do
    keyword = instruction.split(" ")[0]
    units = instruction.split(" ")[1].to_i

    case keyword
    when "forward"
        horizontal_position += units
    when "down"
        depth += units
    when "up"
        depth -= units
    else
        puts "Unknown instruction #{keyword}"
    end
end

puts "Depth: #{depth}"
puts "Horizontal Position: #{horizontal_position}"
puts "Multiplied: #{depth * horizontal_position}"