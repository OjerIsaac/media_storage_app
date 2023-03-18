import { Repository } from 'typeorm';
import { CustomRepository } from '../../typeorm-extension';
import { MediaStorage } from './entities';

@CustomRepository(MediaStorage)
export class MediaRepository extends Repository<MediaStorage> {
  async getExisting(name: string) {
    return this.createQueryBuilder('media')
      .where('LOWER(media.name) = LOWER(:name)', {
        name,
      })
      .getOne();
  }
}
