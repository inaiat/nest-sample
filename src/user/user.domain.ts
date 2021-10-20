import * as mongoose from 'mongoose';
import { Data } from "dataclass";

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsPhoneNumber } from 'class-validator';

export type UserDocument = User & Document;


@Schema()
export class User extends Data {

  _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  @Prop()
  name: string;

  @Prop()
  @IsEmail()
  email: string;

  @Prop()
  @IsPhoneNumber()
  phoneNumber: string;
}

