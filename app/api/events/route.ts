import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/app/database/event.model";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
    try{
        await connectDB();
        const formData = await req.formData();
        let event;
        try{
            event = Object.fromEntries(formData.entries());
        }
        catch(e){
            return NextResponse.json({message:"Invalid form data"}, {status:400});
        }

        const file = formData.get("image") as File;
        const rawTags = formData.get("tags") as string | null;

    if(!file)
        return NextResponse.json({message:"Image file is required"}, {status:400});

    // Validate file type
    if (!file.type.startsWith("image/")) {
        return NextResponse.json({message:"Only image files are accepted"}, {status:400});
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject)=>{
        cloudinary.uploader.upload_stream({resource_type:"image", folder: "DevVerse"}, (error, result)=>{
            if(error) reject(error);
            else resolve(result);
    }).end(buffer)});

    event.image = (uploadResult as { secure_url: string }).secure_url;

    // Parse tags: accept JSON array string or comma-separated string
    let parsedTags: string[] = [];
    if (rawTags) {
        try {
            const attempt = JSON.parse(rawTags);
            parsedTags = Array.isArray(attempt) ? attempt : [rawTags];
        } catch {
            parsedTags = rawTags.split(",").map((t) => t.trim()).filter(Boolean);
        }
    }

        const createdEvent = await Event.create({...event, tags: parsedTags});
        return NextResponse.json({message:"Event created successfully", event:createdEvent}, {status:201});
    }
    catch(e){
        console.error(e);
        return NextResponse.json({message : "Event creation failed:", error:e instanceof Error ? e.message : "Unknown error"}, {status:400});
    }
}

export async function GET() {
    try{
        await connectDB();
        const events = await Event.find().sort({createdAt:-1});
        return NextResponse.json({message: "Events fetched successfully", events}, {status:200});
    }
    catch(e){
        console.error(e);
        return NextResponse.json({message : "Failed to fetch events:", error:e instanceof Error ? e.message : "Unknown error"}, {status:400});
    }
}