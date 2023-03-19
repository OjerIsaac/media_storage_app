import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './entities';
import { ErrorHelper } from '../../utils';
import * as fs from 'fs';
import * as path from 'path';
import { PaginationDto, PaginationMetadataDto, PaginationResultDto } from '../../queries';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) {}

  async createNewMedia(data) {
    const { name, description, status, url, type } = data;

    const existingMedia = await this.mediaRepository.findOne({
      where: {
        name: name,
      },
    });

    if (existingMedia) {
      ErrorHelper.ConflictException('Media already exists with specified name');
    }

    const createdMedia = this.mediaRepository.create({
      name,
      description,
      status,
      url,
      type,
    });

    await this.mediaRepository.save(createdMedia);

    return createdMedia;
  }

  async savedMediaFile(file): Promise<{ path: string; type: string }> {
    const allowedTypes = ['audio/mp3', 'image/jpeg', 'image/png'];

    if (!allowedTypes.includes(file.mimetype)) {
      ErrorHelper.ConflictException('Invalid file type');
    }

    const type = file.mimetype.startsWith('image') ? 'image' : 'audio';
    const fileName = `${type}_${new Date().getTime()}${path.extname(
      file.originalname,
    )}`;
    const uploadFolder = path.join(process.cwd(), 'uploads');
    const uploadPath = path.join(uploadFolder, fileName);

    await fs.promises.mkdir(uploadFolder, { recursive: true });
    await fs.promises.writeFile(uploadPath, file.buffer);

    return {
      path: uploadPath,
      type,
    };
  }

  async getMedia(paginationDto: PaginationDto) {

    const [media, count] = await this.mediaRepository.findAndCount({
      skip: paginationDto.skip,
      take: paginationDto.limit,
    });

    const result = media.map(x => ({
      id: x.id,
      type: x.type,
      name: x.name,
      description: x.description,
      url: x.url,
      status: x.status,
    }));

    const pageMetaDto = new PaginationMetadataDto({
      itemCount: count,
      pageOptionsDto: paginationDto,
    });

    return new PaginationResultDto(result, pageMetaDto);
  }

  async getSingleMedia(mediaId: string) {

    const media = await this.mediaRepository.findOne({
      where: { id: mediaId }
    });

    if (!media) {
      ErrorHelper.NotFoundException('Media not found');
    }

    return {
      id: media.id,
      type: media.type,
      name: media.name,
      description: media.description,
      url: media.url,
      status: media.status,
    };
  }
}
