import {TRACKING_DB} from "../src/db/index.js"

//import e from "../src/controller/test1.js"
//import dotenv from "dotenv" 

//console.log(`dotenv: ${dotenv}`)
//console.log(`tracking_db: ${TRACKING_DB}`)

describe("jest test abc", () => {
    it('hello + hello equals hellohello', () => {
        expect("hello" + "hello").toBe("hellohello")
    })
})