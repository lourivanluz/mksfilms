import { ApiProperty } from '@nestjs/swagger';

export class BadRequestSwagger {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: Array<string>;
  @ApiProperty()
  error: string;
}
