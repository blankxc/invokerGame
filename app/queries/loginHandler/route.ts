import { NextResponse } from "next/server";
import { query } from "@/app/api/db";
import bcrypt from 'bcryptjs';
import crypto from 'crypto'

export async function POST(req: Request) {
    const body = await req.json()
    let dbPassword;
    const {username, password} = body
    const searchNameQuery = await query(`
        SELECT * FROM USERS WHERE username = $1
        `, [username])
        if (searchNameQuery.rows.length == 0) {
            return NextResponse.json({message: 'Такого имени нет'})
        } else {
            dbPassword = searchNameQuery.rows[0].password
        }
        const comparePasswords = await bcrypt.compare(password, dbPassword)
        if (comparePasswords == false) {
            return 'Неверный пароль'
        }

        const ENCRYPTION_KEY= process.env.ENCRYPTION_KEY || ''

        const userId = searchNameQuery.rows[0].id
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv(
            'aes-256-gcm',
            Buffer.from(ENCRYPTION_KEY, 'utf-8'),
            iv
            );
        
        let encrypted = cipher.update(userId.toString(), 'utf-8', 'hex');
        encrypted += cipher.final('hex')
        const authTag = cipher.getAuthTag().toString('hex')
        const sessionToken = iv.toString('hex') + ':' + encrypted + ':' + authTag
        const response = NextResponse.json({success: true})
        response.cookies.set('sessionToken', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            path: '/',
            maxAge: 60 * 60 * 24 * 60
        })
        return response
}