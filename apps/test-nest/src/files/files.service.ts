import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
        async createFile(file): Promise<string> {
                try {
                        const fileName = uuid.v4() + '.jpg';
                        const fielPath = path.resolve(__dirname, '..', 'static');
                        if (!fs.existsSync(fielPath)) {
                                console.log(1)
                                fs.mkdirSync(fielPath, { recursive: true });
                        }
                        fs.writeFileSync(path.join(fielPath, fileName), file.buffer);
                        return fileName;
                } catch (err) {
                        throw new HttpException('Ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
                }
        }
}
