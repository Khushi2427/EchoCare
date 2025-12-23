import cloudinary from "../config/cloudinary.js";

/**
 * Upload a file to Cloudinary (image / pdf / video safe)
 */
export const uploadToCloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    const isPDF = file.mimetype === "application/pdf";

    const timeout = setTimeout(() => {
      reject(new Error("Upload timed out"));
    }, 2 * 60 * 1000);

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: isPDF ? "raw" : "auto", // 🔥 FIX
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        clearTimeout(timeout);
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(error);
        }
        resolve(result);
      }
    );

    uploadStream.end(file.buffer);
  });
};
