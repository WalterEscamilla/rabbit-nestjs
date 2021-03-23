import { Controller, Get } from '@nestjs/common';
import { RabbitService } from './rabbit.service';

@Controller('rabbit')
export class RabbitController {
    constructor(private rabbitService: RabbitService){}

    @Get()
    home(){
        this.rabbitService.receiveMessage('tes5.queue1');
        return 'hello world';
    }
}
