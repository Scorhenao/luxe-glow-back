import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from 'src/upload/upload.module';

@Module({
    imports: [TypeOrmModule.forFeature([Product]), UploadModule],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
