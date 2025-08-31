import * as migration_20250831_120127 from './20250831_120127';
import * as migration_20250831_145523 from './20250831_145523';
import * as migration_20250831_150813_countries_collection from './20250831_150813_countries_collection';
import * as migration_20250831_155901_update_resources_schema from './20250831_155901_update_resources_schema';
import * as migration_20250831_countries_seed from './20250831_countries_seed';

export const migrations = [
  {
    up: migration_20250831_120127.up,
    down: migration_20250831_120127.down,
    name: '20250831_120127',
  },
  {
    up: migration_20250831_145523.up,
    down: migration_20250831_145523.down,
    name: '20250831_145523',
  },
  {
    up: migration_20250831_150813_countries_collection.up,
    down: migration_20250831_150813_countries_collection.down,
    name: '20250831_150813_countries_collection',
  },
  {
    up: migration_20250831_155901_update_resources_schema.up,
    down: migration_20250831_155901_update_resources_schema.down,
    name: '20250831_155901_update_resources_schema',
  },
  {
    up: migration_20250831_countries_seed.up,
    down: migration_20250831_countries_seed.down,
    name: '20250831_countries_seed'
  },
];
