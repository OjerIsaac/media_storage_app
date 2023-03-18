import { Controller, Post, Body } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { HttpResponse } from '../../lib/utils';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  async createMedia(@Body() body: CreateMediaDto) {
    const data = await this.mediaService.create(body);

    return HttpResponse.success({
      data,
      message: 'successfully',
    });
  }
}
