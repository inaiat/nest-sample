import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user/user.domain';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() user: User) {
    await this.userService.create(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
