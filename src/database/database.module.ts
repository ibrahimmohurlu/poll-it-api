import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow("DB_HOST"),
        port: configService.getOrThrow("DB_PORT"),
        username: configService.getOrThrow("POSTGRES_USER"),
        password: configService.getOrThrow("POSTGRES_PASSWORD"),
        //database: configService.getOrThrow("DB_NAME"),
        synchronize: configService.getOrThrow("DB_SYNCRONIZE"),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
