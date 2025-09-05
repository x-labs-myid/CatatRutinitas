import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';
import { tableRoutine } from '@shared/utils/constant';

export default class Routine extends Model {
  static table = tableRoutine;

  @field('name') name!: string;
  @field('description') description!: string;
  @field('start_date') startDate!: string;
  @field('end_date') endDate!: string;
  @field('process_day') processDay!: number;
  @field('complete_date') completeDate!: string;
  @field('total_target_day') totalTargetDay!: number;
  @field('is_completed') isCompleted!: boolean;
}
