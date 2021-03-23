import { ConfigService } from "@nestjs/config";
import { EPROTO } from "node:constants";

export const RabbitConfig = {
    inject : [ConfigService],
    useFactory: async ( configService: ConfigService): Promise<Object> =>  ({
        name: configService.get('RABBITMQ_NAME'),
        hostname: configService.get('RABBITMQ_HOST'),
        port:  configService.get<number>('RABBITMQ_PORT'),
        username:configService.get('RABBITMQ_USERNAME'),
        password:configService.get('RABBITMQ_PASSWORD'),
        vhost:configService.get('RABBITMQ_VHOST'),
        retrys: 10,
        heartbeat: 1,
    }),


}
