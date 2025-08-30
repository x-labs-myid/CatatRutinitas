import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';
import { tableRoutine } from '@utils/constant';

export default class Routine extends Model {
  static table = tableRoutine;

  @field('name') name!: string;
  @field('description') description!: string;
  @date('start_date') startDate!: string;
  @date('end_date') endDate!: string;
  @date('process_day') processDay!: number;
  @date('total_target_day') totalTargetDay!: number;
  @field('is_completed') isCompleted!: boolean;
}
