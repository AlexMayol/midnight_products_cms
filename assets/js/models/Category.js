export const CategoryModel = class CategoryModel{
  constructor(data) {
    if(!data) return {name: null, description: null, image: null}
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
  }
  forProduct(){
    return {
      id: this.id,
      name: this.name
    }
  }
}
