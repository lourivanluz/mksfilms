import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RequestBodyDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  releaseYear: number;

  @IsNotEmpty()
  @ApiProperty()
  duration: string;

  @IsNotEmpty()
  @ApiProperty()
  sinopse: string;

  @IsNotEmpty()
  @ApiProperty()
  genres: Array<string>;
}

export class UpdateBodyDto {
  @ApiPropertyOptional()
  title?: string;

  @IsNumber()
  @ApiPropertyOptional()
  releaseYear?: number;

  @ApiPropertyOptional()
  duration?: string;

  @ApiPropertyOptional()
  sinopse?: string;

  @ApiPropertyOptional()
  genres?: Array<string>;
}

export class ResponseBodyDto {
  id: string;
  title: string;
  releaseYear: number;
  duration: string;
  sinopse: string;
  genres: Array<string>;
}
