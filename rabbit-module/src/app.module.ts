import { Module } from '@nestjs/common';
import { RabbitModule } from './rabbit/rabbit.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),RabbitModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
