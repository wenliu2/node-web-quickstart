import e, { Request, Response, NextFunction } from 'express'
import utils from '../../../common/utils.js'
import { test_insert, test_delete } from "../db/db.js"

const router = e.Router()

router.get("/test-insert/:name/:age",
    utils.try_with(async (req: Request, res: Response, next: NextFunction) => {
        const {name, age} = req.params
        const num_age = Number(age)
        if ( isNaN(num_age) ) {
            throw {
                status: 400,
                message: `"${age}"不是数字`
            }
        }
        const result = await test_insert(name, num_age)
        //const seq = await sequence(collection, num_size)
        res.json(result)
    })
)

router.get("/test-delete/:name",
    utils.try_with(async (req: Request, res: Response, next: NextFunction) => {
        const {name} = req.params
        const result = await test_delete(name)
        //const seq = await sequence(collection, num_size)
        res.json({count: result})
    })
)

export default {
    path: "/api/test",
    router: router
}
