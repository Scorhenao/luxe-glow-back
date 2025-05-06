import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({
        description: 'The name of the category',
        example: 'Category Name',
    })
    name: string;

    @ApiProperty({
        description: 'The description of the category',
        example: 'Category Description',
    })
    description: string;
}
