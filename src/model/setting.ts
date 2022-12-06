import { OkPacket, RowDataPacket } from "mysql2";
import {query} from "../config/conectMysql"
import { SettingRequest } from "../types/settingType";

export async function create(settingRequest: SettingRequest, user_id: number) {
    const sql: string = `INSERT INTO setting (correct, condition_setting, user_id, maximum, minimum) VALUES (?,?,?,?,?);`
    const result: OkPacket = await query(sql,[settingRequest.correct, settingRequest.condition_setting, user_id, settingRequest.maximum, settingRequest.minimum]) as OkPacket;
    return result;
}

export async function findAll() {
    const sql: string = `SELECT * FROM setting`
    const result: RowDataPacket[] = await query(sql,null) as RowDataPacket[];
    return result;
}

export async function findById(id: number) {
    const sql: string = `SELECT * FROM setting WHERE id = ${id};`
    const result: RowDataPacket[] = await query(sql,null) as RowDataPacket[];
    return result;
}

export async function findByUserId(user_id: number) {
    const sql: string = `SELECT * FROM setting WHERE user_id = ${user_id};`
    const result: RowDataPacket[] = await query(sql,null) as RowDataPacket[];
    return result;
}

export async function deleteById(id: number) {
    const sql: string = `DELETE FROM setting WHERE id = ${id};`
    const result: OkPacket = await query(sql,null) as OkPacket;
    return result.affectedRows;
}

export async function updateById(id: number, settingRequest: SettingRequest, user_id: number) {
    const sql: string = `UPDATE setting SET correct = ?,  condition_setting = ?, user_id = ? WHERE id = ${id};`
    const result: OkPacket = await query(sql,[settingRequest.correct, settingRequest.condition_setting, user_id]) as OkPacket;
    return result.affectedRows;
}

export async function updateByUserId(user_id: number, settingRequest: SettingRequest) {
    const sql: string = `UPDATE setting SET correct = ?,  condition_setting = ?, maximum = ?, minimum = ? WHERE user_id = ${user_id};`
    const result: OkPacket = await query(sql,[settingRequest.correct, settingRequest.condition_setting, settingRequest.maximum, settingRequest.minimum]) as OkPacket;
    return result.affectedRows;
}



