import { RoutineDB } from '../types/db';
import { tableRoutine } from '@utils/constant';
import database from '@services/db_local';
import Routine from '@services/db_local/model';

const useDB = () => {
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

    async function insert(routineData: RoutineDB) {
        try {
            await database.write(async () => {
                await database.get<Routine>(tableRoutine).create((routine) => {
                    routine.name = routineData.name
                    routine.description = routineData.description
                    routine.startDate = routineData.startDate
                    routine.endDate = routineData.endDate
                    routine.processDay = routineData.processDay
                    routine.totalTargetDay = routineData.totalTargetDay
                    routine.isCompleted = routineData.isCompleted
                })
            })
            return true
        } catch (error) {
            console.log('error insert', error)
            return false
        }
    }

    async function update(id: string, routine: RoutineDB) {
        try {
            await database.write(async () => {
                const find = await database.get<Routine>(tableRoutine).find(id);

                await find.update((record) => {
                    record.processDay = routine.processDay;
                    record.isCompleted = routine.isCompleted;
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

export default useDB
