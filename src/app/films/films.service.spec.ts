import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    it('must save the movie in the database', async () => {
      interface result {
        title: string;
        releaseYear: number;
        duration: string;
        sinopse: string;
        genres: Array<string>;
      }

      //mock
      const data: result = {
        title: 'O Vento Levou',
        releaseYear: 1997,
        duration: '03:45',
        sinopse: 'nao sei como foi',
        genres: ['romance'],
      };
      //jest.spyOn(filmrepo, 'save').mockResolvedValueOnce(data);
      //act
      const result = await filmService.save(data);
      //expc
      expect(result).toBeDefined();
      expect(filmrepo.create).toBeCalledTimes(1);
      expect(filmrepo.save).toBeCalledTimes(1);
    });
  });
});
