import { OkPacket, RowDataPacket } from "mysql2";
import {query} from "../config/conectMysql"
import { logDetailType } from "../types/logType";

export async function create(log: logDetailType) {
    const sql: string = `INSERT INTO log_detail (log_id, vocabulary_id, correct, incorrect) VALUES (?,?,?,?);`
    const result: OkPacket = await query(sql,[log.log_id, log.vocabulary_id, log.correct, log.incorrect]) as OkPacket;
    return result.affectedRows;
}

export async function findAll() {
    const sql: string = `SELECT * FROM log_detail`
    const result: RowDataPacket[] = await query(sql,null) as RowDataPacket[];
    return result;
}

export async function findByLogId(id: number) {
    const sql: string = `SELECT ld.*, v.name, v.sound, v.meaning, t.abbreviation FROM log_detail ld
                        LEFT JOIN vocabulary v on v.id = ld.vocabulary_id
                        LEFT JOIN type t on t.id = v.type_id
                        WHERE log_id = ${id}`
    const result: RowDataPacket[] = await query(sql,null) as RowDataPacket[];
    return result;
}

export async function deleteById(id: number) {
    const sql: string = `DELETE FROM log_detail WHERE id = ${id};`
    const result: OkPacket = await query(sql,null) as OkPacket;
    return result.affectedRows;
}

export async function updateById(id: number, log: logDetailType) {
    const sql: string = `UPDATE log_detail SET log_id = ?,  vocabulary_id = ?, correct = ?, incorrect = ? WHERE id = ${id};`
    const result: OkPacket = await query(sql,[log.log_id, log.vocabulary_id, log.correct, log.incorrect]) as OkPacket;
    return result.affectedRows;
}


