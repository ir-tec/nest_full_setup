import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
// we use class instead of interfaces for creating DTO because interfaces are disappear on runtime mode 
export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;
}