import { getSession } from "./lib/getSession";
import { NextRequest, NextResponse } from "next/server";

export const proxy = async (request: NextRequest) => {
    const session = await getSession();
    if(!session){
        return NextResponse.redirect(`${process.env.REDIRECT_URI}`);
    }
    return NextResponse.next();
}

// specifying the route of the middleware to be applied to. In this case, it will be applied to all routes under /dashboard

export const config ={
    matcher: '/dashboard/:path*'
}