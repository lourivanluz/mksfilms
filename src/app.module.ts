import { Module } from '@nestjs/common';
import { FilmsModule } from './app/films/films.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, FilmsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
