import { RoutineDB } from '../types/db';
import { tableRoutine } from '@utils/constant';
import database from '@services/db_local';

const useDB = () => {
    function select() {
        return database.get(tableRoutine)
    }

    function find(id: string) {
        return database.get(tableRoutine).find(id)
    }

    async function insert(routine: RoutineDB) {
        return await database.get(tableRoutine).create((record) => {
            const newRoutine = record as unknown as RoutineDB
            newRoutine.name = routine.name;
            newRoutine.description = routine.description;
            newRoutine.start_date = routine.start_date;
            newRoutine.end_date = routine.end_date;
            newRoutine.is_completed = routine.is_completed;
        });
    }

    async function update(id: string, routine: RoutineDB) {
        await database.write(async () => {
            const find = await database.get(tableRoutine).find(id);

            await find.update((record) => {
                const updated = record as unknown as RoutineDB;
                updated.is_completed = routine.is_completed;
            });
        });
    }

    async function del(id: string) {
        await database.write(async () => {
            const find = await database.get(tableRoutine).find(id);

            await find.destroyPermanently();
        });
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
