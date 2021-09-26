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
  uploadImage(@UploadedFile() file, @Res() res) {
    console.log(file);
    if (file) {
      console.log(this.cloudinaryService.uploadImage(file));
      res.send(
        `${this.configService.get('FULL_PATH')}/images/${file.filename}`,
      );
    } else {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get(':file')
  async image(@Param('file') file, @Res() res): Promise<any> {
    res.sendFile(file, { root: 'uploads' });
  }
}
