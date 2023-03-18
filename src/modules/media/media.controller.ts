import { Body, Query, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/media.dto';
import { HttpResponse } from '../../utils';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  async createNewMedia(@Body() CreateMediaDto: CreateMediaDto) {
    const data = await this.mediaService.createNewMedia(CreateMediaDto);

    // return HttpResponse.success({ data, message: 'Media created successfully' });
  }
}