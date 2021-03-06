import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestBodyDto, ResponseBodyDto } from './dto/save-film.dto';
import { FilmsEntity } from './entites/films.entity';
import { GenresEntity } from './entites/genres.entity';
import { findOrCreateGenre } from './utils/func.utils';

export interface IUptadeFilm {
  title?: string;
  releaseYear?: number;
  duration?: string;
  sinopse?: string;
  genres?: Array<string> | Array<GenresEntity>;
}

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(FilmsEntity)
    private readonly filmRepo: Repository<FilmsEntity>,
  ) {}

  saveNewFilm = async (data: RequestBodyDto): Promise<ResponseBodyDto> => {
    const genres = await findOrCreateGenre(data.genres);

    const newfilm = await this.filmRepo.save(
      this.filmRepo.create({ ...data, genres: [...genres] }),
    );

    return this.serializerFilms(newfilm);
  };

  findAll = async (): Promise<Array<ResponseBodyDto>> => {
    const result = await this.filmRepo.find({ relations: ['genres'] });
    const serialized = result.map((film) => this.serializerFilms(film));
    return serialized;
  };

  getFilmById = async (id: string): Promise<ResponseBodyDto> => {
    const result = await this.filmRepo.findOne({
      where: { id: id },
      relations: ['genres'],
    });

    if (!result) {
      throw new HttpException('Film ID not found', HttpStatus.NOT_FOUND);
    }

    return this.serializerFilms(result);
  };

  getFilmByGenre = async (genre: string): Promise<Array<ResponseBodyDto>> => {
    const filmsGenre = await this.filmRepo
      .createQueryBuilder('films')
      .select('films.id')
      .innerJoin('films.genres', 'genres')
      .where('genres.genre = :genre', { genre: genre })
      .getMany();

    const result = await Promise.all(
      filmsGenre.map(async ({ id }) => {
        const gen = await this.filmRepo.findOne({
          where: { id: id },
          relations: ['genres'],
        });
        return gen;
      }),
    );

    return result.map((film) => this.serializerFilms(film));
  };

  deleteFilmById = async (id: string): Promise<null> => {
    const result = await this.filmRepo.delete({ id: id });
    if (!result) {
      throw new HttpException('Film ID not found', HttpStatus.NOT_FOUND);
    }
    return null;
  };

  updateFilm = async (
    id: string,
    data: IUptadeFilm,
  ): Promise<ResponseBodyDto> => {
    const filmFiltred = await this.filmRepo.findOne({
      where: { id: id },
      relations: ['genres'],
    });

    if (!filmFiltred) {
      throw new HttpException('Film ID not found', HttpStatus.NOT_FOUND);
    }

    if (data.genres) {
      data.genres = await findOrCreateGenre(data.genres as Array<string>);
    }

    const newFilm = await this.filmRepo.save({
      ...filmFiltred,
      ...(data as FilmsEntity),
    });
    return this.serializerFilms(newFilm);
  };

  serializerFilms = (film: FilmsEntity) => {
    return { ...film, genres: film.genres.map((genre) => genre.genre) };
  };
}
