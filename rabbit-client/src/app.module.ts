import { Module } from '@nestjs/common';
import { RabbitModule } from './rabbit/rabbit.module';

@Module({
  imports: [RabbitModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
