import { forwardRef, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadController } from './file-upload.controller';
import { fileUploadOptions } from './file-upload-options';
import { FileUploadService } from './file-upload.service';
import { FoodModule } from 'src/food/food.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [MulterModule.register(fileUploadOptions), PrismaModule],
  controllers: [FileUploadController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
