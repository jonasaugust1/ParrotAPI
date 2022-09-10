import "reflect-metadata";
import express from "express";
import * as bodyparser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes/index"
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
    .then(() => {
        const app = express();

        // call middlewares
        app.use(cors());
        app.use(helmet());
        app.use(bodyparser.json())

        app.use("/", routes);

        app.listen(process.env.PORT, () => {
            console.log("Tudo certo");
        })
    })
    .catch(error => console.log(error));
