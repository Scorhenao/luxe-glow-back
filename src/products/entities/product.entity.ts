import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/baseEntity';
import { Category } from 'src/categories/category.entity';

@Entity('products')
export class Product extends BaseEntity {
    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'int' })
    stock: number;

    @Column({ type: 'varchar', nullable: true })
    imageUrl?: string;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'categoryId' })
    categoryId: string;
}
