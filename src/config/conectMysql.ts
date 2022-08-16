import { PoolOptions } from "mysql2/typings/mysql";
import * as mysql2 from 'mysql2-ts-pool';
import * as mysql23 from 'mysql2';


const mysql = mysql2.default;
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
        pool.execute(sql,params, (err,result) => {
            if (result) {
                resolve(result)
            } else if (err != null) {
                resolve(err)
            }
        })
    })
    
    // mysql.initPool(db)
    // const {rows,info} = await mysql.execFetch({sql: sql, values: params});
    // const connection =  await mysql.getPool().getConnection()
    // connection.release()
    // return rows;
}