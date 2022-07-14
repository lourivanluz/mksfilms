import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsEntity } from './entites/films.entity';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FilmsEntity])],
  providers: [FilmsService],
  controllers: [FilmsController],
})
export class FilmsModule {}
