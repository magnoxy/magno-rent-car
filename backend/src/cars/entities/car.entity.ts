import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Rental } from '../../rentals/entities/rental.entity';

export enum CarStatus {
  AVAILABLE = 'AVAILABLE',
  RENTED = 'RENTED',
  MAINTENANCE = 'MAINTENANCE',
}

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerDay: number;

  @Column({
    type: 'enum',
    enum: CarStatus,
    default: CarStatus.AVAILABLE,
  })
  status: CarStatus;

  @Column({ type: 'text' })
  imageUrl: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  location: string;

  @ManyToOne(() => User, (user) => user.cars)
  owner: User;

  @Column()
  ownerId: string;

  @OneToMany(() => Rental, (rental) => rental.car)
  rentals: Rental[];
}