import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
// import { UserModule } from './modules/user/user.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
