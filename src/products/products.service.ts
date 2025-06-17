import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private readonly repo: Repository<Product>,
        private readonly cloudinaryService: CloudinaryService,
    ) {}
    async create(
        dto: CreateProductDto,
        file?: Express.Multer.File,
    ): Promise<Product> {
        if (file) {
            const imageUrl = await this.cloudinaryService.uploadImage(file);
            dto.imageUrl = imageUrl;
        }

        const product = this.repo.create(dto);
        return this.repo.save(product);
    }

    async update(
        id: string,
        dto: UpdateProductDto,
        file?: Express.Multer.File,
    ): Promise<Product> {
        const product = await this.repo.findOne({ where: { id } });
        if (!product) {
            throw new Error('Product not found');
        }

        if (file) {
            const imageUrl = await this.cloudinaryService.uploadImage(file);
            dto.imageUrl = imageUrl;
        }

        const updated = this.repo.merge(product, dto);
        return this.repo.save(updated);
    }

    findAll() {
        return this.repo.find();
    }

    findAllCategories() {
        return this.repo.find({ relations: ['categoryId'] });
    }

    findOne(id: string) {
        return this.repo.findOne({ where: { id }, relations: ['category'] });
    }

    delete(id: string) {
        return this.repo.delete(id);
    }
}
