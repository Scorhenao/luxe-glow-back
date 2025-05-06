import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({
        description: 'The name of the product',
        example: 'Product Name',
    })
    name: string;

    @ApiProperty({
        description: 'The description of the product',
        example: 'Product Description',
    })
    description: string;

    @ApiProperty({
        description: 'The price of the product',
        example: '19.99',
    })
    price: number;

    @ApiProperty({
        description: 'The stock of the product',
        example: '10',
    })
    stock: number;

    @ApiProperty({
        description: 'The image url of the product',
        example: 'https://example.com/image.jpg',
        required: false,
    })
    imageUrl?: string;

    @ApiProperty({
        description: 'The category id of the product',
        example: 'c531a852-7b65-4f4c-91be-0dfc107c7f57',
    })
    categoryId: string;
}
