import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { CarStatus } from '../entities/car.entity';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  model: string;

  @IsNumber()
  @Min(1900)
  @ApiProperty()
  year: number;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  pricePerDay: number;

  @IsEnum(CarStatus)
  @ApiProperty({ enum: CarStatus })
  status: CarStatus;

  @IsString()
  @ApiProperty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  location: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ownerId: string;
}