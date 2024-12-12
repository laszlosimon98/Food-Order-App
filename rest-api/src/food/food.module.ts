import { forwardRef, Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  controllers: [FoodController],
  providers: [FoodService],
  imports: [PrismaModule, FileUploadModule],
  exports: [FoodService],
})
export class FoodModule {}
