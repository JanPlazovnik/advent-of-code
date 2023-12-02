require_relative '../base'

class Game
    def initialize(id, sets)
        @id = id
        @sets = sets
    end

    def id
        @id
    end

    def sets
        @sets
    end
end

class DayTwo < BaseSolution
  def initialize(input_file)
    super(input_file)

    @input_data = @input_data.split("\n")
    @input_data = parse_games
  end

  def part_one
    puts "Day 02 - Part One Solution"

    max_counts = {
      "red" => 12,
      "green" => 13,
      "blue" => 14
    }

    possible_games = @input_data.select do |game|
        game.sets.all? do |set|
            set.all? { |color, count| max_counts[color] >= count }
        end
    end

    sum = possible_games.sum { |game| game.id.to_i }

    puts "Sum of possible games: #{sum}"
  end

  def part_two
    puts "Day 02 - Part Two Solution"

    max_counts_per_game = @input_data.map do |game|
      max_counts = {}
      game.sets.each do |set|
        set.each do |color, count|
          max_counts[color] = count if !max_counts[color] || count > max_counts[color]
        end
      end
      max_counts.values
    end

    sum = max_counts_per_game.map { |set| set.inject(:*) }.sum

    puts "Sum of possible games: #{sum}"
  end

  private
  def parse_games
    @input_data.map do |line|
      game, sets = line.split(":").map(&:strip)

      game_id = game.split(" ")[1]
      sets = sets.split(";").map { |set| parse_set(set) }

      Game.new(game_id, sets)
    end
  end

  def parse_set(set)
    set.split(",").map(&:strip).each_with_object({}) do |color, result|
      count, color = color.split(" ")
      result[color] = count.to_i
    end
  end
end
