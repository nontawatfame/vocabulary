import { OkPacket, RowDataPacket } from "mysql2";
import {query} from "../config/conectMysql"
import { SentencesDetailType } from "../types/sentencesType";

export async function create(sentencesDetail: SentencesDetailType) {
    const sql: string = `INSERT INTO sentences_detail (sentence_id, vocabulary_id) VALUES (?,?);`
    const result: OkPacket = await query(sql,[sentencesDetail.sentence_id, sentencesDetail.vocabulary_id]) as OkPacket;
    return result;
}

export async function findAll() {
    const sql: string = `SELECT * FROM sentences_detail`
    const result: RowDataPacket[] = await query(sql,null) as RowDataPacket[];
    return result;
}

export async function findById(id: number) {
    const sql: string = `SELECT * FROM sentences_detail WHERE id = ${id};`
    const result: RowDataPacket[] = await query(sql,null) as RowDataPacket[];
    return result;
}

export async function deleteById(id: number) {
    const sql: string = `DELETE FROM sentences_detail WHERE id = ${id};`
    const result: OkPacket = await query(sql,null) as OkPacket;
    return result.affectedRows;
}

export async function updateById(id: number, sentencesDetail: SentencesDetailType) {
    const sql: string = `UPDATE sentences_detail SET sentence_id = ?,  vocabulary_id = ? WHERE id = ${id};`
    const result: OkPacket = await query(sql,[sentencesDetail.sentence_id, sentencesDetail.vocabulary_id]) as OkPacket;
    return result.affectedRows;
}
    



