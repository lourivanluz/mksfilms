import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestBodyDto, ResponseBodyDto } from './dto/save-film.dto';
import { FilmsEntity } from './entites/films.entity';

export interface IUptadeFilm {
  title?: string;
  releaseYear?: number;
  duration?: string;
  sinopse?: string;
  genre?: string;
}

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(FilmsEntity)
    private readonly filmRepo: Repository<FilmsEntity>,
  ) {}

  save = async (data: RequestBodyDto): Promise<ResponseBodyDto> => {
    return await this.filmRepo.save(this.filmRepo.create(data));
  };

  findAll = async () => {
    return await this.filmRepo.find();
  };

  getFilmById = async (id: string) => {
    const [result] = await this.filmRepo.find({ id: id });
    return result;
  };

  getFilmByGenre = async (genre) => {
    return await this.filmRepo.find({ genre: genre });
  };

  deleteFilmById = async (id: string) => {
    await this.filmRepo.delete({ id: id });
    return null;
  };

  updateFilm = async (id: string, data: IUptadeFilm) => {
    await this.filmRepo
      .createQueryBuilder()
      .update(FilmsEntity)
      .set({ ...data })
      .where('id = :id', { id: id })
      .execute();

    return this.filmRepo.findOne({ id: id });
  };
}
