import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './resolvers/book.resolver';
import { Book, BookSchema} from './model/book.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])
  ],
  providers: [BookService, BookResolver]
})
export class BookModule {}
