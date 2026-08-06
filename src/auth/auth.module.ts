import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports : [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async(config: ConfigService) => ({
                secret: config.get<string>('MY_JWT_SECRET'),
                signOptions: { expiresIn: '1h'}
            })

        })
    ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
