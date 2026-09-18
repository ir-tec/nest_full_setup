import { Body, Controller, Get, Param, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { AuthenticatedUser } from '../auth/types/authenticated-user';
@Controller({ path: "users", version: "1" })
export class UsersController {
    constructor(private readonly userService: UsersService) { }


    @Get()
    getUsers() {
        return this.userService.getAll()
    }
    @Get('me')
    @UseGuards(JwtAuthGuard)
    getCurrentUser(@CurrentUser() user: AuthenticatedUser | undefined) {
        if (!user) throw new UnauthorizedException()

        return this.userService.findById(user.id);

    }
    @Get(":id")
    getUserById(@Param() id: string) {
        return { name: id }
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

}
