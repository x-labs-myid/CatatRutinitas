import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export default class Routine extends Model {
  static table = 'routines';

  @field('title') title!: string;
  @field('description') description!: string;
  @date('start_date') startDate!: Date;
  @date('end_date') endDate!: Date;
  @field('is_completed') isCompleted!: boolean;
}
