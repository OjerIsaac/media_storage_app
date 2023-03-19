import {
  Body,
  Query,
  Controller,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/media.dto';
import { HttpResponse } from '../../utils';
import { FileInterceptor } from '@nestjs/platform-express';
import File from '@nestjs/common';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createNewMedia(
    @UploadedFile() file: File,
    @Body() CreateMediaDto: CreateMediaDto,
  ) {
    const fileInfo = await this.mediaService.savedMediaFile(file);
    if (!fileInfo) {
    }

    const data = {
      ...CreateMediaDto,
      url: fileInfo.path,
      type: fileInfo.type,
    };

    const createMedia = await this.mediaService.createNewMedia(data);

    return HttpResponse.success({
      message: 'Media created successfully',
      data: createMedia,
    });
  }
}
