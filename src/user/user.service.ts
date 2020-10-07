import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { promises } from 'dns';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UserService {
  private saltRounds = 10;
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  async getHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  async createUser(body: UserCreateDto): Promise<any> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let err = '';
    const { username, email, password } = body;

    const _user = new User();
    _user.username = username;
    _user.password = await this.getHash(password);
    _user.email = email;
    const UserData = await queryRunner.manager.save(_user);

    try {
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log('error message ::', error.message);
      await queryRunner.rollbackTransaction();
      err = error.message;
    } finally {
      await queryRunner.release();
      if (err)
        throw new BadRequestException({
          success: false,
          message: err,
        });
      return {
        success: true,
        message: 'เพิ่ม ผู้ใช้ใหม่สำเร็จ',
      };
    }
  }

  async getUser(): Promise<User | User[]> {
    try {
      const data = await this.userRepository.find({
        select: ['id', 'username', 'email'],
      });

      return data;
    } catch (error) {
      console.log('error message ::', error.message);
      throw new NotFoundException({
        success: false,
        message: error.message,
      });
    }
  }

  async updatedUser(id: number, body: UserUpdateDto): Promise<User> {
    try {
      const { email } = body;

      const findUser = await this.userRepository.findOne({
        where: { id: id },
      });

      if (!findUser) throw new Error('not found user.');

      return;
    } catch (error) {
      console.log('error message ::', error.message);
      throw new BadRequestException({
        success: false,
        message: error.message,
      });
    }
  }
}
