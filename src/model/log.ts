import { OkPacket, RowDataPacket } from "mysql2";
import {query} from "../config/conectMysql"
import { LogType } from "../types/logType";

export async function create(log: LogType) {
    const sql: string = `INSERT INTO log (vocabulary_id, user_id, correct) VALUES (?,?,?);`
    const result: OkPacket = await query(sql,[log.vocabulary_id, log.user_id, log.correct]) as OkPacket;
    return result.affectedRows;
}

export async function findAll() {
    const sql: string = `SELECT * FROM log`
    const result: RowDataPacket[] = await query(sql,null) as RowDataPacket[];
    return result;
}

export async function deleteById(id: number) {
    const sql: string = `DELETE FROM log WHERE id = ${id};`
    const result: OkPacket = await query(sql,null) as OkPacket;
    return result.affectedRows;
}

export async function updateById(id: number, log: LogType) {
    const sql: string = `UPDATE log SET vocabulary_id = ?,  user_id = ?, correct = ? WHERE id = ${id};`
    const result: OkPacket = await query(sql,[log.vocabulary_id, log.user_id, log.correct]) as OkPacket;
    return result.affectedRows;
}


