import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PollModule } from './poll/poll.module';

@Module({
  imports: [PollModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
