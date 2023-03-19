import {
  Body,
  Query,
  Controller,
  Patch,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/media.dto';
import { HttpResponse } from '../../utils';
import { FileInterceptor } from '@nestjs/platform-express';
import File from '@nestjs/common';
import { PaginationDto } from '../../queries';

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

  @Get()
  async getMedia(
    @Query() paginationDto: PaginationDto
  ) {
    const data = await this.mediaService.getMedia(paginationDto);

    return HttpResponse.success({
      data,
      message: 'Media fetched successfully',
    });
  }
}
