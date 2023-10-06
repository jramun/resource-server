import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ImageService } from "../service/conversion/image/image.service";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private imageService: ImageService) {}

  /**
   * At every minute
   */
  @Cron("* * * * *")
  async cleanCache() {
    this.logger.debug("Called when the current second is 45");
    await this.imageService.cleanCache();
  }
}
