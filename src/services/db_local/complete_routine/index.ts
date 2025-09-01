import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import completeRoutineSchema from './schema';
import CompleteRoutine from './model';

const adapter = new SQLiteAdapter({
  schema: completeRoutineSchema,
  onSetUpError: (error) => {
    console.error('WatermelonDB setup error:', error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [CompleteRoutine],
});

export default database;
