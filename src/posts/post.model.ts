import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model, BelongsToMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface PostCreationAttrs {
        title: string;
        content: string;
        userId: number;
        image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
        @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
        @Column({
                type: DataType.INTEGER,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
        })
        id: number;

        @ApiProperty({ example: 'Первый пост', description: 'Название поста' })
        @Column({
                type: DataType.STRING,
                allowNull: false,
        })
        title: string;

        @ApiProperty({ example: 'Какой-то контент', description: 'Описание поста' })
        @Column({
                type: DataType.STRING,
        })
        content: string;

        @ApiProperty({ example: 'Типо картинка', description: 'Описание поста' })
        @Column({
                type: DataType.STRING,
        })
        image: string;

        @ForeignKey(() => User)
        @Column({ type: DataType.INTEGER })
        userId: number;

        @BelongsTo(() => User)
        author: User;
}
