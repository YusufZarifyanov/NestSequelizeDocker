import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Client, ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
        @Client({
                transport: Transport.REDIS,
                options: {
                        url: 'redis://localhost:6379',
                },
        })
        private client: ClientProxy;

        constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {}

        public async accumulate(data: number[]) {
                console.log('dsjgksdjg');
                await this.client.connect();
                // return this.client.send<number, number[]>('add', data);
        }

        async createUser(dto: CreateUserDto) {
                const user = await this.userRepository.create(dto);
                const role = await this.roleService.getRoleByValue('USER');
                await user.$set('roles', [role.id]);
                user.roles = [role];
                return user;
        }

        async getAllUsers() {
                const users = await this.userRepository.findAll({ include: { all: true } });

                return users;
        }

        async getUserByEmail(email: string) {
                const user = await this.userRepository.findOne({
                        where: { email },
                        include: { all: true },
                });
                return user;
        }

        async addRole(dto: AddRoleDto) {
                const user = await this.userRepository.findByPk(dto.userId);
                const role = await this.roleService.getRoleByValue(dto.value);
                if (role && user) {
                        await user.$add('role', role.id);
                        return dto;
                }
                throw new HttpException('???????????????????????? ?????? ???????? ???? ??????????????', HttpStatus.NOT_FOUND);
        }

        async banUser(dto: BanUserDto) {
                const user = await this.userRepository.findByPk(dto.userId);
                if (!user) throw new HttpException('???????????????????????? ???? ????????????', HttpStatus.NOT_FOUND);

                user.banned = true;
                user.banReason = dto.banReason;
                await user.save();
                return user;
        }

        async hello() {
                return {
                        a: 1,
                        b: 2,
                };
        }
}
