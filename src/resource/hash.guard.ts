import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Hash} from "./hash";
import {ConfigService} from "@nestjs/config";
import {Observable} from "rxjs";

@Injectable()
export class HashGuard implements CanActivate {
  /**
   * check production mode
   * user agent
   * ip
   * @private
   * @param configService
   */

  constructor(private configService: ConfigService) {
  }

  canActivate(
      context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    if (this.isProduction() == false) {
      return true;
    }
    const hash = request.query.hash;
    if (hash == null) return false;
    return this.isValidHash(hash, request);
  }

  private isValidHash(encrypt: string, request: any) {
    const hash = this.getHash(encrypt);
    request.headers;
    return true;
  }

  private getHash(hash: string): Hash {
    return new Hash("", "");
  }

  private isProduction(): boolean {
    return JSON.parse(String(this.configService.get("PRODUCTION")));
  }
}
