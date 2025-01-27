import { query } from "@/app/api/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json()
    const {userId, record} = body
    const updateQuery = await query(`
        UPDATE users SET default_record = $1 WHERE id = $2
        `, [record, userId])
        if (updateQuery) {
          return NextResponse.json({message: 'Новый рекорд'}, {status: 200})
        }
}