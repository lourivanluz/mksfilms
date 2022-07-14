import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestBodyDto } from './dto/save-film.dto';
import { FilmsEntity } from './entites/films.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(FilmsEntity)
    private readonly filmRepo: Repository<FilmsEntity>,
  ) {}

  save = async (data: RequestBodyDto): Promise<RequestBodyDto> => {
    const { genres, ...filmFiltred } = data;
    const result = await this.filmRepo.save(this.filmRepo.create(data));

    return { ...result, genres: ['a'] };
  };
}
