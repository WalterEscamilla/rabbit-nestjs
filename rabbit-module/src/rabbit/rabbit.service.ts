import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {InjectAmqpConnection} from 'nestjs-amqp';
import {Channel, Connection} from 'amqplib';
import { TypesExchanges } from './types-exchanges.enum';
import { MessageDto} from './message.dto';
@Injectable()
export class RabbitService {
  constructor(
    @InjectAmqpConnection()
      private readonly rabbitConnection: Connection,
      ) {}

  async saveExchange(exchange: string, typeExchange: TypesExchanges)
  {
    try
    {
      const channel =await  this.createChannel();
      const objExchange =await  channel.assertExchange(exchange,typeExchange);
      return objExchange;   
    }
    catch(error){
      throw new Error(`Impossible to create exchange : ${exchange}, type: ${typeExchange}`); 
    }

  }
  async saveQueue(exchange:string, queue:string, routingkey:string)
  {
    try
    {
      const channel =await  this.createChannel();
      const queueCreated = await channel.assertQueue(queue,{durable: true});
      const bindQueue =await  channel.bindQueue(queue, exchange, routingkey);
      console.log({queueCreated,bindQueue})
      return queueCreated;   
    }
    catch(error){
      throw new Error(error); 
    }
    
  }
  async sendMessage(queue:string, messageDto: MessageDto)
  {
    try
    {
    
      console.log(JSON.stringify(messageDto));
      const channel =await  this.createChannel();
      const messageCreated = await channel.sendToQueue(queue,Buffer.from(JSON.stringify(messageDto)));
      console.log(messageCreated);
      return messageCreated;   
    } 
    catch(error){
      throw new Error(error); 
    }
  }

  private async createChannel(): Promise<Channel>
  {
    try {
      const channel =  await this.rabbitConnection.createChannel();
      return channel;

   }catch(e){
     Logger.error(e);
   }
  }



}
