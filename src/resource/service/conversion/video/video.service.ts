import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class VideoService {
  /**
   * root storage
   * @private
   */
  private readonly storage;

  constructor(private configService: ConfigService) {
    this.storage = this.configService.get<string>("INNER_STORAGE");
  }

  serve(name: string, format: string): string {
    const videoStorage = this.storage + "video/";
    return videoStorage + name + "." + format;
  }
}
