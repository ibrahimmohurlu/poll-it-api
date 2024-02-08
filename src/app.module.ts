import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PollModule } from "./poll/poll.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    PollModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "poll-it-api-db",
      port: 5432,
      username: "postgres",
      password: "postgres",
      //database: "poll-it-api",
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
