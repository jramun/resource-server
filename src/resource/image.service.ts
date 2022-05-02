import {Injectable} from "@nestjs/common";
import {Params} from "./params";
import {ConfigService} from "@nestjs/config";

const sharp = require("sharp");
const filesystem = require("fs");

@Injectable()
export class ImageService {
    /**
     * root storage
     * @private
     */
        //todo env
    private readonly storage;
    private readonly tempStorage;
    private readonly expireTime;

    constructor(private configService: ConfigService) {
        this.storage = this.configService.get<string>("INNER_STORAGE");
        this.expireTime = this.configService.get<number>("EXPIRE_TIME");
        this.tempStorage = ".temp";
    }

    public async prepare(params: Params): Promise<string> {
        let originalFilename = params.name + "." + params.format;
        let temp = await sharp(this.storage + "image/" + originalFilename);
        if (params.rotate) temp = await temp.rotate(params.rotate);
        if (params.resize)
            temp = await temp.resize({
                width: params.resizeWidth,
                height: params.resizeHeight,
            });
        if (params.crop)
            temp = await temp.extract({
                width: params.cropWidth,
                height: params.cropHeight,
                left: params.cropLeft,
                top: params.cropTop,
            });
        if (params.gray) temp = await temp.grayscale();
        if (params.toFormat) {
            temp = await temp.toFormat(params.toFormat);
        } else {
            params.toFormat = params.format;
        }
        let filePath = await this.getFilenameAbsolutPath(params);
        await temp.toFile(filePath);
        return filePath;
    }

    public async getFilenameAbsolutPath(params: Params) {
        return (await this.storageTemp()) + "" + this.getFilename(params);
    }

    public async serve(params: Params): Promise<string> {
        if (await this.hasCache(params)) {
            return this.getFilenameAbsolutPath(params);
        }
        return this.prepare(params);
    }

    /**
     * 0 rotate
     * 1 resizeWidth
     * 2 resizeHeight
     * 3 cropWidth
     * 4 cropHeight
     * 5 cropLeft
     * 6 cropTop
     * 7 gray
     * 8 name
     * 9 format
     * 10 toFormat
     * get unique filename from params
     * @param params
     */
    public getFilename(params: Params): string {
        return `${params.rotate}#${params.resizeWidth}#${params.resizeHeight}#${params.cropWidth}#${params.cropHeight}#${params.cropLeft}#${params.cropTop}#${params.gray}#${params.name}#${params.format}.${params.toFormat}`;
    }

    public async hasCache(params: Params): Promise<boolean> {
        const path = await this.getFilenameAbsolutPath(params);
        try {
            return filesystem.existsSync(path);
        } catch (e) {
            return false;
        }
    }

    public async cleanCache() {
        // const storageTemp = this.storage + `${this.tempStorage}/`;
        const storageTemp = await this.storageTemp();
        let files = filesystem.readdirSync(storageTemp);
        for (const f of files) {
            const path = storageTemp + "/" + f;
            const {birthtime} = filesystem.statSync(path);
            if (Date.now() - this.expireTime > birthtime) {
                filesystem.unlinkSync(path);
                console.log(path);
            }
        }
    }

    private async storageTemp(): Promise<string> {
        const path = this.storage + `${this.tempStorage}/`;
        if (!filesystem.existsSync(path))
            filesystem.mkdirSync(path, {recursive: true});
        return path;
    }
}
