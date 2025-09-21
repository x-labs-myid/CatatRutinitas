import { database } from '@services/db_local/index';
import CompleteRoutine from '@services/db_local/complete_routine/model';
import { tableCompleteRoutine } from '@shared/utils/constant';
import { CompleteRoutineTable } from '@shared/types/db';
const useTableCompleteRoutine = () => {
    function select() {
        try {
            return database.get<CompleteRoutine>(tableCompleteRoutine).query().fetch()
        } catch (error) {
            console.log('error select: ', error)
            return []
        }
    }

    function find(id: string) {
        try {
            return database.get<CompleteRoutine>(tableCompleteRoutine).find(id)
        } catch (error) {
            console.log(`error find ${id}: `, error)
            return null
        }
    }

    async function insert(routineData: CompleteRoutineTable) {
        try {
            let newRoutine: CompleteRoutine | null = null

            await database.write(async () => {
                newRoutine = await database.get<CompleteRoutine>(tableCompleteRoutine).create((routine) => {
                    routine.routineId = routineData.routineId!
                    routine.date = routineData.date!
                    routine.note = routineData.note!
                    routine.sync = routineData.sync!
                })
            })
            return newRoutine!.id
        } catch (error) {
            console.log('error insert', error)
            return null
        }
    }

    return {
        select,
        find,
        insert,
    }
}

export default useTableCompleteRoutine