import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PollModule } from "./poll/poll.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./users/user.module";
import { VoteModule } from "./vote/vote.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    PollModule,
    AuthModule,
    UserModule,
    VoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
