import { v2 as Cloudinary, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";

Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const uploadOnCloudinary = async (
  fileBuffer: Buffer
): Promise<string | null> => {
  try {
    return new Promise<string | null>((resolve, reject) => {
      const uploadStream = Cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
        },
        (error: Error | undefined, result: UploadApiResponse | undefined) => {
          if (error) {
            console.error("Upload failed:", error);
            reject(null);
          } else {
            console.log("File successfully uploaded:", result?.secure_url);
            resolve(result?.secure_url || null);
          }
        }
      );

      const readableStream = new Readable();
      readableStream.push(fileBuffer);
      readableStream.push(null); 
      readableStream.pipe(uploadStream);
    });
  } catch (error) {
    console.error("Error during upload:", error);
    return null;
  }
};

export { uploadOnCloudinary };
