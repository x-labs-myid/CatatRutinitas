import { useDatabase } from '@nozbe/watermelondb/hooks';
import { RoutineDB } from '../types/db';

const useDB = () => {
    const db = useDatabase()

    function select() {
        return db.get('routines')
    }

    function find(id: string) {
        return db.get('routines').find(id)
    }

    async function insert(routine: RoutineDB) {
        return await db.get('routines').create((record) => {
            const newRoutine = record as unknown as RoutineDB
            newRoutine.title = routine.title;
            newRoutine.description = routine.description;
            newRoutine.start_date = routine.start_date;
            newRoutine.end_date = routine.end_date;
            newRoutine.is_completed = routine.is_completed;
        });
    }

    async function update(id: string, routine: RoutineDB) {
        await db.write(async () => {
            const find = await db.get('routines').find(id);

            await find.update((record) => {
                const updated = record as unknown as RoutineDB;
                updated.is_completed = routine.is_completed;
            });
        });
    }

    async function del(id: string) {
        await db.write(async () => {
            const find = await db.get('routines').find(id);

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
