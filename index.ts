import express, {Express} from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import path from "path";
import morgan from "morgan";
import api from "./src/routes/api";
import * as formData  from "express-form-data"
import { middleware } from "./src/config/middleware";
import cors from "cors"
import  fileUpload from "express-fileupload"
import * as conectMysql from "./src/config/conectMysql"

let pathEnv = path.join(__dirname, 'src', 'env', `.env.${process.env.NODE_ENV}`)
let pathPublic = path.join(__dirname, 'public')
if (process.env.NODE_ENV == "product") {
    pathEnv = path.join(__dirname, '..', 'src', 'env', `.env.${process.env.NODE_ENV}`)
    pathPublic = path.join(__dirname, '..', 'public')
}

console.log(pathEnv)
console.log(pathPublic)
console.log(process.env.NODE_ENV)

dotenv.config({path: pathEnv});
const app: Express = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(pathPublic));

console.log("process.env index")
console.log(process.env.HOST_MYSQL)
conectMysql.createPool()
// const options = {
//     autoClean: true
// };

// app.use(formData.parse(options));
// app.use(formData.format());
// app.use(formData.stream());
// app.use(formData.union());
app.use(fileUpload());

// app.use('/api', middleware, api);
app.use('/api', api);

try {
    app.listen(process.env.PORT, (): void => {
        console.log(`Connected successfully on port ${process.env.PORT}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}

export default app 