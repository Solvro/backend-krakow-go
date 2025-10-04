import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Krakow Volunteer API")
    .setDescription("Krakow Volunteer API description")
    .setVersion("1.0")
    .addTag("API")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");

  // eslint-disable-next-line no-console
  console.log(`Application is running on: ${await app.getUrl()}/api`);
}
bootstrap();
