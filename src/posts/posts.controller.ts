import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from '../users/dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
        constructor(private postService: PostsService) {}

        @Post()
        @UseInterceptors(FileInterceptor('image'))
        createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
                return this.postService.createPost(dto, image);
        }
}
