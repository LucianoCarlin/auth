import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Microserviço de Autenticação - Documentação da API')
    .setDescription(
      'Bem-vindo à documentação da API do Microserviço de Autenticação! Este microserviço é responsável pela autenticação de usuários, fornecendo funcionalidades de login seguro e geração de tokens JWT. Navegue pela documentação abaixo para entender como usar os endpoints disponíveis para autenticar usuários e obter tokens de acesso. A autenticação é um componente fundamental da segurança do seu ecossistema de serviços, e este guia ajudará você a integrar e utilizar esse serviço de forma eficaz. Se surgirem dúvidas ou preocupações, sinta-se à vontade para entrar em contato. Vamos começar a explorar a autenticação de forma segura e simplificada!',
    )
    .setVersion('1.0')
    .addTag('login')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
