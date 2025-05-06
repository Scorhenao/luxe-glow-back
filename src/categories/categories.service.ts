import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category) private readonly repo: Repository<Category>,
    ) {}

    create(createCategoryDto: CreateCategoryDto) {
        const category = this.repo.create(createCategoryDto);
        return this.repo.save(category);
    }

    findAll() {
        return this.repo.find();
    }

    findOne(id: string) {
        return this.repo.findOne({ where: { id } });
    }

    delete(id: string) {
        return this.repo.delete(id);
    }
}
