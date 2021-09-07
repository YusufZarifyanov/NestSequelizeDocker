import { CACHE_MANAGER, Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from './redis.service';
import { Cache } from 'cache-manager';

@Module({
        imports: [
                CacheModule.registerAsync({
                        useFactory: () => {
                                return {
                                        store: redisStore,
                                        host: 'localhost',
                                        port: 6379,
                                        ttl: 60 * 3600 * 1000,
                                };
                        },
                }),
        ],
        providers: [RedisCacheService],
        exports: [RedisCacheModule, RedisCacheService],
})
export class RedisCacheModule implements OnModuleInit {
        constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

        onModuleInit() {
                const logger = new Logger('Cache');
        }
}
