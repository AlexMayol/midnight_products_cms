<template>
  <div class="container mx-auto my-8 px-4">
    <h2 class="bg-blue-200 my-2 text-center text-xl rounded-lg p-2 font-bold">{{colorMessage}}</h2>
    <section class="color-list">
      <color
        v-for="color of colors"
        :key="color.id"
        :color-data="color"
        @delete="deleteColor"
        @update="updateColor"
      ></color>
    </section>
    <p class="bg-blue-200 my-2 text-center rounded-lg p-2 font-bold">✔️ Add a new color</p>
    <div class="my-2 flex flex-wrap">
      <div class="px-2 md:w-1/2">
        <form class="p-2 bg-white rounded-lg" @submit.prevent="createColor">
          <label class="md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2">
            Name
            <input
              required
              v-model="newColor.label"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Name"
              maxlength="25"
            >
          </label>
          <label class="md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2">
            Color
            <input required v-model="newColor.code" class="w-full h-6 my-2" type="color">
          </label>
          <input
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            type="submit"
            value="Add"
          >
        </form>
      </div>
      <div class="md:w-1/2">
        <color :color-data="newColor" :editable="false"></color>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ColorModel } from '~/assets/js/models/Color'
import Color from '~/components/colors/Color'
import {BaseMixin} from '~/assets/js/mixins/base'
export default {
  mixins:[BaseMixin],
  components: {
    Color
  },
  data() {
    return {
      colors: [],
      newColor: new ColorModel()
    }
  },
  computed: {
    colorMessage: function() {
      return this.colors.length > 0
        ? 'These are the available colors'
        : 'There are no colors yet! Start creating some 👇'
    }
  },
  mounted() {
    this.getColors()
  },
  methods: {
    async getColors() {
      let res = await axios.get(`${this.urlAPI}colors`)
      for (let color of res.data.results) {
        this.colors.push(new ColorModel(color))
      }
    },
    async createColor() {
      let params = {
        code: this.newColor.code,
        label: this.newColor.label
      }
      let res = await axios.post(`${this.urlAPI}colors`, { params })
      console.log(res)
      if (res.data.success) {
        this.colors.push(new ColorModel({ ...params, id: res.data.id }))
        this.newColor = new ColorModel()
      }
    },
    async updateColor(color) {
      let params = {
        code: color.code,
        label: color.label
      }
      let res = await axios.put(
       `${this.urlAPI}color/${color.id}`,
        params
      )
      console.log(res)
    },
    async deleteColor(id) {
      let res = await axios.delete(`${this.urlAPI}color/${id}`)
      console.log(res)

      for (let i = 0; i < this.colors.length; i++)
        if (this.colors[i].id === id) this.colors.splice(i, 1)
    }
  }
}
</script>
<style>
.color-list {
  display: grid;
  grid-gap: 1rem;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 20rem));
}
</style>
