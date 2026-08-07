import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class Book extends Document {
    
}