import { Injectable, NotFoundException } from '@nestjs/common';
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
        return this.bookModel.find().exec();
    }

    async findOne( id: string ): Promise<Book> {
        const book = await this.bookModel.findById(id).exec();
        if (!book) throw new NotFoundException(`Book with id ${id} not found`);
        return book;
    }
}
