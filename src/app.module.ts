import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EmployeesModule } from './employees/employees.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { ApolloDriverConfig } from 'node_modules/@nestjs/apollo/dist/interfaces/apollo-driver-config.interface';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({

    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    EmployeesModule,
    AuthModule,
    BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
