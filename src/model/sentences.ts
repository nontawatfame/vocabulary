import { OkPacket, RowDataPacket } from "mysql2";
import {query} from "../config/conectMysql"
import { SentencesType } from "../types/sentencesType";

export async function create(sentence: SentencesType) {
    const sql: string = `INSERT INTO sentences (sentence, sound) VALUES (?,?);`
    const result: OkPacket = await query(sql,[sentence.sentence, sentence.sound]) as OkPacket;
    return result;
}

export async function findAll() {
    const sql: string = `SELECT * FROM sentences`
    const result: RowDataPacket[] = await query(sql,null) as RowDataPacket[];
    return result;
}

export async function findById(id: number) {
    const sql: string = `SELECT * FROM sentences WHERE id = ${id};`
    const result: RowDataPacket[] = await query(sql,null) as RowDataPacket[];
    return result;
}

export async function deleteById(id: number) {
    const sql: string = `DELETE FROM sentences WHERE id = ${id};`
    const result: OkPacket = await query(sql,null) as OkPacket;
    return result.affectedRows;
}

export async function updateById(id: number, sentence: SentencesType) {
    const sql: string = `UPDATE sentences SET sentence = ?,  sound = ? WHERE id = ${id};`
    const result: OkPacket = await query(sql,[sentence.sentence, sentence.sound]) as OkPacket;
    return result.affectedRows;
}
    



