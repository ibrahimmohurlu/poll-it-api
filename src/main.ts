import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { PrismaClientExceptionFilter } from "./prisma-client-exception/prisma-client-exception.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("Poll It API")
    .setDescription(
      "API for creating and managing polls with JWT authentication. " +
        "User can register, login, and see their profile. " +
        "Unauthenticated users can list all the polls and results. " +
        "Authenticated user can create,update and delete poll by poll id. " +
        "Authenticated users can also vote for poll by id. " +
        "Most of the endpoints require auth so before testing the api remember to login or register " +
        "and add your access token into the Authorize button down below.",
    )
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document);

  await app.listen(3000);
}
bootstrap();
