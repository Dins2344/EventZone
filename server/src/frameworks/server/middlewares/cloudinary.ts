import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from 'cloudinary';
import multer from 'multer';
import { NextFunction, Request,Response, RequestHandler } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import configKeys from '../../../config';

interface CloudinaryStorageOptions {
  cloudinary: any; // Adjust the type as needed for the cloudinary object
  params: {
    resource_type: string;
    allowed_formats: string[];
    public_id: (req: Request, file: Express.Multer.File) => string;
  };
}

// Cloudinary configuration
cloudinary.config({
  cloud_name: configKeys.CLOUD_NAME,
  api_key: configKeys.API_KEY,
  api_secret: configKeys.API_SECRET_KEY
});

// Multer configuration
const storageOptions: CloudinaryStorageOptions = {
  cloudinary: cloudinary,
  params: {
    resource_type: 'auto',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req: Request, file: Express.Multer.File): string => {
      const fileName = file.originalname.split('.').slice(0, -1).join('.');
      console.log(fileName)
      return fileName;
    }
  }
};

const storage = new CloudinaryStorage(storageOptions);
const upload: RequestHandler = multer({ storage: storage }).array('images');


export { upload };



// Configure multer storage for Cloudinary
// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: (req: Request, file: Express.Multer.File): UploadApiOptions => {
//       return {
//         resource_type: 'auto',
//         allowed_formats: ['jpg', 'jpeg', 'png'],
//         public_id: `uploads/${Date.now()}-${file.originalname}`
//       };
//     }
//   });
  
//   // Create the multer middleware for handling file uploads
//   const upload = multer({ storage }).array('images', 5);
  
//   // Create the middleware function
//   export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     upload(req, res, (err: any) => {
//       if (err instanceof multer.MulterError) {
//         console.error(err);
//         return res.status(400).json({ error: 'Failed to upload images' });
//       } else if (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Internal server error' });
//       }
//       console.log('images uploaded')
//       next();
//     });
//   };
  