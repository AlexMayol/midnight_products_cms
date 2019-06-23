<template>
  <div class="container mx-auto my-8 px-4">
    <h2 class="bg-blue-200 my-2 text-center text-xl rounded-lg p-2 font-bold">{{productsMessage}}</h2>
    <section class="product-list">
      <product
        v-for="product of products"
        :key="product.id"
        :product-data="product"
        :color-data="colors"
        :category-data="categories"
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
              <input v-model="newProduct.colors" type="checkbox" name="color_check" :value="color">
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
import {BaseMixin} from '~/assets/js/mixins/base'

export default {
  mixins:[BaseMixin],
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
        ? 'These are the available products'
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
      let res = await axios.get(`${this.urlAPI}products`)
      for (let product of res.data.results) {
        this.products.push(new ProductModel(product))
      }
      this.assignCategories()
      this.assignColors()
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

      let res = await axios.post(`${this.urlAPI}products`, { params })

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
        price: product.price,
        image: product.image,
        category: product.category.id,
        descriptions: product.descriptions,
        image: product.image,
        colors: product.colors
      }
      let res = await axios.put(`${this.urlAPI}product/${product.id}`, {
        params
      })
      console.log(res)
    },
    async deleteProduct(id) {
      let res = await axios.delete(`${this.urlAPI}product/${id}`)

      for (let i = 0; i < this.products.length; i++)
        if (this.products[i].id === id) this.products.splice(i, 1)
    },
    async getCategories() {
      let res = await axios.get(`${this.urlAPI}categories`)
      for (let category of res.data.results) {
        this.categories.push(new CategoryModel(category).forProduct())
      }
    },
    async getColors() {
      let res = await axios.get(`${this.urlAPI}colors`)
      for (let color of res.data.results) {
        this.colors.push(new ColorModel(color))
      }
    },
    assignCategories() {
      for (let product of this.products) {
        for (let category of this.categories) {
          if (product.category == category.id) product.category = category
        }
      }
    },
    assignColors() {
      for (let product of this.products) {
        for (let color of this.colors) {
          if (product.colors && product.colors.includes(color.id)) {
            let i = product.colors.indexOf(color.id)
            product.colors[i] = color
          }
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
  grid-template-columns: repeat(auto-fit, minmax(20rem, 30rem));
}
@media (max-width: 400px) {
  .product-list {
    display: block;
  }
}
.color-picker {
  background-color: var(--bg-color);
}
</style>
