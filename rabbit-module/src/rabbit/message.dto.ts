import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TypeNotification } from "./type-notification.enum";

export class MessageDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  type: TypeNotification

  @IsNotEmpty()
  @IsNumber()
  manual_notificationn_id: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;


}