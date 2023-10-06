import { Module } from "@nestjs/common";
import { ResourceController } from "./controller/resource.controller";
import { ImageService } from "./service/conversion/image/image.service";
import { TasksService } from "./scheduler/tasks.service";
import { ConfigService } from "@nestjs/config";
import { DocumentService } from "./service/conversion/document/document.service";
import { VideoService } from "./service/conversion/video/video.service";
import { VoiceService } from "./service/conversion/voice/voice.service";

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
