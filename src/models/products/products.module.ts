import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSchema } from './entities/product.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema }])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
