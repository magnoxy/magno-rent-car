import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from './entities/rental.entity';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental) private rentalRepository: Repository<Rental>,
  ) {}

  async create(createRentalDto: CreateRentalDto) {
    try {
      return await this.rentalRepository.save(createRentalDto);
    } catch (error) {
      throw new BadRequestException(error.message);
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
      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
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
      throw new BadRequestException(error.message);
    }
  }
}
