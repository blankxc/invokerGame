import { NextResponse } from "next/server";
import { query } from "@/app/api/db";

export async function GET() {
    const getRecords = await query(`
        SELECT *
        FROM users
        ORDER BY default_record DESC
        LIMIT 20
        `);
    if (getRecords) {
        return NextResponse.json({ message: getRecords.rows });
    }
}
