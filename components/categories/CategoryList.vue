<template>
  <div class="container mx-auto my-8 px-4">
    <h2 class="bg-blue-200 my-2 text-center text-xl rounded-lg p-2 font-bold">{{categoryMessage}}</h2>
    <section class="category-list">
      <category
        v-for="category of categories"
        :key="category.id"
        :category-data="category"
        @delete="deleteCategory"
        @update="updateCategory"
      ></category>
    </section>
    <p class="bg-blue-200 my-2 text-center rounded-lg p-2 font-bold">✔️ Add a new category</p>
    <div class="my-2 flex flex-wrap">
      <div class="px-2 md:w-1/2">
        <form class="p-2 bg-white rounded-lg" @submit.prevent="createCategory">
          <label class="md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2">
            Name
            <input
              required
              v-model="newCategory.name"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Give it a cool name"
              maxlength="25"
            >
          </label>

          <label class="md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2">
            Description of the category
            <input
              required
              v-model="newCategory.description"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="What can you tell about the category?"
            >
          </label>

          <label class="md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2">
            Image for the product
            <input
              v-model="newCategory.image"
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter a valir image URL!"
            >
          </label>
           <input
            class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            type="submit"
            value="Add"
          >
        </form>
      </div>
      <!-- Preview -->
      <div class="md:w-1/2">
        <category :category-data="newCategory" :editable="false"></category>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { CategoryModel } from '~/assets/js/models/Category'
import Category from '~/components/categories/Category'
import {BaseMixin} from '~/assets/js/mixins/base'

export default {
  mixins:[BaseMixin],
  components: {
    Category
  },
  data() {
    return {
      categories: [],
      newCategory: new CategoryModel()
    }
  },
  computed: {
    categoryMessage: function() {
      return this.categories.length > 0
        ? 'These are the available categories'
        : 'There are no categories yet! Start creating some 👇'
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      let res = await axios.get(`${this.urlAPI}categories`)
      for (let category of res.data.results) {
        this.categories.push(new CategoryModel(category))
      }
    },
    async createCategory() {
      let params = {
        name: this.newCategory.name,
        description: this.newCategory.description,
        image: this.newCategory.image
      }
      let res = await axios.post(`${this.urlAPI}categories`, { params })

      if (res.data.success) {
        this.categories.push(new CategoryModel({ ...params, id: res.data.id }))
        this.newCategory = new CategoryModel()
      }
    },
    async updateCategory(category) {
      let params = {
        name: category.name,
        description: category.description,
        image: category.image
      }
      let res = await axios.put(
        `${this.urlAPI}category/${category.id}`,
        params
      )
      console.log(res)
    },
    async deleteCategory(id) {
      let res = await axios.delete(`${this.urlAPI}category/${id}`)
      console.log(res)

      for (let i = 0; i < this.categories.length; i++)
        if (this.categories[i].id === id) this.categories.splice(i, 1)
    }
  }
}
</script>
<style>
.category-list {
  display: grid;
  grid-gap: 1rem;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 20rem));
}
</style>
