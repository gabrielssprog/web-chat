import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/pages'
    }),
    MongooseModule.forRoot('mongodb://mongo/webchat'),
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ChatGateway
  ],
})
export class AppModule { }
