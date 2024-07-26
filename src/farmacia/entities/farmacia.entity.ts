import { Entity, Column, PrimaryGeneratedColumn, Unique, DeleteDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

@Entity({ name: 'farmacia' })
@Unique(['name'])
export class Farmacia {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty() 
  @MaxLength(30) 
  name: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()   
  @MaxLength(50) 
  mail: string;

  @Column()
  @IsNotEmpty() 
  @MaxLength(50) 
  domicilio: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
