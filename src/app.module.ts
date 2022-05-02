import { Module } from "@nestjs/common";
import { ResourceModule } from "./resource/resource.module";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ResourceModule, ScheduleModule.forRoot(), ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
