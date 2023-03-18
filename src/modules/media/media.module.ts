import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../typeorm-extension';
import { MediaRepository } from './media.repository';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([MediaRepository]),
    TypeOrmModule.forFeature([]),
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
