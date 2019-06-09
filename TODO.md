### todo

- animation of best population, length and generation
- GA Input parameters
  - Also generic controls
- Try eliminate population parameter
  - increase population size when stuck
- Use webworkers?
- Improve roulette function?
  - store accumulated fitness
  - use binary search to find pick
  - ✔ store population fitness
  - ✔ try eliminate exclude differently

### low prio

### done

- ✔ cache path length computation
  - maybe add cache data to pints itself? (with weak maps)
- ✔ Try delete & repair strategy?
  - mutation deletes genes, making the chromosome invalid
  - a repair function stitches it back together
  - (this might be the better approach instead of finding a "clever" mutation operator)
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
