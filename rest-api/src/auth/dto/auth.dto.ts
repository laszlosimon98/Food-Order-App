import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDTO {
  @IsString()
  @ApiProperty()
  full_name: string;

  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  password: string;
}
