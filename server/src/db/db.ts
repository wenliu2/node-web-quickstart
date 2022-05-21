import Datastore from "@seald-io/nedb"
import path from "path"

export const TRACKING_DB = "tracking"
const db_dict: {[key: string]: Datastore} = {}

export function useDB(db_name: string): Datastore{
    const db = db_dict[db_name]
    if ( db ) return db
    return init_db(db_name)
}

function init_db(db_name: string):Datastore  {
    const dbPath =  `${process.env.DB_PATH}`
    const db_file_name = path.join(dbPath, db_name + ".nedb")
    console.log(`initialing db ${db_file_name}`)
    const db = new Datastore({filename: db_file_name})
    
    db_dict[db_name] = db
    return db
}

export async function test_insert(name: string, age: number) {
    return db_dict[TRACKING_DB].insertAsync({name: name, age: age})
}

export async function test_delete(name: string) {
    return db_dict[TRACKING_DB].removeAsync({name: name}, {multi: true})
}