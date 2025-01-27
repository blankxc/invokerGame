import { NextResponse } from "next/server";
import { query } from "@/app/api/db";

export async function POST(req: Request) {
    const data = await req.json()
    const {message, param, id} = data

    const updateUsers = await query(`
        UPDATE users 
        SET ${param} = $1
        WHERE id = $2
        `, [message, id])
        if (updateUsers) {
            return NextResponse.json({message: 'success'}, {status: 200})
        } else {
            return NextResponse.json({message: 'fail'}, {status: 400})
        }
}