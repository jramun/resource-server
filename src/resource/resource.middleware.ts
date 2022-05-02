import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class ResourceMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}
