import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import routineSchema from './schema';
import Routine from './model';

const adapter = new SQLiteAdapter({
  schema: routineSchema,
  onSetUpError: (error) => {
    console.error('WatermelonDB setup error:', error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [Routine],
});

export default database;
