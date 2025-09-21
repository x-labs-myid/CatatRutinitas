import { tableSchema } from '@nozbe/watermelondb';
import { tableCompleteRoutine } from '@shared/utils/constant';

const completeRoutineSchema = tableSchema({
  name: tableCompleteRoutine,
  columns: [
    { name: 'routine_id', type: 'string', isIndexed: true }, // foreign key
    { name: 'date', type: 'string' },
    { name: 'note', type: 'string' },
    { name: 'sync', type: 'boolean' },
  ],
})

export default completeRoutineSchema