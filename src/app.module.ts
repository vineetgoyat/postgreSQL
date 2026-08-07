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
import { ApolloDriver } from 'node_modules/@nestjs/apollo/dist/drivers/apollo.driver';
import { join } from 'path/win32';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, 
      autoSchemaFile: join( process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
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
