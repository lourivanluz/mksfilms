import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FilmsEntity } from './entites/films.entity';
import { FilmsService } from './films.service';

describe('FilmsService', () => {
  let filmService: FilmsService;

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
  });

  it('should be defined', () => {
    expect(filmService).toBeDefined();
  });
});
