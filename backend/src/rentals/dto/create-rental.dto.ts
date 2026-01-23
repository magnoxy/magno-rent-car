import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { PaymentStatus, RentalStatus } from '../entities/rental.entity';

export class CreateRentalDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  endDate: string;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  totalPrice: number;

  @IsEnum(RentalStatus)
  @ApiProperty({ enum: RentalStatus })
  status: RentalStatus;

  @IsEnum(PaymentStatus)
  @ApiProperty({ enum: PaymentStatus })
  paymentStatus: PaymentStatus;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  carId: string;
}
