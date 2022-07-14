import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestBodyDto, ResponseBodyDto } from './dto/save-film.dto';
import { FilmsEntity } from './entites/films.entity';
import { FilmsService } from './films.service';

describe('FilmsService', () => {
  let filmService: FilmsService;
  let filmrepo: Repository<FilmsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: getRepositoryToken(FilmsEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    filmService = module.get<FilmsService>(FilmsService);
    filmrepo = module.get<Repository<FilmsEntity>>(
      getRepositoryToken(FilmsEntity),
    );
  });

  it('should be defined', () => {
    expect(filmService).toBeDefined();
    expect(filmrepo).toBeDefined();
  });

  describe('save', () => {
    it('must save the movie in the database', () => {
      //mock
      const data: RequestBodyDto = {
        title: 'O Vento Levou',
        releaseYear: 1997,
        duration: '03:45',
        sinopse: 'nao sei como foi',
        genres: ['romance'],
      };

      const mockDataSave = {
        ...data,
      } as ResponseBodyDto;

      jest.spyOn(filmrepo, 'create').mockReturnValueOnce(mockDataSave);
      jest.spyOn(filmrepo, 'save').mockResolvedValueOnce(mockDataSave);

      //act
      const result = filmService.save(data);
      //expc
      expect(result).toBeDefined();
      expect(filmrepo.create).toBeCalledTimes(1);
      expect(filmrepo.save).toBeCalledTimes(1);
    });
  });
});
