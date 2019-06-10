Playing around with Genetic Algorithms (GA) on the Traveling Salesman Problem (TSP).

# Try it out :-)

https://osi-oswald.github.io/ga-tsp/

# Generate Cities

## Count

Number of cities to generate.

## Random

Generates cities by random coordinates.

## Circle

Generates cities on a circle. The optimal TSP solution for humans is obvious
(just walking along the circle). But the GA does not know that ;-)

# Find Paths

## Random

Simply finds a path by picking a random city after another.

## Nearest Neighbour

Finds a path by picking the closest city after another. It will always find the
optimal path if the cities were generated on a circle.

## GA by the book

GA implemented as found documented on several sources.

### Selection

Selection is done by [Roulette Wheel](http://www.rubicite.com/Tutorials/GeneticAlgorithms/SelectionBias.aspx).

### Crossover rate

The chance that 2 selected candidates are being crossed over. It uses the
[Order 1 Crossover](http://www.rubicite.com/Tutorials/GeneticAlgorithms/CrossoverOperators/Order1CrossoverOperator.aspx)
operator.

### Mutation rate

The chance that a candidate is getting mutated. The mutation will swap two arbitrary cities.

### Elitism rate

How much of the best candidates (elites) of the current generation are being taken over
to the next generation (without crossover and mutation).

## GA by osi-oswald 😎

I tried out some ideas of my own. Apart from the population size, no additional parameters
are needed.

### Selection

Selection is done by [Roulette Wheel](http://www.rubicite.com/Tutorials/GeneticAlgorithms/SelectionBias.aspx).

### Crossover

It always applies crossover to candidates (using [Order 1 Crossover](http://www.rubicite.com/Tutorials/GeneticAlgorithms/CrossoverOperators/Order1CrossoverOperator.aspx)).

### Mutation

It always mutates candidates by a random mutation rate (0 - 99%). The mutation deletes
arbitrary paths (depending on mutation rate) and repairs them again randomly.

### Elitism

Instead of an elitism rate, the next generation is selected by the elites of the previous
generation and newly computed generation.
