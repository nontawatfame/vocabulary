import { PoolOptions } from "mysql2/typings/mysql";
import * as mysql23 from 'mysql2';
var namedPlaceholders = require('named-placeholders')();

const db: PoolOptions = {
    host: process.env.HOST_MYSQL,
    user: 'root',
    port: 3306,
    password: '123456',
    database: 'vocabulary',
    connectionLimit: 10,
    waitForConnections: true,
    
}

const pool = mysql23.createPool(db);


export async function query(sql: string, params: any): Promise<any> {

    return new Promise((resolve, reject) => {
        let np = namedPlaceholders(sql, params)
        pool.execute(np[0], np[1], (err,result) => {
            if (result) {
                resolve(result)
            } else if (err != null) {
                resolve(err)
            }
        })
    })
}