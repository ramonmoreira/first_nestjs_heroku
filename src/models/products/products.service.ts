import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Products') private productModel: Model<ProductsDocument>) {

  }
  
  async create(createProductDto: CreateProductDto) {
    const { sku } = createProductDto;
    const product = await this.productModel.findOne({ sku })
    if(product) {
      throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST)
    }

    const createdProduct = new this.productModel(createProductDto)
    return createdProduct.save()
  }

  findAll() {
    return this.productModel.find();
  }

  findOne(id: string) {
    return this.productModel.findById(id)
  } 

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate({
      _id: id
    }, {
      $set: updateProductDto
    }, {
      new: true
    })
  }

  remove(id: string) {
    return this.productModel.deleteOne({
      _id: id
    }).exec()
  }
}
