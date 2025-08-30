export type RoutineDB = {
    routine_id: string;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    process_day: number;
    total_target_day: number;
    is_completed: boolean;
}