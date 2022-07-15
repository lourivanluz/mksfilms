import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestBodyDto, UpdateBodyDto } from './dto/save-film.dto';
import { FilmsService } from './films.service';
import { BadRequestSwagger } from './swagger/returnBadRequest.swagger';
import { ReturnSwagger } from './swagger/returnCreate.swagger';
import { NotFoundSwagger } from './swagger/returnNotfound.swagger';

@Controller('api/v1/films')
@ApiTags('Films routes')
export class FilmsController {
  constructor(private readonly filmservice: FilmsService) {}
  @Post()
  @ApiOperation({ summary: 'Register a new movie in the database' })
  @ApiResponse({
    status: 201,
    description: 'Film successfully registered',
    type: ReturnSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Error in request fields',
    type: BadRequestSwagger,
  })
  async save(@Body() body: RequestBodyDto) {
    return this.filmservice.save(body);
  }

  @Get()
  @ApiOperation({ summary: 'Returns all movies registered in the database' })
  @ApiResponse({
    status: 200,
    description: 'List of films returned successfully',
    type: ReturnSwagger,
    isArray: true,
  })
  async getfilms() {
    return this.filmservice.findAll();
  }

  @Get('/genre/:genre')
  @ApiOperation({
    summary:
      'Filters all movies that have as genre the value passed as a parameter',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully filtered movie list',
    type: ReturnSwagger,
    isArray: true,
  })
  async getfilmsByGenre(@Param('genre') genre: string) {
    return this.filmservice.getFilmByGenre(genre);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search and return the movie by id' })
  @ApiResponse({
    status: 200,
    description: 'Movie successfully returned',
    type: ReturnSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Movie id not found',
    type: NotFoundSwagger,
  })
  async getfilmsById(@Param('id') id: string) {
    return this.filmservice.getFilmById(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Updates the movie corresponding to the id passed as a parameter',
  })
  @ApiResponse({
    status: 200,
    description: 'movie successfully updated',
    type: ReturnSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Movie id not found',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Error in request fields',
    type: BadRequestSwagger,
  })
  async updateFim(@Param('id') id: string, @Body() body: UpdateBodyDto) {
    return this.filmservice.updateFilm(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes the movie that matches the id passed as a parameter',
  })
  @ApiResponse({
    status: 200,
    description: 'movie successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Movie id not found',
    type: NotFoundSwagger,
  })
  async deleteFilm(@Param('id') id: string) {
    return this.filmservice.deleteFilmById(id);
  }
}
