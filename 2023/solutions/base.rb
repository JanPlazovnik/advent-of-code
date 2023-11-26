class BaseSolution
  def initialize(input_file)
    if File.exist?(input_file) && File.readable?(input_file)
      @input_data = File.read(input_file)
    else
      raise "Input file #{input_file} not found or not readable"
    end
  end

  def part_one
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end

  def part_two
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end
