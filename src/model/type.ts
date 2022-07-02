import { OkPacket, RowDataPacket } from "mysql2";
import {query} from "../config/conectMysql"

export async function create(name: string) {
    const sql: string = `INSERT INTO type (name) VALUES ('${name}');`
    const result: OkPacket = await query(sql,null) as OkPacket;
    return result.affectedRows;
}

export async function findAll() {
    const sql: string = `SELECT * FROM type`
    const result: RowDataPacket[] = await query(sql,null) as RowDataPacket[];
    return result;
}

export async function deleteById(id: number) {
    const sql: string = `DELETE FROM type WHERE id = ${id};`
    const result: OkPacket = await query(sql,null) as OkPacket;
    return result.affectedRows;
}

export async function updateById(id: number, name: string) {
    const sql: string = `UPDATE type SET name = '${name}' WHERE id = ${id};`
    const result: OkPacket = await query(sql,null) as OkPacket;
    return result.affectedRows;
}


