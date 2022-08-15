import { PoolOptions } from "mysql2/typings/mysql";
import * as mysql2 from 'mysql2-ts-pool';


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



export async function query(sql: string, params: any): Promise<any> {
    mysql.initPool(db)
    const {rows,info} = await mysql.execFetch({sql: sql, values: params});
    const connection =  await mysql.getPool().getConnection()
    connection.release()
    return rows;
}