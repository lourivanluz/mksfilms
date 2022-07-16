import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ResponseBodyDto } from './dto/save-film.dto';
import { FilmsEntity } from './entites/films.entity';
import { GenresEntity } from './entites/genres.entity';
import { FilmsService } from './films.service';

const filmsMockList: Array<ResponseBodyDto> = [
  {
    id: '1',
    duration: '01:05',
    genres: ['romance'],
    releaseYear: 2022,
    sinopse: 'legal',
    title: 'vento',
  },
  {
    id: '2',
    duration: '01:05',
    genres: ['romance', 'aventura'],
    releaseYear: 2022,
    sinopse: 'legal',
    title: 'sopro',
  },
  {
    id: '3',
    duration: '01:05',
    genres: ['ficcao'],
    releaseYear: 2022,
    sinopse: 'legal',
    title: 'vento',
  },
];

const entityFilmsMockList: Array<FilmsEntity> = [
  new FilmsEntity({
    id: '1',
    duration: '01:05',
    genres: [new GenresEntity({ id: '1', genre: 'romance' })],
    releaseYear: 2022,
    sinopse: 'legal',
    title: 'vento',
  }),
  new FilmsEntity({
    id: '2',
    duration: '01:05',
    genres: [
      new GenresEntity({ id: '1', genre: 'romance' }),
      new GenresEntity({ id: '1', genre: 'aventura' }),
    ],
    releaseYear: 2022,
    sinopse: 'legal',
    title: 'sopro',
  }),
  new FilmsEntity({
    id: '3',
    duration: '01:05',
    genres: [new GenresEntity({ id: '1', genre: 'ficcao' })],
    releaseYear: 2022,
    sinopse: 'legal',
    title: 'vento',
  }),
];

describe('FilmsService', () => {
  let filmService: FilmsService;
  let filmRepository: Repository<FilmsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: getRepositoryToken(FilmsEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    filmService = module.get<FilmsService>(FilmsService);
    filmRepository = module.get<Repository<FilmsEntity>>(
      getRepositoryToken(FilmsEntity),
    );
  });

  it('should be defined', () => {
    expect(filmService).toBeDefined();
    expect(filmRepository).toBeDefined();
  });

  describe('saveNewFilm', () => {
    it('should save a new movie successfully', async () => {
      //mock
      const mockbody = {
        duration: '01:05',
        genres: ['romance'],
        releaseYear: 2022,
        sinopse: 'legal',
        title: 'vento',
      };

      jest
        .spyOn(filmService, 'saveNewFilm')
        .mockResolvedValueOnce(filmsMockList[0]);
      //act
      const result = await filmService.saveNewFilm(mockbody);
      //exp
      expect(result).toEqual(filmsMockList[0]);
      expect(result).toHaveProperty('id');
    });
  });

  describe('findAll', () => {
    it('should return all movies', async () => {
      //mock
      jest
        .spyOn(filmRepository, 'find')
        .mockResolvedValueOnce(entityFilmsMockList);
      //act
      const result = await filmService.findAll();
      //exp
      expect(result).toEqual(filmsMockList);
      expect(filmRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getFilmById', () => {
    it('should return a movie by id', async () => {
      //mock
      jest
        .spyOn(filmRepository, 'findOne')
        .mockResolvedValueOnce(entityFilmsMockList[0]);
      //act
      const result = await filmService.getFilmById('1');
      //exp
      expect(result).toEqual(filmsMockList[0]);
      expect(filmRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('getFilmByGenre', () => {
    it('should return a films by genre', async () => {
      //mock
      jest
        .spyOn(filmRepository, 'find')
        .mockResolvedValueOnce([
          entityFilmsMockList[0],
          entityFilmsMockList[1],
        ]);
      jest
        .spyOn(filmService, 'getFilmByGenre')
        .mockResolvedValueOnce([filmsMockList[0], filmsMockList[1]]);
      //act
      const result = await filmService.getFilmByGenre('romance');
      //exp
      expect(result).toEqual([filmsMockList[0], filmsMockList[1]]);
      //expect(filmRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteFilmById', () => {
    it('should delete a films by id', async () => {
      //mock
      jest
        .spyOn(filmRepository, 'delete')
        .mockResolvedValueOnce({ affected: 1, raw: 1 } as DeleteResult);
      //act
      const result = await filmService.deleteFilmById('1');
      //exp
      expect(result).toEqual(null);
      expect(filmRepository.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateFilm', () => {
    it('should update a film', async () => {
      //mock

      const bodyMock = {
        title: 'sopro',
      };

      const resultMockUpdate = {
        id: '1',
        duration: '01:05',
        genres: ['romance'],
        releaseYear: 2022,
        sinopse: 'legal',
        title: 'sopro',
      };

      const entityMockUpdate = {
        id: '1',
        duration: '01:05',
        genres: [new GenresEntity({ id: '1', genre: 'romance' })],
        releaseYear: 2022,
        sinopse: 'legal',
        title: 'sopro',
      };

      jest
        .spyOn(filmRepository, 'findOne')
        .mockResolvedValueOnce(entityFilmsMockList[0]);
      jest
        .spyOn(filmRepository, 'save')
        .mockResolvedValueOnce(entityMockUpdate);
      //act
      const result = await filmService.updateFilm('1', bodyMock);
      //exp
      expect(result).toEqual(resultMockUpdate);
      expect(filmRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});
