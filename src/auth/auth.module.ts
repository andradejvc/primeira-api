import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }