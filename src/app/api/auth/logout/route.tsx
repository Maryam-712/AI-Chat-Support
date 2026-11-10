import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async (request: NextRequest) => {
    const cookieStore = await cookies();
    cookieStore.delete('access_token');
    return NextResponse.redirect(`${process.env.REDIRECT_URI}`);
}