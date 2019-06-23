export const ColorModel = class ColorModel{
  constructor(data) {
    if(!data) return { label: null, code: '#ffffff'}
    this.id = data.id;
    this.code = data.code;
    this.label = data.label;
  }
}
