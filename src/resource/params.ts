export class Params {
  name: string;
  format: string;
  rotate: number;
  resize: boolean;
  resizeWidth: number;
  resizeHeight: number;
  crop: boolean;
  cropWidth: number;
  cropHeight: number;
  cropLeft: number;
  cropTop: number;
  // quality: number
  toFormat: string;
  gray: boolean;

  constructor(
    name: string,
    format: string,
    rotate: string,
    resize: string,
    resizeWidth: string,
    resizeHeight: string,
    crop: string,
    cropWidth: string,
    cropHeight: string,
    cropLeft: string,
    cropTop: string,
    toFormat: string,
    gray: string
  ) {
    this.name = name;
    this.format = format;
    this.toFormat = toFormat;
    this.rotate = rotate == null || false ? null : parseInt(rotate);
    this.resize = resize == null || false ? false : JSON.parse(String(resize));
    this.resizeWidth =
      resizeWidth == null || false || !this.resize
        ? null
        : parseInt(resizeWidth);
    this.resizeHeight =
      resizeHeight == null || false || !this.resize
        ? null
        : parseInt(resizeHeight);
    this.crop = crop == null || false ? false : JSON.parse(String(crop));
    this.cropWidth =
      cropWidth == null || false || !this.crop ? null : parseInt(cropWidth);
    this.cropHeight =
      cropHeight == null || false || !this.crop ? null : parseInt(cropHeight);
    this.cropLeft =
      cropLeft == null || false || !this.crop ? null : parseInt(cropLeft);
    this.cropTop =
      cropTop == null || false || !this.crop ? null : parseInt(cropTop);
    this.gray = gray == null || false ? false : JSON.parse(String(gray));
  }
}
