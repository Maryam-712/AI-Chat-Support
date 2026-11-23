import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Settings from "@/model/settings.model";

export const POST = async(req:NextRequest) => {
    try{
        const {ownerId, businessName, supportEmail, knowledge} = await req.json();
        if(!ownerId || !businessName || !supportEmail || !knowledge) {
            return NextResponse.json({message: "Missing required fields"}, 
                {status: 400});
        }
        await connectDB();
        const settings = await Settings.findOneAndUpdate(
            {ownerId},
            {ownerId, businessName, supportEmail, knowledge},
            {new: true, upsert: true}
        );

        return NextResponse.json(settings);

    }catch(error){
        
        return NextResponse.json({message: `settings error ${error}`}, 
            {status: 500});
    }

    }

