import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async register(registerDto: RegisterDto) {
        const { name, email, password } = registerDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new ConflictException(
                'E-mail já cadastrado',
            );
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash,
            },
        });
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            // password: user.password,
            role: user.role,
        };
    }
}