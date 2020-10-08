import { IsEmail, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsEmail()
  email: string;
}
