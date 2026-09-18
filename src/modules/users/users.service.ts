import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../database/prisma.service';
import { Prisma } from '../../generated/prisma/client';
import { AppException } from '../../common/exceptions/app.exception';
import { ErrorCode } from '../../common/exceptions/error-codes';


@Injectable()
export class UsersService {

    constructor(private readonly prisma: PrismaService) { }

    async getAll() {
        const users = await this.prisma.user.findMany()
        return users
    }
    async findById(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            throw new AppException(
                ErrorCode.USER_NOT_FOUND,
                'User not found',
                HttpStatus.NOT_FOUND,
            );
        }

        return user;
    }
    async create(createUserDto: CreateUserDto) {
        try {

            return await this.prisma.user.create({
                data: {
                    passwordHash: "asdasd",
                    email: createUserDto.email.trim().toLowerCase(),
                    name: createUserDto.name,
                },
            });
        } catch (error) {
            if (
                // when there is a error related to prisma ,it has a known error code
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

}

