import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
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

  @Get(':id')
  async getByID(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const user = await this.userService.getById(id);

    return {
      success: true,
      data: user,
    };
  }

  @Patch(':id')
  async updatedUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UserUpdateDto,
  ): Promise<any> {
    return await this.userService.updatedUser(id, body);
  }
}
