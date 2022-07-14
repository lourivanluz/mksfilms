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
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: [FilmsEntity, GenresEntity],
      //__dirname + '/**/*.entity{.js,.ts}'
    }),
  ],
})
export class DatabaseModule {}
