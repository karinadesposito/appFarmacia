import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmaciaService } from './farmacia.service';
import { FarmaciaController } from './farmacia.controller';
import { Farmacia } from './entities/farmacia.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Farmacia]), 
  ],
  controllers: [FarmaciaController],
  providers: [FarmaciaService],
})
export class FarmaciaModule {}

