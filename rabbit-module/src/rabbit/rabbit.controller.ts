import { Controller, Get, Query } from '@nestjs/common';
import { Type } from 'class-transformer';
import { MessageDto } from './message.dto';
import { RabbitService } from './rabbit.service';
import { TypeNotification } from './type-notification.enum';
import { TypesExchanges } from './types-exchanges.enum';

@Controller('rabbit')
export class RabbitController {
  constructor(private rabbitService: RabbitService){

  }
  @Get('/create-exchange')
  async createExchange(@Query('exchange') exchange: string, @Query('typeExchange') typeExchange: TypesExchanges)
  {
    try
    {
      const exchangeCreated = await  this.rabbitService.saveExchange(exchange, typeExchange) ;
      return exchangeCreated.hasOwnProperty('exchange');
     
    }
    catch(err)
    {
      console.log(err);
      throw new Error(`Impossible to create exchange : ${exchange}, type: ${typeExchange}`);
    }
    
  }
  @Get('/create-queue')
  async createQueue(  @Query('exchange') exchange: string, 
                      @Query('queue') queue: string, 
                      @Query('routingkey') routingkey: string )
  {
    try
    {
      const queueCreated = await  this.rabbitService.saveQueue(exchange, queue, routingkey) ;
      return queueCreated;
      
    }
    catch(err)
    {
      console.log(err);
      throw new Error(`Impossible to create exchange : ${exchange}`);
    }
    
  }
  @Get('/send-message')
  async sendMessage(  
                      @Query('queue') queue: string, 
                      @Query('message') message: MessageDto )
  {
    try
    {
      const messageDto: MessageDto = new MessageDto();
      messageDto.title = 'Title test';
      messageDto.message = 'Hello, test 1',
      messageDto.type = TypeNotification.ACCEPT_RESOLUTION;
      messageDto.url = 'https://google.com'; 
      messageDto.manual_notificationn_id = 1;
      messageDto.user_id = 2;
      console.log(messageDto);
      const queueCreated = await  this.rabbitService.sendMessage(queue,messageDto) ;
      return queueCreated;
      
    }
    catch(err)
    {
      console.log(err);
      throw new Error(err);
    }
    
  }
  @Get()
  index(){
    return 'hola'; 
  }


}
