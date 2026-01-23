import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    try {
      return await this.carRepository.save(createCarDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.carRepository.find();
  }

  async findOne(id: string) {
    const car = await this.carRepository.findOne({ where: { id }, relations: ['owner'] });
    if (!car) {
      throw new BadRequestException(`Car with id ${id} not found`);
    }
    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    try {
      const car = await this.carRepository.findOne({ where: { id } });
      if (!car) {
        throw new BadRequestException(`Car with id ${id} not found`);
      }
      await this.carRepository.update(id, updateCarDto);
      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const car = await this.carRepository.findOne({ where: { id } });
      if (!car) {
        throw new BadRequestException(`Car with id ${id} not found`);
      }
      await this.carRepository.remove(car);
      return { message: `Car with id ${id} removed` };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
