import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


class DataclassLoadTransformer {
  plainToClass(metatype: any, value: any) : any  {
    return metatype.create(value)
  }
}
class DataClassValidationPipe extends ValidationPipe {
  constructor() {
    super({transform: true})
  }
  override loadTransformer() {
     return new DataclassLoadTransformer()
  }  
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new DataClassValidationPipe());
  await app.listen(3000);
}
bootstrap();


