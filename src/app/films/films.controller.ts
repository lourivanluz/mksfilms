import { Body, Controller, Post } from '@nestjs/common';
import { RequestBodyDto } from './dto/save-film.dto';
import { FilmsService } from './films.service';

@Controller('api/v1/films')
export class FilmsController {
  constructor(private readonly filmservice: FilmsService) {}
  @Post()
  async save(@Body() body: RequestBodyDto) {
    return this.filmservice.save(body);
  }
}
