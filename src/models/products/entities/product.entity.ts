import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductsDocument = Products & Document;

@Schema()
export class Products {
    @Prop({required: true, unique: true})
    sku: string;
    
    @Prop({required: true})
    name: string;
    
    @Prop()
    description: string;
    
    @Prop({required: true})
    price: string;
    
    @Prop()
    discount: number;
    
    @Prop({required: true})
    rate: number;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);