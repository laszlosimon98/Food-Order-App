import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Public } from 'src/decorators/public/public.decorator';
import { FileUploadService } from './file-upload.service';
import { identity } from 'rxjs';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Public()
  @Post(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile('file')
    file: Express.Multer.File,
    @Param('id', ParseIntPipe) food_id: number,
  ) {
    return this.fileUploadService.uploadImage(food_id, file.filename);
  }
}
