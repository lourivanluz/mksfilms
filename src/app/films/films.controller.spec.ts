import { Test, TestingModule } from '@nestjs/testing';
import { FilmsEntity } from './entites/films.entity';
import { GenresEntity } from './entites/genres.entity';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

const filmsMockList: Array<FilmsEntity> = [
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

describe('FilmsController', () => {
  let filmController: FilmsController;
  let filmService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            saveNewFilm: jest.fn(),
            findAll: jest.fn(),
            getFilmByGenre: jest.fn(),
            getFilmById: jest.fn(),
            updateFilm: jest.fn(),
            deleteFilmById: jest.fn(),
          },
        },
      ],
    }).compile();

    filmController = module.get<FilmsController>(FilmsController);
    filmService = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(filmController).toBeDefined();
    expect(filmService).toBeDefined();
  });

  describe('saveNewFilm', () => {
    it('movie saved successfully', async () => {
      //mock
      const filmMock = {
        title: 'carros 13',
        releaseYear: 2020,
        duration: '03:45',
        sinopse: 'nao sei como foi',
        genres: ['eletronico', 'aventura'],
      };
      const filmMockSaved = {
        ...filmMock,
        id: '548d6092-160c-4c47-a6f8-d587ed5d3622',
      };
      jest
        .spyOn(filmService, 'saveNewFilm')
        .mockResolvedValueOnce(filmMockSaved);
      //action
      const result = await filmController.save(filmMock);
      //expec
      expect(result).toHaveProperty('id');
    });

    it('should throw an exception', () => {
      const filmMock = {
        title: 'carros 13',
        releaseYear: 2020,
        duration: '03:45',
        sinopse: 'nao sei como foi',
        genres: ['eletronico', 'aventura'],
      };
      jest.spyOn(filmService, 'saveNewFilm').mockRejectedValueOnce(new Error());

      expect(filmController.save(filmMock)).rejects.toThrowError();
    });
  });

  describe('getfilms', () => {
    it('returns a list of films successfully', async () => {
      //mock
      jest
        .spyOn(filmService, 'findAll')
        .mockResolvedValueOnce(filmsMockList as any);
      //act
      const result = await filmController.getfilms();
      //expec
      expect(result).toEqual(filmsMockList);
    });
  });

  describe('getfilmsByGenre', () => {
    it('returns a list of films filtered by genre', async () => {
      //mock
      jest
        .spyOn(filmService, 'getFilmByGenre')
        .mockResolvedValueOnce(filmsMockList[0] as any);
      //act
      const result = await filmController.getfilmsByGenre('romance');
      //expec
      expect(result).toEqual(filmsMockList[0]);
      expect(filmService.getFilmByGenre).toBeCalledTimes(1);
      expect(filmService.getFilmByGenre).toBeCalledWith('romance');
    });
  });

  describe('getFilmById', () => {
    it('return the movie by id', async () => {
      //mock
      jest
        .spyOn(filmService, 'getFilmById')
        .mockResolvedValueOnce(filmsMockList[2] as any);
      //act
      const result = await filmController.getfilmsById('3');
      //expec
      expect(result).toEqual(filmsMockList[2]);
      expect(filmService.getFilmById).toBeCalledTimes(1);
      expect(filmService.getFilmById).toBeCalledWith('3');
    });
  });

  describe('updateFilm', () => {
    it('update the movie by id', async () => {
      //mock
      const bodyMock = {
        id: '3',
        duration: '01:05',
        genres: ['ficcao'],
        releaseYear: 2022,
        sinopse: 'legal',
        title: 'vento',
      };

      jest.spyOn(filmService, 'updateFilm').mockResolvedValueOnce(bodyMock);
      //act
      const result = await filmController.updateFilm('3', { sinopse: 'legal' });
      //expec
      expect(result).toEqual(bodyMock);
      expect(filmService.updateFilm).toBeCalledTimes(1);
      expect(filmService.updateFilm).toBeCalledWith('3', { sinopse: 'legal' });
    });
  });

  describe('deleteFilm', () => {
    it('delete a movie by id', async () => {
      jest.spyOn(filmService, 'deleteFilmById').mockResolvedValueOnce(null);
      //act
      const result = await filmController.deleteFilm('3');
      //expec
      expect(result).toEqual(null);
      expect(filmService.deleteFilmById).toBeCalledTimes(1);
      expect(filmService.deleteFilmById).toBeCalledWith('3');
    });
  });
});
