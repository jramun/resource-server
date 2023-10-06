export class Params {
  name: string;
  format: string;
  rotate?: number;
  resize: boolean;
  resizeWidth?: number;
  resizeHeight?: number;
  crop: boolean;
  cropWidth?: number;
  cropHeight?: number;
  cropLeft?: number;
  cropTop?: number;
  toFormat: string;
  gray: boolean;

  constructor(
      name: string,
      format: string,
      rotate: string = null,
      resize: string = 'false',
      resizeWidth: string = null,
      resizeHeight: string = null,
      crop: string = 'false',
      cropWidth: string = null,
      cropHeight: string = null,
      cropLeft: string = null,
      cropTop: string = null,
      toFormat: string,
      gray: string = 'false'
  ) {
    this.name = name;
    this.format = format;
    this.toFormat = toFormat;
    this.rotate = this.parseValue(rotate);
    this.resize = this.parseBool(resize);
    this.resizeWidth = this.resize ? this.parseValue(resizeWidth) : null;
    this.resizeHeight = this.resize ? this.parseValue(resizeHeight) : null;
    this.crop = this.parseBool(crop);
    this.cropWidth = this.crop ? this.parseValue(cropWidth) : null;
    this.cropHeight = this.crop ? this.parseValue(cropHeight) : null;
    this.cropLeft = this.crop ? this.parseValue(cropLeft) : null;
    this.cropTop = this.crop ? this.parseValue(cropTop) : null;
    this.gray = this.parseBool(gray);
  }

  private parseValue(value: string): number | null {
    return value ? parseInt(value) : null;
  }

  private parseBool(value: string): boolean {
    return JSON.parse(value.toLowerCase());
  }
}
