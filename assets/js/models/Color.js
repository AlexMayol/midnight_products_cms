export const ColorModel = class ColorModel{
  constructor(data) {
    if(!data) return { label: null, code: '#ffffff'}
    this.id = data.id;
    this.code = (data.code) ? data.code : null;
    this.label = (data.label) ? data.label : null;
  }
}
