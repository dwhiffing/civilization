export const tasks = [
  {
    id: 'scavenge',
    duration: 1,
    effects: [
      { id: 'food', value: 1 },
      { id: 'wood', value: 1 },
    ],
  },
  {
    id: 'chop',
    biome: ['forest'],
    duration: 1,
    effects: [{ id: 'wood', value: 1 }],
  },
  {
    id: 'farm',
    biome: ['plain'],
    duration: 1,
    effects: [{ id: 'food', value: 10 }],
  },
  {
    id: 'mine',
    biome: ['mountain'],
    duration: 1,
    effects: [{ id: 'stone', value: 1 }],
  },
  { id: 'pray', duration: 1, effects: [{ id: 'faith', value: 1 }] },
  { id: 'hunt', duration: 1, effects: [{ id: 'fur', value: 1 }] },
  { id: 'trade', duration: 1, effects: [{ id: 'gold', value: 1 }] },
  { id: 'perform', duration: 1, effects: [{ id: 'culture', value: 1 }] },
  { id: 'study', duration: 1, effects: [{ id: 'science', value: 1 }] },
  1,
]
