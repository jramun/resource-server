import {Injectable} from "@nestjs/common";
import {Params} from "../../../dto/params";
import {ConfigService} from "@nestjs/config";
import * as sharp from "sharp";
import * as filesystem from "fs";

@Injectable()
export class ImageService {
    /**
     * root storage
     * @private
     */
    private readonly storage: string;
    private readonly tempStorage = ".temp";
    private readonly expireTime: number;

    constructor(private configService: ConfigService) {
        this.storage = this.configService.get<string>("INNER_STORAGE");
        this.expireTime = this.configService.get<number>("EXPIRE_TIME");
    }

    public async prepare(params: Params): Promise<string> {
        let originalFilename = `${params.name}.${params.format}`;
        let temp = sharp(`${this.storage}image/${originalFilename}`);
        temp = await this.applyTransformations(temp, params);
        const filePath = await this.getFilenameAbsolutPath(params);
        await temp.toFile(filePath);
        return filePath;
    }

    private async applyTransformations(image, params: Params) {
        if (params.rotate) image = await image.rotate(params.rotate);
        if (params.resize)
            image = await image.resize({ width: params.resizeWidth, height: params.resizeHeight });
        if (params.crop)
            image = await image.extract({ width: params.cropWidth, height: params.cropHeight, left: params.cropLeft, top: params.cropTop });
        if (params.gray) image = await image.grayscale();
        if (params.toFormat) {
            image = await image.toFormat(params.toFormat);
        } else {
            params.toFormat = params.format;
        }
        return image;
    }


    public async getFilenameAbsolutPath(params: Params) {
        return `${await this.storageTemp()}${this.getFilename(params)}`;
    }


    public async serve(params: Params): Promise<string> {
        if (await this.hasCache(params)) {
            return this.getFilenameAbsolutPath(params);
        }
        return this.prepare(params);
    }

    public getFilename(params: Params): string {
        return `${params.rotate}#${params.resizeWidth}#${params.resizeHeight}#${params.cropWidth}#${params.cropHeight}#${params.cropLeft}#${params.cropTop}#${params.gray}#${params.name}#${params.format}.${params.toFormat}`;
    }

    public async hasCache(params: Params): Promise<boolean> {
        const path = await this.getFilenameAbsolutPath(params);
        return filesystem.existsSync(path);
    }

    public async cleanCache() {
        const storageTemp = await this.storageTemp();
        const files = filesystem.readdirSync(storageTemp);
        for (const f of files) {
            const path = `${storageTemp}/${f}`;
            const { birthtime } = filesystem.statSync(path);
            if ((Date.now().valueOf() - this.expireTime) > birthtime.valueOf()) {
                filesystem.unlinkSync(path);
                console.log(path);
            }
        }
    }

    private async storageTemp(): Promise<string> {
        const path = `${this.storage}${this.tempStorage}/`;
        if (!filesystem.existsSync(path))
            filesystem.mkdirSync(path, { recursive: true });
        return path;
    }
}
