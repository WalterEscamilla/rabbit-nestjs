import { Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import { RabbitController } from './rabbit.controller';
import { AmqpModule } from 'nestjs-amqp';
import { RabbitConfig } from './rabbit.config';
@Module({
  imports: [
    AmqpModule.forRootAsync(RabbitConfig),],
  providers: [RabbitService],
  controllers: [RabbitController]
})
export class RabbitModule {}
