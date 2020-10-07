import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() body: UserCreateDto): Promise<any> {
    return await this.userService.createUser(body);
  }

  @Get()
  async getUser(): Promise<any> {
    const data = await this.userService.getUser();

    return {
      success: true,
      data: data,
    };
  }
}
