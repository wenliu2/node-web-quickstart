import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand'
import { useDB, TRACKING_DB } from "./db/index.js"

let myenv = dotenv.config({ path: `./server/env/.env.${process.env.NODE_ENV}` });
dotenvExpand.expand(myenv)
console.log(`DB_PATH: ${process.env.DB_PATH}, file_dir=${process.cwd()}`)

console.log("start ...")
const start = async () => {
    const db = useDB(TRACKING_DB)
    await db.loadDatabaseAsync()

    /*
    await db.insertAsync({
        name: "里斯", 
        contracts: [
            {id: "101", price: 100},
            {id: "102", price: 200},
            {id: "103", price: 300}
        ]
    })
    */

    let result = await db.findAsync({ "contracts.id": "102" })
    console.log(`result: ${JSON.stringify(result)}`)

    //const updateResult = await db.updateAsync({"name": "里斯"}, {$set: {"contracts.0.price": 888}})
    //找到name="里斯"的记录，对contracts数组进行操作，删除id="004"的元素，然后加入两条新的元素，整个操作在一个处理中完成.
    const updateResult = await db.updateAsync(
        { "name": "里斯" },

        {
            $pull: { contracts: { id: "004" } },
            $push: { contracts: 
                {$each: [{ id: "004", price: 1234 },{id: "005", price: 432} ]} },
        },
    )
    console.log(`updateResult: ${JSON.stringify(updateResult)}`)
    result = await db.findAsync({ name: "里斯" })
    console.log(`result: ${JSON.stringify(result)}`)


    console.log("start done")
}

start()