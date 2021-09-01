import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

const start = async () => {
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule);

        const config = new DocumentBuilder()
                .setTitle('Практика, практика и еще раз практика')
                .setDescription('А вот и описание')
                .setVersion('1.0.0')
                .addTag('Yusuf')
                .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('/api/docs', app, document);

        app.useGlobalPipes(new ValidationPipe());

        await app.listen(PORT, () => console.log(`Сервер запущен на пору ${PORT}`));
};

start();
