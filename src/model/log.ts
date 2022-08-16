import { OkPacket, RowDataPacket } from "mysql2";
import {query} from "../config/conectMysql"
import { LogType } from "../types/logType";

export async function create(log: LogType) {
    const sql: string = `INSERT INTO log (user_id, correct_total, incorrect_total) VALUES (?,?,?);`
    const result: OkPacket = await query(sql,[log.user_id, log.correct_total, log.incorrect_total]) as OkPacket;
    return result;
}

export async function findAll() {
    const sql: string = `SELECT * FROM log`
    const result: RowDataPacket[] = await query(sql,null) as RowDataPacket[];
    return result;
}

export async function findById(id: number) {
    const sql: string = `SELECT * FROM log WHERE id = ${id};`
    const result: RowDataPacket[] = await query(sql,null) as RowDataPacket[];
    return result;
}

export async function deleteById(id: number) {
    const sql: string = `DELETE FROM log WHERE id = ${id};`
    const result: OkPacket = await query(sql,null) as OkPacket;
    return result.affectedRows;
}

export async function updateById(id: number, log: LogType) {
    const sql: string = `UPDATE log SET user_id = ?,  correct_total = ?, incorrect_total = ? WHERE id = ${id};`
    const result: OkPacket = await query(sql,[log.user_id, log.correct_total, log.incorrect_total]) as OkPacket;
    return result.affectedRows;
}

export async function getLogHistory(time: string) { 
    const sql: string = `SELECT * FROM log l WHERE l.create_at LIKE "${time}%" ORDER BY l.id DESC`
    const result: RowDataPacket[] = await query(sql,null) as RowDataPacket[];
    return result;
}
    



