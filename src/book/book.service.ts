import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './model/book.model';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {

    }
}
