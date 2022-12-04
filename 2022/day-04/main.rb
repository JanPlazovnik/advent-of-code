# Read the file
input = File.read("./input/input.txt").split("\n")

# Parse the input
input = input.map do |line|
  line.split(",")
end

# Get number array from range
def get_numbers(range)
  range = range.split("-").map(&:to_i)
  return (range[0]..range[1]).to_a
end

# Set the counters
containsCount = 0
overlapCount = 0

# Iterate over all the pairs and check if they are overlapping
for pair in input
  left = get_numbers(pair[0])
  right = get_numbers(pair[1])

  # Check if the ranges are fully included in one another
  if (left.all? { |num| right.include?(num) } || right.all? { |num| left.include?(num) })
    containsCount += 1
  end

  # Check if the ranges are overlapping
  if ((left & right).length > 0)
    overlapCount += 1
  end
end

puts "Contains: #{containsCount}"
puts "Overlap: #{overlapCount}"
