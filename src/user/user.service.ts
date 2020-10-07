import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entity/users.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {
  private saltRounds = 10;
  constructor(
    @InjectRepository(Users) private userRepository: UsersRepository,
  ) {}

  async findOne(username: string): Promise<undefined> {
    return;
  }

  async createUser(body: UserCreateDto): Promise<any> {
    try {
      const { username, email, password } = body;

      return body;
    } catch (error) {
      console.log('error message ::', error.message);
      throw new BadRequestException({
        success: false,
        message: error.message,
      });
    }
  }
}
