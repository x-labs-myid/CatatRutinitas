import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';
import { tableCompleteRoutine } from '@utils/constant';

export default class CompleteRoutine extends Model {
  static table = tableCompleteRoutine;

  @relation('routine', 'routine_id') routineId!: string;
  @field('date') date!: string;
}
