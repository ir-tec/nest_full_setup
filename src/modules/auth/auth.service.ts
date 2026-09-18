import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto) {
        const email = registerDto.email.trim().toLowerCase();

        const passwordHash = await argon2.hash(registerDto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email,
                    name: registerDto.name.trim(),
                    passwordHash,
                },
            });
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    'A user with this email already exists',
                );
            }

            throw error;
        }
    }

    async login(loginDto: LoginDto) {
        const email = loginDto.email.trim().toLowerCase();

        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordValid = await argon2.verify(
            user.passwordHash,
            loginDto.password,
        );

        if (!passwordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: user.id,
            email: user.email,
        }; 
            
        const accessToken = await this.jwtService.signAsync(payload,{secret:process.env.J_SECRET});
        return {
            accessToken,
        };
    }
}