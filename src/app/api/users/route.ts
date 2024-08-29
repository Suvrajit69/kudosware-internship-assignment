import User from "@/models/user";
import { connectToDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { uploadOnCloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const { name, email, phone } = body;
    const file = (body.resume as Blob) || null;

    if (!file) {
      return NextResponse.json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    const cloudinaryUrl = await uploadOnCloudinary(buffer);
    if (!cloudinaryUrl) {
      return NextResponse.json({
        success: false,
        message: "Uploading failed to cloudinary",
      });
    }
    await connectToDB();
    console.log(cloudinaryUrl);

    const newApplicantion = new User({
      name,
      email,
      phone,
      resume: cloudinaryUrl,
    });
    console.log(newApplicantion);

    await newApplicantion.save();

    return new NextResponse(JSON.stringify(newApplicantion), { status: 201 });
  } catch (error) {
    console.log("SUBMIT", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
