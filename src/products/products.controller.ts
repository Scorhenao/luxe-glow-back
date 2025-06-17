import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBody,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiBearerAuth('jwt')
@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file')) // <- Necesario para recibir el archivo
    @ApiOperation({ summary: 'Create a new product' })
    @ApiBody({ type: CreateProductDto })
    @ApiResponse({ status: 201, description: 'Product created', type: Product })
    create(
        @Body() createProductDto: CreateProductDto,
        @UploadedFile() file: Express.Multer.File, // <- Recibe el archivo
    ): Promise<Product> {
        return this.productsService.create(createProductDto, file);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Update a product by ID' })
    @ApiParam({ name: 'id', description: 'Product ID' })
    @ApiBody({ type: UpdateProductDto })
    @ApiResponse({ status: 200, description: 'Product updated', type: Product })
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<Product> {
        return this.productsService.update(id, updateProductDto, file);
    }

    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({
        status: 200,
        description: 'List of products',
        type: [Product],
    })
    findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Get('with-category')
    @ApiOperation({ summary: 'Get all products (with category)' })
    @ApiResponse({
        status: 200,
        description: 'List of products',
        type: [Product],
    })
    findAllCategories(): Promise<Product[]> {
        return this.productsService.findAllCategories();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a product by ID (with category)' })
    @ApiParam({ name: 'id', description: 'Product ID' })
    @ApiResponse({ status: 200, description: 'Product found', type: Product })
    @ApiResponse({ status: 404, description: 'Product not found' })
    findOne(@Param('id') id: string): Promise<Product | null> {
        return this.productsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product by ID' })
    @ApiParam({ name: 'id', description: 'Product ID' })
    @ApiResponse({ status: 204, description: 'Product deleted' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<void> {
        await this.productsService.delete(id);
    }
}
