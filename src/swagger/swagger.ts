import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerInit(app) {
  const config = new DocumentBuilder()
    .setTitle('Super api title')
    .setDescription('Super description')
    .setVersion('1.0.0')
    .addTag('Super tag')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
