import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    const redirecturi = `${process.env.REDIRECT_URI}/api/auth/callback`;
    const url = scalekit.getAuthorizationUrl(redirecturi);
    return NextResponse.redirect(url);
}