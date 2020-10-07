import { BadRequestException, Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';

export type User = any;

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(body: UserCreateDto): Promise<any> {
    try {
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
