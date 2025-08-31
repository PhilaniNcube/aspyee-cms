import * as migration_20250831_120127 from './20250831_120127'
import * as migration_20250831_countries_seed from './20250831_countries_seed'

export const migrations = [
  {
    up: migration_20250831_120127.up,
    down: migration_20250831_120127.down,
    name: '20250831_120127',
  },
  {
    up: migration_20250831_countries_seed.up,
    down: migration_20250831_countries_seed.down,
    name: '20250831_countries_seed',
  },
]
