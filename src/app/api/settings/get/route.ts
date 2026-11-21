import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Settings from "@/model/settings.model";

export const POST = async(req:NextRequest) => {
    try{
        const {ownerId} = await req.json();
        if(!ownerId) {
            return NextResponse.json({message: "Missing required fields"}, 
                {status: 400});
        }
        await connectDB();
        const setting = await Settings.findOne({ownerId});

        return NextResponse.json(setting);

    }catch(error){
        
        return NextResponse.json({message: `get settings error ${error}`}, 
            {status: 500});
    }

    }
