import { OkPacket, RowDataPacket } from "mysql2";
import {query} from "../config/conectMysql"

export async function create(name: string) {
    const sql: string = `INSERT INTO type (name) VALUES ('${name}');`
    const result: OkPacket = await query(sql,null) as OkPacket;
    let message = 'Error in creating type';
    if (result.affectedRows) {
        message = 'created type successfully';
    }
    return {message};
}

export async function findAll() {
    const sql: string = `SELECT * FROM type`
    const result: RowDataPacket[] = await query(sql,null) as RowDataPacket[];
    return result;
}


