import { NextResponse } from "next/server";
import { query } from "@/app/api/db";
import bcrypt from 'bcryptjs'

export  async function POST(req: Request) {
    const body = await req.json();
    const name = body.username;
    const mail = body.mail
    const password = body.password;
    const namesCheckQuery = await query(`
        SELECT * FROM USERS WHERE USERNAME = $1
        `, [name])
            if (namesCheckQuery.rows.length > 0) {
                return NextResponse.json({message: 'Такое имя занято'})
            } 
    const mailCheckQuery = await query(`
        SELECT * FROM USERS WHERE MAIL = $1
        `, [mail])
            if (mailCheckQuery.rows.length > 0) {
                return NextResponse.json({message: 'Такая электронная почта занята'})
            }
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = await query(`
            INSERT INTO USERS (username, password, mail)
            VALUES  ($1, $2, $3)
            RETURNING id
            `, [name, hashedPassword, mail])
            if (insertQuery) {
                return NextResponse.json({message: 'Успешно'})
            }
}