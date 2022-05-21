import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand'
//import { init as init_db, get_db } from "./db/index.js"
import test from "./controller/test1.js"
import { useDB, TRACKING_DB } from "./db/index.js"
import { apidocs } from "./apidocs.js"

let myenv = dotenv.config({ path: `./server/env/.env.${process.env.NODE_ENV}` });
dotenvExpand.expand(myenv)
console.log(`DB_PATH: ${process.env.DB_PATH}, file_dir=${process.cwd()}`)

const app: Express = express();
const port = process.env.PORT;

const tracking_db = useDB(TRACKING_DB)

const start = (async () => {
 //   await init_db()

    await tracking_db.loadDatabaseAsync()

    app.use(test.path, test.router)
    app.use('/static', express.static('./client-dist'))
    app.use('/static/*', express.static('./client-dist/index.html'))
    app.use(apidocs.path, apidocs.swaggerUI.serve, apidocs.swaggerUI.setup(apidocs.specs))
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.log(err)
        res.status(err.status || 500)
        res.json({ error: { message: err.message } })
    })

    const server = app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });

    const shutdown_fn = shutDown(server)

    process.on('SIGTERM', shutdown_fn);
    process.on('SIGINT', shutdown_fn);
})

function shutDown(server) {
    return async () => {
        console.log('Received kill signal, shutting down gracefully');
  //      await get_db().close()
        server.close(() => {
            console.log('Server closed!');
            process.exit(0);
        });
    }
}

start()