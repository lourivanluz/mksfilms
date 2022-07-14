import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RequestBodyDto } from './dto/save-film.dto';
import { FilmsService, IUptadeFilm } from './films.service';

@Controller('api/v1/films')
export class FilmsController {
  constructor(private readonly filmservice: FilmsService) {}
  @Post()
  async save(@Body() body: RequestBodyDto) {
    return this.filmservice.save(body);
  }

  @Get()
  async getfilms() {
    return this.filmservice.findAll();
  }

  @Get('/genre/:genre')
  async getfilmsByGenre(@Param('genre') genre: string) {
    return this.filmservice.getFilmByGenre(genre);
  }

  @Get(':id')
  async getfilmsById(@Param('id') id: string) {
    return this.filmservice.getFilmById(id);
  }

  @Patch(':id')
  async updateFim(@Param('id') id: string, @Body() body: IUptadeFilm) {
    return this.filmservice.updateFilm(id, body);
  }

  @Delete(':id')
  async deleteFilm(@Param('id') id: string) {
    return this.filmservice.deleteFilmById(id);
  }
}
