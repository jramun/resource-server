import { Controller, Get, Query, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { ImageService } from "./image.service";
import { Params } from "./params";
import { HashGuard } from "./hash.guard";
import { DocumentService } from "./document.service";
import { VideoService } from "./video.service";
import { VoiceService } from "./voice.service";

@UseGuards(HashGuard)
@Controller("resource")
export class ResourceController {
  constructor(
    private imageService: ImageService,
    private documentService: DocumentService,
    private videoService: VideoService,
    private voiceService: VoiceService
  ) {}

  /**
   * @param name
   * @param format
   * @param rotate
   * @param resize
   * @param resizeWidth
   * @param resizeHeight
   * @param crop
   * @param cropWidth
   * @param cropHeight
   * @param cropLeft
   * @param cropTop
   * @param toFormat png,jpg,webp,gif,tiff,
   * @param gray
   * @param res
   */

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
