import * as migration_20250831_120127 from './20250831_120127';

export const migrations = [
  {
    up: migration_20250831_120127.up,
    down: migration_20250831_120127.down,
    name: '20250831_120127'
  },
];
