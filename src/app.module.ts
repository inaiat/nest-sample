import { Module, Type } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserService } from './user/user.service';
import { User } from './user/user.domain';

const createSF = <T>(name: Type<T>) => SchemaFactory.createForClass(name)

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    MongooseModule.forFeature([{ name: User.name, schema: createSF(User) }])
  ],
  controllers: [AppController],
  providers: [UserService],
})
export class AppModule {}
