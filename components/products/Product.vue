<template>
  <div>
    <div
      class="bg-white w-full inline-flex flex-col border-solid border-2 border-gray-500 rounded-lg"
    >
      <div
        v-if="product.image"
        class="h-40 w-full product rounded"
        :style="(product.image) ? 'background-image: url(' + product.image +');  ' : 'none'"
      ></div>
      <span
        :class="{'-mt-6': product.image}"
        class="border-solid border-2 rounded-lg text-center mx-2 p-2 bg-gray-400"
      >{{product.name || 'No name'}}</span>
      <span class="text-center">
        <img class="w-4 inline-block" src="~/assets/images/en_flag.png" alt>
        {{product.descriptions.en || 'No english description'}}
      </span>
      <span class="text-center">
        <img class="w-4 inline-block" src="~/assets/images/es_flag.png" alt>
        {{product.descriptions.es || 'No spanish description'}}
      </span>
      <span class="text-center">
        <img class="w-4 inline-block" src="~/assets/images/de_flag.png" alt>
        {{product.descriptions.de || 'No german description'}}
      </span>
      <p class="text-center font-bold">
        {{product.price || 'No price'}}
        <span v-if="product.price">€</span>
      </p>
      <p class="text-center font-bold">Category: {{product.category.name}}</p>

      <div v-if="product.colors && product.colors.length > 0">
        <p>Available in these awesome colors:</p>
        <color
          v-for="color of product.colors"
          :color-data="color"
          preview
          :key="color.id"
          :editable="false"
        ></color>
      </div>
      <div v-else class="m-2">No colors available</div>

      <button
        v-if="!editing && editable"
        @click="editing = true"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
      >Edit</button>
      <div v-if="editing" class="m-2">
        <label class="md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2">
          Name
          <input
            required
            v-model="product.name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Name"
          >
        </label>
        <label class="md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2">
          Price of the product
          <input
            required
            v-model="product.price"
            type="number"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Price"
          >
        </label>
        <label class="md:w-full px-2 text-gray-700 text-sm font-bold mb-2">
          English description
          <input
            required
            v-model="product.descriptions.en"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="English description"
          >
        </label>
        <label class="md:w-full px-2 text-gray-700 text-sm font-bold mb-2">
          Spanish description
          <input
            v-model="product.descriptions.es"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Spanish description"
          >
        </label>
        <label class="md:w-full px-2 text-gray-700 text-sm font-bold mb-2">
          German description
          <input
            v-model="product.descriptions.de"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="German description"
          >
        </label>

        <label class="md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2">
          Image for the product
          <input
            v-model="product.image"
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter a valir image URL!"
          >
        </label>
        <label class="md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2">
          Category of the product
          <select
            required
            v-model="product.category"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option
              v-for="category of CategoryData"
              :value="category"
              :key="category.id"
            >{{category.name}}</option>
          </select>
        </label>
        <div class="flex flex-wrap">
          <p
            class="md:w-full px-2 text-gray-700 text-sm font-bold mb-2"
          >select the colors of the product:</p>
        </div>
        <div class="flex flex-wrap">
          <label v-for="color of ColorData" :key="color.id" class="p-2">
            <div
              class="color-picker w-8 h-8 border-radius-md"
              :title="color.label"
              :style="{ '--bg-color': color.code}"
            ></div>
            <input v-model="product.colors" type="checkbox" name="color_check" :value="color">
          </label>
        </div>

        <button
          @click="updateProduct"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
        >OK</button>
        <button
          @click="cancelEditing"
          class="bg-red-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
        >Cancel</button>
      </div>
      <button
        v-if="editable"
        @click="deleteProduct"
        class="bg-red-800 text-white p-2 rounded m-2"
      >Delete this product</button>
    </div>
  </div>
</template>

<script>
import Color from '../colors/Color'
export default {
  props: {
    ProductData: {
      type: Object,
      required: true
    },
    CategoryData: {
      type: Array,
      required: false
    },
    ColorData: {
      type: Array,
      required: false
    },
    editable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  components: {
    Color
  },
  data() {
    return {
      product: this.ProductData,
      productEdit: { ...this.ProductData },
      editing: false
    }
  },
  watch: {
    ProductData: function(obj) {
      this.product = obj
    }
  },
  methods: {
    cancelEditing() {
      this.product = { ...this.productEdit }
      this.editing = false
    },
    updateProduct() {
      this.$emit('update', this.product)
      this.editing = false
      this.productEdit = { ...this.product }
    },
    deleteProduct() {
      this.$emit('delete', this.product.id)
    }
  }
}
</script>

<style scoped>
.product {
  background-size: cover;
  background-position: center;
}
</style>
