import { IsString } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  email: string;
}
