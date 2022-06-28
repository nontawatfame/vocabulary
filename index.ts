import express, {Express} from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import path from "path";
import morgan from "morgan";
import api from "./src/routes/api";
import { middleware } from "./src/config/middleware";

dotenv.config({path:`${__dirname}/src/env/.env.${process.env.NODE_ENV}`});
const app: Express = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', middleware, api);

try {
    app.listen(process.env.PORT, (): void => {
        console.log(`Connected successfully on port ${process.env.PORT}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}

export default app 