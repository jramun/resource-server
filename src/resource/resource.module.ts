import { Module } from "@nestjs/common";
import { ResourceController } from "./resource.controller";
import { ImageService } from "./image.service";
import { TasksService } from "./tasks.service";
import { ConfigService } from "@nestjs/config";
import { DocumentService } from "./document.service";
import { VideoService } from "./video.service";
import { VoiceService } from "./voice.service";

@Module({
  controllers: [ResourceController],
  providers: [
    ImageService,
    DocumentService,
    VideoService,
    VoiceService,
    TasksService,
    ConfigService,
  ],
})
export class ResourceModule {}
