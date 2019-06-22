<template>
  <div
    class="bg-white w-full p-2 inline-flex flex-col border-solid border-2 border-gray-500 rounded-lg"
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
    <p class="text-center font-bold">{{product.price || 'No price'}} €</p>
    <p class="text-center font-bold">Category: {{product.category.name}}</p>

    <!-- <div v-if="product.colors && product.colors.length > 0">
      <color v-for="color of product.colors" :key="color.code" :editable="false"></color>
    </div>
    <div v-else>No colors available</div> -->

    <button v-if="editable" @click="deleteProduct" class="bg-red-800 text-white p-2 rounded mt-2">Delete this product</button>
  </div>
</template>

<script>
import Color from '../colors/Color';
export default {
  props: {
    ProductData: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  components:{
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
