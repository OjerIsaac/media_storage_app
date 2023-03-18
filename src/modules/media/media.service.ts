import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMediaDto } from './dto/media.dto';
import { Media } from './entities';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
        private mediaRepository: Repository<Media>
  ) {}

  async createNewMedia(data: CreateMediaDto) {
    // const { name } = data;

    // const existingLogistic = await this.logisticsRepo.getExisting(name, email, phone);
    // if (existingLogistic) {
    //   ErrorHelper.ConflictException(
    //     'Logistics Partner already exists with specified name, email or phone'
    //   );
    // }

    const createdMedia = this.mediaRepository.create({
      type: data.type,
      name: data.name,
      description: data.description,
      url: data.url,
      status: data.status
    });

    const media = await this.mediaRepository.save(createdMedia);

    return createdMedia;
  }

}