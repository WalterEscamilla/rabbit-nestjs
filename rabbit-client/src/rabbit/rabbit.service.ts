import {Injectable, Logger, NotFoundException, UnauthorizedException} from '@nestjs/common';


const connectRabbit = require('amqplib').connect('amqp://guest:guest@localhost/test');

@Injectable()
export class RabbitService {
  constructor() {}
   
  
  async receiveMessage(queue:string)
  {
    return connectRabbit.then(function(conn) {
        return conn.createChannel().then(function(ch) {
            const ok = ch.assertQueue(queue,{durable: true});    
            return ok.then(function(_queue) {
                ch.consume(queue, function(msg) {
                    if (msg !== null) {
                    console.log(msg.content.toString());
                    ch.ack(msg);
                    }
                });
            })
        })
    }).catch(console.warn);
    }
}
