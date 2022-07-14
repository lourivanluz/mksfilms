import { Test, TestingModule } from '@nestjs/testing';
import { RequestBodyDto, ResponseBodyDto } from './dto/save-film.dto';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let filmcontroller: FilmsController;
  let filmservice: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    filmcontroller = module.get<FilmsController>(FilmsController);
    filmservice = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(filmcontroller).toBeDefined();
    expect(filmservice).toBeDefined();
  });

  describe('save', () => {
    it('must save the movie in the database', async () => {
      const body: RequestBodyDto = {
        title: 'O Vento Levou',
        releaseYear: 1997,
        duration: '03:45',
        sinopse: 'nao sei como foi',
        genres: ['romance'],
      };

      const mockDataSave = {
        ...body,
      } as ResponseBodyDto;

      jest.spyOn(filmservice, 'save').mockResolvedValueOnce(mockDataSave);

      //act
      const result = filmcontroller.save(body);
      //expc
      expect(result).toBeDefined();
      expect(filmservice.save).toBeCalledTimes(1);
    });
  });
});
