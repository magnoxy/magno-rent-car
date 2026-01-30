import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental, RentalStatus } from './entities/rental.entity';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Car, CarStatus } from '../cars/entities/car.entity';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental) private rentalRepository: Repository<Rental>,
    @InjectRepository(Car) private carRepository: Repository<Car>,
  ) {}

  async create(createRentalDto: CreateRentalDto) {
    try {
      const rental = await this.rentalRepository.save(createRentalDto);
      await this.carRepository.update(createRentalDto.carId, {
        status: CarStatus.RENTED,
      });
      return rental;
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'An unknown error occurred',
      );
    }
  }

  findAll() {
    return this.rentalRepository.find({ relations: ['client', 'car'] });
  }

  async findOne(id: string) {
    const rental = await this.rentalRepository.findOne({
      where: { id },
      relations: ['client', 'car'],
    });
    if (!rental) {
      throw new BadRequestException(`Rental with id ${id} not found`);
    }
    return rental;
  }

  async update(id: string, updateRentalDto: UpdateRentalDto) {
    try {
      const rental = await this.rentalRepository.findOne({ where: { id } });
      if (!rental) {
        throw new BadRequestException(`Rental with id ${id} not found`);
      }
      await this.rentalRepository.update(id, updateRentalDto);

      if (updateRentalDto.status === RentalStatus.COMPLETED) {
        await this.carRepository.update(rental.carId, {
          status: CarStatus.AVAILABLE,
        });
      }

      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'An unknown error occurred',
      );
    }
  }

  async remove(id: string) {
    try {
      const rental = await this.rentalRepository.findOne({ where: { id } });
      if (!rental) {
        throw new BadRequestException(`Rental with id ${id} not found`);
      }
      await this.rentalRepository.remove(rental);
      return { message: `Rental with id ${id} removed` };
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'An unknown error occurred',
      );
    }
  }
}
