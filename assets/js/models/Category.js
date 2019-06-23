export const CategoryModel = class CategoryModel{
  constructor(data) {
    if(!data) return {name: null, description: null, image: null}
    this.id = data.id;
    this.name = (data.name) ? data.name.trim() : null;
    this.description = (data.description) ? data.description.trim() : null;
    this.image = (data.image) ? data.image : null;
  }
  forProduct(){
    return {
      id: this.id,
      name: this.name
    }
  }
}
