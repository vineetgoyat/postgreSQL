import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './model/book.model';
import { CreateBookInput } from './dto/create-book.input';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

    async create(input: CreateBookInput) : Promise<Book> {
        const createdBook = new this.bookModel(input);
        return createdBook.save();
    }

    async findAll(): Promise<Book[]> {
        return this.bookModel
    }
}
