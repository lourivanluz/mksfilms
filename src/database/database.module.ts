import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsEntity } from 'src/app/films/entites/films.entity';
import { GenresEntity } from 'src/app/films/entites/genres.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: [FilmsEntity, GenresEntity],
      //__dirname + '/**/*.entity{.js,.ts}'
    }),
  ],
})
export class DatabaseModule {}
