### todo

- Improve roulette function
  - most necessary info stays the same (must not be recomputed)
  - use binary search to find pick
  - ✔ try eliminate exclude differently
- GA Input parameters
  - Also generic controls
- Try eliminate population parameter
  - increase population size when stuck
- Try separate crossover & mutation
  - only do crossover until stuck, then mutate
- Try kill & repair strategy?
  - mutation deletes genes, making the chromosome invalid
  - a repair function stitches it back together
  - (this might be the better approach instead of finding a "clever" mutation operator)
- Use webworkers?

### low prio

### done

- ✔ Paint start point and direction
- ✔ Reverse crossover
- ✔ GA self
- ✔ GA by book
  - ✔ Selection
    - ✔ Normalize
  - ✔ Mutation
  - ✔ Crossover
  - ✔ Termination condition
  - ✔ Stats
- ✔ on enter -> generate cities
- ✔ proper blocks
- ✔ reset method
- ✔ make utils.ts
- ✔ point interface
- ✔ rework scale
