import { NestFactory } from '@nestjs/core';
import { RedisModule } from './redis.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
        console.log('client');
        const app = await NestFactory.createMicroservice(RedisModule, {
                transport: Transport.REDIS, //setting transporter
                options: {
                        url: 'redis://localhost:6379',
                },
        });
        await app.listen();
}
bootstrap();
