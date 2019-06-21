<template>
  <div class="container mx-auto my-8 px-4">
    <h2>{{colorMessage}}</h2>
    <section class="color-list">
      <color
        v-for="color of colors"
        :key="color.id"
        :color-data="color"
        @delete="deleteColor"
        @update="updateColor"
      ></color>
    </section>

    <form @submit.prevent="createColor">
      <fieldset>
        <legend>Add a new color:</legend>
        <label>
          Name of the color
          <input v-model="newLabel" type="text" maxlength="25">
        </label>

        <label>
          Code of the color
          <input v-model="newCode" type="color">
        </label>
      </fieldset>
      <input type="submit" value="Add">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { ColorModel } from '~/assets/js/models/Color'
import Color from '~/components/colors/Color'

export default {
  components: {
    Color
  },
  data() {
    return {
      colors: [],
      newLabel: null,
      newCode: '#ffffff'
    }
  },
  computed:{
    colorMessage: function(){
      return (this.colors.length > 0) ? 'These are the colors available' : 'There are not colors yet! Start creating some 👇'
    }
  },
  mounted() {
    this.getColors()
  },
  methods: {
    async getColors() {
      let res = await axios.get('http://localhost:4000/colors')
      for (let color of res.data.results) {
        this.colors.push(new ColorModel(color))
      }
    },
    async createColor() {
      let params = {
        code: this.newCode,
        label: this.newLabel
      }
      let res = await axios.post('http://localhost:4000/colors', { params })
      console.log(res)
      if (res.data.success) {
        params.id = res.data.id
        this.colors.push(new ColorModel(params))
      }
    },
    async updateColor(color) {
      let params = {
        code: color.code,
        label: color.label
      }
      let res = await axios.put(
        `http://localhost:4000/color/${color.id}`,
        params
      )
      console.log(res)
    },
    async deleteColor(id) {
      let res = await axios.delete(`http://localhost:4000/color/${id}`)
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
  grid-template-columns: repeat(auto-fit, minmax(5rem, 12rem));
}
</style>
