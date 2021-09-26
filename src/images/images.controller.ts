import {
  Controller,
  Param,
  Post,
  Res,
  Get,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImagesHelper } from './images.helper';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@ApiTags('Images upload')
@Controller('images')
export class ImagesController {
  constructor(
    private configService: ConfigService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: ImagesHelper.destinationPath,
        filename: ImagesHelper.customFileName,
      }),
      fileFilter: ImagesHelper.fileFilter,
      limits: { fileSize: 1024 * 1024 },
    }),
  )
  async uploadImage(@UploadedFile() file, @Res() res) {
    if (file) {
      const cloudinaryFile = await this.cloudinaryService.uploadImage(
        `./uploads/${file.filename}`,
      );

      res.send(cloudinaryFile.url);
    } else {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get(':file')
  async image(@Param('file') file, @Res() res): Promise<any> {
    res.sendFile(file, { root: 'uploads' });
  }
}
