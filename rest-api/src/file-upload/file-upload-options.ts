import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const fileUploadOptions: MulterOptions = {
  limits: {
    files: 1,
    fileSize: 1024 * 1024, // 1MB
  },
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      return callback(
        new BadRequestException('Only image files are allowed'),
        false,
      );
    }
    callback(null, true);
  },
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 10);
      const ext = extname(file.originalname);
      const filename = `${file.originalname.split('.')[0]}-${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  }),
};
