export type RoutineTable = {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    processDay: number;
    totalTargetDay: number;
    isCompleted: boolean;
}

export type CompleteRoutineTable = {
    routineId: string;
    date: string;
}