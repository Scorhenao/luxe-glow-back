import { BaseEntity } from 'src/common/baseEntity';
import { Product } from 'src/products/entities/product.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description: string;

    @OneToMany(() => Product, (product) => product.categoryId)
    products: Product[];
}
