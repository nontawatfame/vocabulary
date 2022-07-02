import { PoolOptions } from "mysql2/typings/mysql";
import * as mysql2 from 'mysql2-ts-pool';

const mysql = mysql2.default;
const db: PoolOptions = {
    host: process.env.HOST_MYSQL,
    user: 'root',
    port: 3306,
    password: '123456',
    database: 'vocabulary',
    connectionLimit: 100
}




export async function query(sql: string, params: any) {
    mysql.initPool(db)
    const connection = await mysql.getPool();
    (await connection.getConnection()).config.namedPlaceholders = true
    const [results] = await connection.execute(sql, params);
    await connection.end()
    return results;
}