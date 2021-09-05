import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { Role } from '../roles/roles.model';
import { User } from '../users/users.model';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
        @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
        @Column({
                type: DataType.INTEGER,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
        })
        id: number;

        @ForeignKey(() => Role)
        @Column({ type: DataType.INTEGER })
        roleId: number;

        @ForeignKey(() => User)
        @Column({ type: DataType.INTEGER })
        userId: number;
}
