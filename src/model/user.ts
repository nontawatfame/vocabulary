import { OkPacket, RowDataPacket } from "mysql2";
import {query} from "../config/conectMysql"
import { RequestRegister } from "../types/authType";

export async function create(req: RequestRegister) {
    const sql: string = `INSERT INTO user (username, password, name) VALUES ('${req.username}', '${req.password}', '${req.name}');`
    const result: OkPacket = await query(sql,null) as OkPacket;
    return result.affectedRows;
}

export async function findByUsername(username: string) {
    const sql: string = `SELECT * FROM user WHERE username = "${username}"`
    const result: RowDataPacket[] = await query(sql,null) as RowDataPacket[];
    return result;
}


export async function findAll() {
    const sql: string = `SELECT * FROM user`
    const result: RowDataPacket[] = await query(sql,null) as RowDataPacket[];
    return result;
}


