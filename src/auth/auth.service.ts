import { BadRequestException, Injectable } from '@nestjs/common';
import { ILogin } from 'src/common/interface/login.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(body: ILogin): Promise<any> {
    const { username, password } = body;
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new Error(`not found username.`);
    }

    const checkpass = await this.userService.compareHash(
      password,
      user.password,
    );

    if (checkpass === false) {
      throw new Error(`wrong password.`);
    }

    if (user.username === username && checkpass === true) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(body: ILogin): Promise<any> {
    try {
      const user = await this.validateUser(body);

      return {
        success: true,
        message: 'login success.',
      };
    } catch (error) {
      console.log('error message ::', error.message);
      throw new BadRequestException({
        success: false,
        message: error.message,
      });
    }
  }
}
