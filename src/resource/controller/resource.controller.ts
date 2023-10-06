import { Controller, Get, Query, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { ImageService } from "../service/conversion/image/image.service";
import { Params } from "../dto/params";
import { HashGuard } from "../guard/hash.guard";
import { DocumentService } from "../service/conversion/document/document.service";
import { VideoService } from "../service/conversion/video/video.service";
import { VoiceService } from "../service/conversion/voice/voice.service";

@UseGuards(HashGuard)
@Controller("resource")
export class ResourceController {
  constructor(
    private imageService: ImageService,
    private documentService: DocumentService,
    private videoService: VideoService,
    private voiceService: VoiceService
  ) {}

  @Get("/image")
  public async image(
    @Query("name") name: string,
    @Query("format") format: string,
    @Query("rotate") rotate: string,
    @Query("resize") resize: string,
    @Query("resizeWidth") resizeWidth: string,
    @Query("resizeHeight") resizeHeight: string,
    @Query("crop") crop: string,
    @Query("cropWidth") cropWidth: string,
    @Query("cropHeight") cropHeight: string,
    @Query("cropLeft") cropLeft: string,
    @Query("cropTop") cropTop: string,
    @Query("toFormat") toFormat: string,
    @Query("gray") gray: string,
    @Res() res: Response
  ): Promise<any> {
    const params = new Params(
      name,
      format,
      rotate,
      resize,
      resizeWidth,
      resizeHeight,
      crop,
      cropWidth,
      cropHeight,
      cropLeft,
      cropTop,
      toFormat,
      gray
    );
    const path = await this.imageService.serve(params);
    return res.sendFile(path);
  }

  @Get("/video")
  public async video(
    @Query("name") name: string,
    @Query("format") format: string,
    @Res() res: Response
  ): Promise<any> {
    const path = this.videoService.serve(name, format);
    return res.sendFile(path);
  }

  @Get("/document")
  public async document(
    @Query("name") name: string,
    @Query("format") format: string,
    @Res() res: Response
  ): Promise<any> {
    const path = this.documentService.serve(name, format);
    return res.sendFile(path);
  }

  @Get("/voice")
  public async voice(
    @Query("name") name: string,
    @Query("format") format: string,
    @Res() res: Response
  ): Promise<any> {
    const path = this.voiceService.serve(name, format);
    return res.sendFile(path);
  }
}
