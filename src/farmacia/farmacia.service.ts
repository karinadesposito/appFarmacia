import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFarmaciaDto } from './dto/create-farmacia.dto';
import { Farmacia } from './entities/farmacia.entity';
import { IResponse } from './response.interface';

@Injectable()
export class FarmaciaService {
  constructor(
    @InjectRepository(Farmacia)
    private farmaciaRepository: Repository<Farmacia>,
  ) {}

  async create(createFarmaciaDto: CreateFarmaciaDto): Promise<IResponse> {
    try {
      const farmaciaFound = await this.farmaciaRepository.findOne({
        where: { name: createFarmaciaDto.name },
      });

      if (farmaciaFound) {
        throw new HttpException(
          `La farmacia con nombre ${farmaciaFound.name} ya existe en la base de datos`,
          HttpStatus.CONFLICT,
        );
      }

      const newFarmacia = this.farmaciaRepository.create(createFarmaciaDto);
      const savedFarmacia = await this.farmaciaRepository.save(newFarmacia);

      return {
        message: 'La farmacia ha sido creada exitosamente',
        data: savedFarmacia,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      if (error.status === HttpStatus.CONFLICT) {
        throw error;
      }
      throw new HttpException(
        'Error del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse> {
    try {
      const farmacias = await this.farmaciaRepository.find();

      if (!farmacias.length)
        throw new HttpException(
          'No existen farmacias registradas',
          HttpStatus.NOT_FOUND,
        );

      return {
        message: 'La lista de farmacias está compuesta por:',
        data: farmacias,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Error del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByName(name: string): Promise<IResponse> {
    try {
      const farmacia = await this.farmaciaRepository.findOne({
        where: { name },
      });
      if (!farmacia) {
        throw new HttpException(
         `La farmacia con nombre ${name} no fue encontrada`,
          HttpStatus.CONFLICT,
        );
      }
      return {
        message: 'La farmacia encontrada es:',
        data: farmacia,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      if (error.status === HttpStatus.CONFLICT) {
        throw error;
      }
      throw new HttpException(
        'Error del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteByName(name: string): Promise<IResponse> {
    try {
      const farmacia = await this.farmaciaRepository.findOne({
        where: { name },
      });
      if (!farmacia) {
        throw new HttpException(
          `La farmacia con nombre ${name} no existe en la base de datos`,
          HttpStatus.NOT_FOUND,
        );
      }
      await this.farmaciaRepository.softDelete({ name });
      return {
        message: `Se ha eliminado la farmacia con nombre ${name}`,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Error del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}