import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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
  @IsOptional()
  title?: string;

  @IsNumber()
  @ApiPropertyOptional()
  @IsOptional()
  releaseYear?: number;

  @ApiPropertyOptional()
  @IsOptional()
  duration?: string;

  @ApiPropertyOptional()
  @IsOptional()
  sinopse?: string;

  @ApiPropertyOptional()
  @IsOptional()
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
