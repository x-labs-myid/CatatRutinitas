import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';
import { tableCompleteRoutine } from '@shared/utils/constant';

export default class CompleteRoutine extends Model {
  static table = tableCompleteRoutine;

  @field('routine_id') routineId!: string;
  @field('date') date!: string;
  @field('note') note!: string;
  @field('sync') sync!: boolean;
}
