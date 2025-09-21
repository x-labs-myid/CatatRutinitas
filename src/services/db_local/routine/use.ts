import { RoutineTable } from '@shared/types/db';
import { tableRoutine } from '@shared/utils/constant';
import { database } from '@services/db_local/index';
import Routine from '@services/db_local/routine/model';

const useTableRoutine = () => {
    function select() {
        try {
            return database.get<Routine>(tableRoutine).query().fetch()
        } catch (error) {
            console.log('error select: ', error)
            return []
        }
    }

    function find(id: string) {
        try {
            return database.get<Routine>(tableRoutine).find(id)
        } catch (error) {
            console.log(`error find ${id}: `, error)
            return null
        }
    }

    async function insert(routineData: RoutineTable) {
        try {
            let newRoutine: Routine | null = null

            await database.write(async () => {
                newRoutine = await database.get<Routine>(tableRoutine).create((routine) => {
                    routine.name = routineData.name!
                    routine.description = routineData.description!
                    routine.startDate = routineData.startDate!
                    routine.endDate = routineData.endDate!
                    routine.processDay = routineData.processDay!
                    routine.completeDate = routineData.completeDate!
                    routine.totalTargetDay = routineData.totalTargetDay!
                    routine.isCompleted = routineData.isCompleted!
                    routine.reminder = routineData.reminder!
                    routine.sync = routineData.sync!
                })
            })
            return newRoutine!.id
        } catch (error) {
            console.log('error insert', error)
            return null
        }
    }

    async function update(id: string, routine: RoutineTable) {
        try {
            await database.write(async () => {
                const find = await database.get<Routine>(tableRoutine).find(id);

                await find.update((record) => {
                    record.name = routine.name!;
                    record.description = routine.description!;
                    record.startDate = routine.startDate!;
                    record.endDate = routine.endDate!;
                    record.processDay = routine.processDay!;
                    record.completeDate = routine.completeDate!;
                    record.totalTargetDay = routine.totalTargetDay!;
                    record.isCompleted = routine.isCompleted!;
                    record.reminder = routine.reminder!;
                    record.sync = routine.sync!;
                });
            })
            return true
        } catch (error) {
            console.log(`error update ${id}: `, error)
            return false
        }
    }

    async function del(id: string) {
        try {
            await database.write(async () => {
                const find = await database.get<Routine>(tableRoutine).find(id);

                await find.destroyPermanently();
            });
            return true
        } catch (error) {
            console.log(`error delete ${id}: `, error)
            return false
        }
    }

    return {
        select,
        find,
        insert,
        update,
        del,
    }
}

export default useTableRoutine