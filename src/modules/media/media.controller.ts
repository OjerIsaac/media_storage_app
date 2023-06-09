import {
  Body,
  Query,
  Controller,
  Patch,
  Post,
  Get,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/media.dto';
import { HttpResponse } from '../../utils';
import { FileInterceptor } from '@nestjs/platform-express';
import File from '@nestjs/common';
import { PaginationDto } from '../../queries';
import { UpdateMediaDto } from './dto/update-media.dto';

//TODO: Handle exceptions
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
  async getMedia(@Query() paginationDto: PaginationDto) {
    const data = await this.mediaService.getMedia(paginationDto);

    return HttpResponse.success({
      data,
      message: 'Media fetched successfully',
    });
  }

  @Get(':id')
  async getSingleMedia(@Param('mediaId') mediaId: string) {
    const data = await this.mediaService.getSingleMedia(mediaId);

    return HttpResponse.success({
      data,
      message: 'Media fetched successfully',
    });
  }

  @Get('search')
  async searchMedia(@Query('query') query: string) {
    const data = await this.mediaService.searchMedia(query);
    console.log(data);

    return HttpResponse.success({
      data,
      message: 'Media fetched successfully',
    });
  }

  @Patch(':id')
  async updateMedia(
    @Param('mediaId') mediaId: string,
    @Body() body: UpdateMediaDto,
  ) {
    const data = await this.mediaService.updateMedia(mediaId, body);

    return HttpResponse.success({
      data,
      message: 'Media updated successfully',
    });
  }

  @Delete(':id')
  async deleteMedia(@Param('id') mediaId: string) {
    console.log(mediaId)
    await this.mediaService.deleteMedia(mediaId);

    return HttpResponse.success({
      data: [],
      message: 'Media deleted successfully',
    });
  }
}
