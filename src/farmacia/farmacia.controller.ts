import { Controller, Get, Post, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FarmaciaService } from './farmacia.service';
import { CreateFarmaciaDto } from './dto/create-farmacia.dto';
import { IResponse } from './response.interface';

@Controller('farmacias')
export class FarmaciaController {
  constructor(private readonly farmaciaService: FarmaciaService) {}

  @Post()
  async create(@Body() createFarmaciaDto: CreateFarmaciaDto): Promise<IResponse> {
    try {
      return await this.farmaciaService.create(createFarmaciaDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll(): Promise<IResponse> {
    try {
      return await this.farmaciaService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':name')
  async findOneByName(@Param('name') name: string): Promise<IResponse> {
    try {
      return await this.farmaciaService.findOneByName(name);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':name')
  async deleteByName(@Param('name') name: string): Promise<IResponse> {
    try {
      return await this.farmaciaService.deleteByName(name);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
