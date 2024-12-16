import { KEYS } from '@/lib/keys';
import { v2 as cloudinary } from 'cloudinary';
import { CustomError } from '@/lib/customError';

cloudinary.config({
  cloud_name: KEYS.CLOUDINARY_NAME,
  api_key: KEYS.CLOUDINARY_API_KEY,
  api_secret: KEYS.CLOUDINARY_API_SECRET,
});

type Config = {
  w: number;
  h: number;
  q: number;
  folder: string;
};

class OptimisedImage {
  file: Express.Multer.File | undefined;

  constructor(file?: Express.Multer.File) {
    this.file = file;
  }

  async getProfileImg({ w, h, q, folder }: Config): Promise<string|void> {
    
    try {
      if (!this.file || !this.file.buffer) {
        throw new CustomError('No file provided', 400);
      }
      const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            transformation: [{ width: w, height: h, quality: q, crop: 'fill' }],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result as { secure_url: string });
          }
        );

        if (this.file?.buffer) {
          uploadStream.end(this.file.buffer);
        }
      });

      if (!uploadResult.secure_url) {
        throw new CustomError('Failed to process image', 500);
      }

      return uploadResult.secure_url;
    } catch (error) {
      console.error('Error processing image:', error);
    }
  }

  async deleteImageByLink(secureUrl: string, folder: string): Promise<void> {
    try {
      const urlParts = secureUrl.split('/');
      const fileNameWithExtension = urlParts.pop();
      const fileName = fileNameWithExtension?.replace(/\.[^/.]+$/, '');
      const publicId = `${folder}/${fileName}`;

      const result = await cloudinary.uploader.destroy(publicId);

      if (result.result !== 'ok') {
        throw new CustomError('Failed to delete image', 500);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }
}

export default OptimisedImage;
