export const ProductModel = class ProductModel {
  constructor(data) {
    if (!data){
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
    console.log(data.colors)
    this.id = data.id;
    this.name = data.name;
    this.descriptions = {
      en: data.en_description,
      es: data.es_description,
      de: data.de_description
    };
    this.price = data.price;
    this.image = data.image;
    this.category = data.category;
    this.colors = (data.colors) ? data.colors : []
  }
}
