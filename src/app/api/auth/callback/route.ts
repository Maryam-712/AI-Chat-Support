import { scalekit } from "@/lib/scalekit"
import { NextResponse } from "next/server"

export const GET = async(req: NextResponse) => {
    const {searchParams} = new URL(req.url)
    const code = searchParams.get("code")
    const redirecturi = `${process.env.REDIRECT_URI}/api/auth/callback`
    if(!code){
        return NextResponse.json({message: "code is not found"}, {status:400})
    }
    const session = await scalekit.authenticateWithCode(code, redirecturi) 
    console.log(session)
    const resposne = NextResponse.redirect(`${process.env.REDIRECT_URI}`)
    resposne.cookies.set("access_token",session.accessToken,{
        httpOnly: true,
        maxAge: 24*60*60,
        secure: false,
        path: "/"
    })

    return resposne
}