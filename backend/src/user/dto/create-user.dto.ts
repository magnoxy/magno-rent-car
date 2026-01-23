import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  @ApiProperty({ enum: UserRole, required: false })
  role?: UserRole;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  cnhUrl?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  rgUrl?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  proofOfResidencyUrl?: string;
}