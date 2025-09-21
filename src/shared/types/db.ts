export type RoutineTable = {
    id?: string;
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    processDay?: number;
    completeDate?: string;
    totalTargetDay?: number;
    isCompleted?: boolean;
    reminder?: string;
    sync?: boolean;
}

export type CompleteRoutineTable = {
    routineId?: string;
    date?: string;
    note?: string;
    sync?: boolean;
}