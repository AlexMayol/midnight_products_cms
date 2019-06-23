export const ProductModel = class ProductModel {
  constructor(data) {
    if (!data) {
      return {
        name: null,
        descriptions: {
          en: null,
          es: null,
          de: null
        },
        price: null,
        image: null,
        category: {
          id: null,
          name: null
        },
        colors: []
      }
    }
    this.id = data.id;
    this.name = data.name || null;
    this.descriptions = {
      en: data.en_description || null,
      es: data.es_description || null,
      de: data.de_description || null
    };
    this.price = data.price || null;
    this.image = data.image || null;
    this.category = data.category || null;
    this.colors = data.colors || []
  }
}
