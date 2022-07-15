import { ApiProperty } from '@nestjs/swagger';

export class ReturnSwagger {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;

  @ApiProperty()
  releaseYear: number;

  @ApiProperty()
  duration: string;

  @ApiProperty()
  sinopse: string;

  @ApiProperty()
  genres: Array<string>;
}
