<template>
  <div class="container mx-auto my-8 px-4">
    <h2 class="bg-blue-200 my-2 text-center text-xl rounded-lg p-2 font-bold">{{productsMessage}}</h2>
    <section class="product-list">
      <product
        v-for="product of products"
        :key="product.id"
        :product-data="product"
        @delete="deleteProduct"
        @update="updateProduct"
      ></product>
    </section>

    <p class="bg-blue-200 my-2 text-center rounded-lg p-2 font-bold">✔️ Add a new product</p>
    <div class="my-2 flex flex-wrap">
      <div class="px-2 md:w-1/2">
        <form class="bg-white rounded-lg p-2" @submit.prevent="createProduct">
          <div class="flex flex-wrap">
            <label class="md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2">
              Name
              <input
                required
                v-model="newProduct.name"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Name"
              >
            </label>
            <label class="md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2">
              Price of the product
              <input
                required
                v-model="newProduct.price"
                type="number"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Price"
              >
            </label>
          </div>
          <div class="flex flex-wrap">
            <label class="md:w-full px-2 text-gray-700 text-sm font-bold mb-2">
              English description
              <input
                required
                v-model="newProduct.descriptions.en"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="English description"
              >
            </label>
            <label class="md:w-full px-2 text-gray-700 text-sm font-bold mb-2">
              Spanish description
              <input
                v-model="newProduct.descriptions.es"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Spanish description"
              >
            </label>

            <label class="md:w-full px-2 text-gray-700 text-sm font-bold mb-2">
              German description
              <input
                v-model="newProduct.descriptions.de"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="German description"
              >
            </label>
          </div>
          <div class="flex flex-wrap">
            <label class="md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2">
              Image for the product
              <input
                v-model="newProduct.image"
                type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter a valir image URL!"
              >
            </label>

            <label class="md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2">
              Category of the product
              <select
                required
                v-model="newProduct.category"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option
                  v-for="category of categories"
                  :value="category"
                  :key="category.id"
                >{{category.name}}</option>
              </select>
            </label>
          </div>
          <div class="flex flex-wrap">
            <p
              class="md:w-full px-2 text-gray-700 text-sm font-bold mb-2"
            >select the colors of the product:</p>
          </div>
          <div class="flex flex-wrap">
            <label v-for="color of colors" :key="color.id" class="p-2">
              <div
                class="color-picker w-8 h-8 border-radius-md"
                :title="color.label"
                :style="{ '--bg-color': color.code}"
              ></div>
              <input
                v-model="newProduct.colors"
                type="checkbox"
                name="color_check"
                :value="color.id"
              >
            </label>
          </div>
          <input
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            type="submit"
            value="Add"
          >
        </form>
      </div>
      <div class="md:w-1/2">
        <product :product-data="newProduct" :editable="false"></product>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ProductModel } from '~/assets/js/models/Product'
import { CategoryModel } from '~/assets/js/models/Category'
import { ColorModel } from '~/assets/js/models/Color'
import Product from '~/components/products/Product'

export default {
  components: {
    Product
  },
  data() {
    return {
      products: [],
      newProduct: new ProductModel(),
      categories: [],
      colors: []
    }
  },
  computed: {
    productsMessage: function() {
      return this.products.length > 0
        ? 'These are the products available'
        : 'There are no products yet! Start creating some 👇'
    }
  },
  mounted() {
    this.getCategories()
    this.getColors()
    this.getProducts()
  },
  methods: {
    async getProducts() {
      let res = await axios.get('http://localhost:4000/products')
      for (let product of res.data.results) {
        this.products.push(new ProductModel(product))
      }
       this.assignCategories()
    },
    async createProduct() {
      let params = {
        name: this.newProduct.name,
        price: this.newProduct.price,
        descriptions: this.newProduct.descriptions,
        image: this.newProduct.image,
        category: this.newProduct.category.id,
        colors: this.newProduct.colors
      }
      console.log('llego')

      let res = await axios.post('http://localhost:4000/products', { params })
      console.log(res)
      if (res.data.success) {
        params.category = {
          id: this.newProduct.category.id,
          name: this.newProduct.category.name
        }
        this.products.push(new ProductModel({ ...params, id: res.data.id }))
        this.newProduct = new ProductModel()
      }
    },
    async updateProduct(product) {
      let params = {
        name: product.name,
        description: product.description,
        image: product.image
      }
      let res = await axios.put(
        `http://localhost:4000/category/${product.id}`,
        { params }
      )
      console.log(res)
    },
    async deleteProduct(id) {
      let res = await axios.delete(`http://localhost:4000/product/${id}`)
      console.log(res)

      for (let i = 0; i < this.products.length; i++)
        if (this.products[i].id === id) this.products.splice(i, 1)
    },
    async getCategories() {
      let res = await axios.get('http://localhost:4000/categories')
      for (let category of res.data.results) {
        this.categories.push(new CategoryModel(category).forProduct())
      }
    },
    async getColors() {
      let res = await axios.get('http://localhost:4000/colors')
      for (let color of res.data.results) {
        this.colors.push(new ColorModel(color))
      }
    },
    assignCategories() {
     for(let product of this.products){
        console.log(product)
        for (let category of this.categories) {
          if (product.category == category.id) product.category = category
        }
      }
    },
    assignColors() {
     for(let product of this.products){
        for (let color of this.colors) {
          if (product.colors.includes(color))console.log("aa")
        }
      }
    }
  }
}
</script>

<style>
.product-list {
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
}
.color-picker {
  background-color: var(--bg-color);
}
</style>
