import { NextRequest, NextResponse } from "next/server"
import crypto from 'crypto'
import { query } from "@/app/api/db";

export async function GET(req: NextRequest) {
    const cookies = req.headers.get('cookie') || '';
    const sessionToken = cookies.split(';')
    .find((cookie: string) => cookie.trim().startsWith('sessionToken='))
    ?.split('=')[1];

    if (!sessionToken) {
        return NextResponse.json({message: 'user token not found'}, {status: 400})
    }
    const ENCRYPTION_KEY= process.env.ENCRYPTION_KEY || ''

    const decodedToken = decodeURIComponent(sessionToken)
    const [ivHex, encryptedHex, AuthTagHex] = decodedToken.split(':')
    const iv = Buffer.from(ivHex, 'hex')
    const encrypted = Buffer.from(encryptedHex, 'hex')
    const authTag = Buffer.from(AuthTagHex, 'hex')

    const decipher = crypto.createDecipheriv(
        'aes-256-gcm',
        Buffer.from(ENCRYPTION_KEY, 'utf-8'),
        iv
    )

    decipher.setAuthTag(authTag)
    let decrypted = decipher.update(encrypted)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    const token = decrypted.toString('utf-8')
    const selectQuery = await query(`
        SELECT * FROM USERS WHERE id = $1
        `, [token])
    return NextResponse.json({message: selectQuery.rows}, {status: 200})

}