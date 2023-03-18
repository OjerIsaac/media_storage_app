import { Injectable } from '@nestjs/common';
import { MediaRepository } from './media.repository';
import { CreateMediaDto } from './dto/create-media.dto';
import { ErrorHelper } from '../../lib/utils';

@Injectable()
export class MediaService {
  constructor(
    private mediaRepo: MediaRepository,
  ) {}

  async create(data: CreateMediaDto) {

    const { name } = data;

    const existingMedia = await this.mediaRepo.getExisting(name);
    if (existingMedia) {
      ErrorHelper.ConflictException(
        'Media already exists with specified name'
      );
    }

    const createMedia = this.mediaRepo.create({
      type: data.type,
      name,
      description: data.description,
      url: data.url,
      status: data.status
    });

    const media = await this.mediaRepo.save(createMedia);

    return media;
  }

}