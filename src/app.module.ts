import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { FarmaciaModule } from './farmacia/farmacia.module'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql1408',
      database: 'appkarina',
      entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      synchronize: true, 
    }),
    FarmaciaModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

