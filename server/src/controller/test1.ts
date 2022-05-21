/**
 * @swagger
 * tags:
 *   name: Test
 *   description: API to test.
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - age
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user.
 *         name:
 *           type: string
 *           description: The name of the user.
 *         age:
 *           type: number
 *           description: How old of the user?
 *       example:
 *          name:  张三
 *          age: 10
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the book.
 *         title:
 *           type: string
 *           description: The title of your book.
 *         author:
 *           type: string
 *           description: Who wrote the book?
 *         finished:
 *           type: boolean
 *           description: Have you finished reading it?
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date of the record creation.
 *       example:
 *          title: The Pragmatic Programmer
 *          author: Andy Hunt / Dave Thomas
 *          finished: true
 */
import e, { Request, Response, NextFunction } from 'express'
import utils from '../../../common/utils.js'
import { test_insert, test_delete } from "../db/db.js"

const router = e.Router()

/**
 * @swagger
 * /test/test-insert/{name}/{age}:
 *     get:
 *         summary: test insert into db
 *         tags: [testing]
 *         parameters:
 *         - in: path
 *           name: name
 *           schema: { type: string }
 *           required: true
 *           description: name of the user
 *         - in: path
 *           name: age
 *           schema: { type: integer }
 *           required: true
 *           description: age of the user
 *         responses:
 *             "200":
 *                 description: It inserts a doc into DB, and return the inserted result.
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/User'
 */
router.get("/test-insert/:name/:age",
    utils.try_with(async (req: Request, res: Response, next: NextFunction) => {
        const { name, age } = req.params
        const num_age = Number(age)
        if (isNaN(num_age)) {
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
        const { name } = req.params
        const result = await test_delete(name)
        //const seq = await sequence(collection, num_size)
        res.json({ count: result })
    })
)

export default {
    path: "/api/test",
    router: router
}
