import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { MediaModule } from './modules/media/media.module';

@Module({
  imports: [DatabaseModule, MediaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
