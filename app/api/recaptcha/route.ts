/* eslint-disable */

import { NextResponse } from "next/server"

async function POST(request: Request) {
    const res = await request.json()
    const serverSecretKey = `secret=${process.env.RECAPTCHA_SERVER_SECRET_KEY}&response=${res.token}`
    const responseRecaptcha = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: serverSecretKey,
        },
    )

    const responseJsonRecaptcha = await responseRecaptcha.json()

    return NextResponse.json({ responseJsonRecaptcha })
}
