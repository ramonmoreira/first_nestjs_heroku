import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductsDocument = Products & Document;

@Schema({timestamps: true})
export class Products {
    @Prop()
    transition_id: string;
    
    @Prop()
    status: string;

    @Prop()
    sku?: string;
    
    @Prop()
    name?: string;
    
    @Prop()
    description?: string;
    
    @Prop()
    image?: string;
    
    @Prop()
    price?: string;
    
    @Prop()
    discount?: number;
    
    @Prop()
    rate?: number;
}


export const ProductsSchema = SchemaFactory.createForClass(Products);
