import { IsNotEmpty, IsNumber } from 'class-validator';

export class RequestBodyDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  releaseYear: number;

  @IsNotEmpty()
  duration: string;

  @IsNotEmpty()
  sinopse: string;

  @IsNotEmpty()
  genre: string;
}

export class ResponseBodyDto {
  id: string;
  title: string;
  releaseYear: number;
  duration: string;
  sinopse: string;
  genre: string;
}
