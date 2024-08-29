import User from "@/models/user";
import { connectToDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { uploadOnCloudinary } from "@/lib/cloudinary";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const { name, email, phone } = body;
    const file = (body.resume as Blob) || null;

    let filePath;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      if (!fs.existsSync("public/temp")) {
        fs.mkdirSync("public/temp", { recursive: true });
      }

      const originalFilename = (file as File).name;
      const extension = path.extname(originalFilename);
      const uniqueFilename = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${extension}`;

      filePath = path.resolve("public/temp", uniqueFilename);

      fs.writeFileSync(filePath, buffer);
    } else {
      return NextResponse.json({
        success: false,
      });
    }
    const resumeUrl = await uploadOnCloudinary(filePath);

    console.log(resumeUrl);
    

    await connectToDB();

    const newApplicant = new User({
      name,
      email,
      phone,
      resume: resumeUrl?.secure_url,
    });

    await newApplicant.save();

    return new NextResponse(JSON.stringify(newApplicant), { status: 201 });
  } catch (error) {
    console.log("SUBMIT", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
