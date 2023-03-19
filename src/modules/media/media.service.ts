import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './entities';
import { ErrorHelper } from 'src/utils';
import * as fs from 'fs';
import * as path from 'path';

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
}
