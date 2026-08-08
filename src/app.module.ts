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
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register() {
    const imports: any[] = [];

    imports.push(
      ConfigModule.forRoot({ isGlobal: true }),
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        playground: true,
      }),
    );

    if (process.env.MONGO_URI) {
      imports.push(MongooseModule.forRoot(process.env.MONGO_URI));
    } else {
      // eslint-disable-next-line no-console
      console.warn('MONGO_URI not set — skipping MongooseModule');
    }

    if (process.env.DATABASE_URL) {
      imports.push(
        TypeOrmModule.forRoot({
          type: 'postgres',
          url: process.env.DATABASE_URL,
          autoLoadEntities: true,
          synchronize: true,
        }),
      );
    } else {
      // eslint-disable-next-line no-console
      console.warn('DATABASE_URL not set — skipping TypeOrmModule');
    }

    imports.push(UserModule, EmployeesModule, AuthModule, BookModule);

    return { imports };
  }

  // Allow Nest to consume the static register result when importing dynamically
  constructor() {}
}

// Export a helper to be used when assembling modules dynamically if needed
export const AppModuleDefinition = AppModule.register();
