import { appSchema, tableSchema } from '@nozbe/watermelondb';
import { tableRoutine } from '@utils/constant';

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: tableRoutine,
      columns: [
        { name: 'routine_id', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'start_date', type: 'string' },
        { name: 'end_date', type: 'string' },
        { name: 'is_completed', type: 'boolean' },
      ],
    }),
  ],
});
