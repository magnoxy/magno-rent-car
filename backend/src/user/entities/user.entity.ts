import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hashPasswordTransform } from 'src/common/helpers/crypto';
import { Car } from '../../cars/entities/car.entity';
import { Rental } from '../../rentals/entities/rental.entity';

export enum UserRole {
  OWNER = 'OWNER',
  CLIENT = 'CLIENT',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({
    transformer: hashPasswordTransform,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @Column({ type: 'text', nullable: true })
  cnhUrl: string;

  @Column({ type: 'text', nullable: true })
  rgUrl: string;

  @Column({ type: 'text', nullable: true })
  proofOfResidencyUrl: string;

  @OneToMany(() => Car, (car) => car.owner)
  cars: Car[];

  @OneToMany(() => Rental, (rental) => rental.client)
  rentals: Rental[];
}