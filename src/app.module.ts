import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
@Module({
        controllers: [],
        providers: [],
        imports: [
                ConfigModule.forRoot({
                        envFilePath: `.env`,
                }),
                SequelizeModule.forRoot({
                        dialect: 'postgres',
                        host: process.env.POSTGRES_HOST,
                        port: +process.env.POSTGRESS_PORT,
                        username: process.env.POSTGRES_USER,
                        password: process.env.POSTGRES_PASSWORD,
                        database: process.env.POSTGRES_DB,
                        autoLoadModels: true,
                        models: [User, Role, UserRoles],
                }),
                UsersModule,
                RolesModule,
        ],
})
export class AppModule {}
