import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Products') private productModel: Model<any>) {

  }
  
  async create(createProductDto: any) {
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
