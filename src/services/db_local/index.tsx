import { Database, appSchema } from "@nozbe/watermelondb"
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite"
import RoutineSchemas from "./routine/schema"
import Routine from "./routine/model"
import CompleteRoutineSchemas from "./complete_routine/schema"
import CompleteRoutine from "./complete_routine/model"

const schemas = appSchema({
    version: 1,
    tables: [RoutineSchemas, CompleteRoutineSchemas],
})

const adapter = new SQLiteAdapter({
    schema: schemas,
})

export const database = new Database({
    adapter,
    modelClasses: [Routine, CompleteRoutine],
})