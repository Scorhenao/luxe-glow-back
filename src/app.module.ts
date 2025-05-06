import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { User } from './users/entities/user.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/category.entity';
import { Product } from './products/entities/product.entity';
import { UploadModule } from './upload/upload.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'mysql',
                host: config.get('DB_HOST'),
                port: parseInt(config.get('DB_PORT'), 10),
                username: config.get('DB_USER'),
                password: config.get('DB_PASS'),
                database: config.get('DB_NAME'),
                ssl:
                    config.get('DB_SSL') === 'true'
                        ? { rejectUnauthorized: false }
                        : false,
                entities: [User, Product, Category],
                synchronize: true,
                logging: true,
            }),
        }),
        UsersModule,
        AuthModule,
        ProductsModule,
        CategoriesModule,
        UploadModule,
    ],
})
export class AppModule {}
