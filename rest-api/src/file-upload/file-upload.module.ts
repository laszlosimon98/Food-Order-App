import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadController } from './file-upload.controller';
import { fileUploadOptions } from './file-upload-options';
import { FileUploadService } from './file-upload.service';
import { FoodModule } from 'src/food/food.module';

@Module({
  imports: [MulterModule.register(fileUploadOptions), FoodModule],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
