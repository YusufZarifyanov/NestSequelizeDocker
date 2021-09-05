import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Roles } from '../roles/roles-auth.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
        constructor(private userService: UsersService) {}
        @ApiOperation({ summary: 'Создание пользователя' })
        @ApiResponse({ status: 200, type: User })
        @Post()
        create(@Body() userDto: CreateUserDto) {
                return this.userService.createUser(userDto);
        }

        @ApiOperation({ summary: 'Вывод пользователей' })
        @ApiResponse({ status: 200, type: [User] })
        @Roles('ADMIN')
        @UseGuards(RolesGuard)
        @Get()
        getAll() {
                return this.userService.getAllUsers();
        }

        @ApiOperation({ summary: 'Выдача ролей' })
        @ApiResponse({ status: 200 })
        @Roles('ADMIN')
        @UseGuards(RolesGuard)
        @Post('/role')
        addRole(@Body() dto: AddRoleDto) {
                return this.userService.addRole(dto);
        }

        @ApiOperation({ summary: 'Бан пользователей' })
        @ApiResponse({ status: 200 })
        @Roles('ADMIN')
        @UseGuards(RolesGuard)
        @Post('/ban')
        banUsers(@Body() dto: BanUserDto) {
                return this.userService.banUser(dto);
        }

        @Get('/redis')
        hello () {
                return this.userService.hello()
        }
}
