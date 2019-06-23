<template>
<div>
  <div
    class="bg-white w-full inline-flex flex-col border-solid border-2 border-gray-500 rounded-lg"
  >
    <div
    :class="{'h-32':category.image}"
      class="w-full category"
      :style="(category.image) ? 'background-image: url(' + category.image +');  ' : 'none'"
    ></div>
    <span
    :class="{'-mt-6':category.image}"
      class="border-solid border-2 rounded-lg text-center  mx-2 p-2 bg-gray-400"
    >{{category.name || 'No name'}}</span>
    <p class="p-2">{{category.description || 'No description'}}</p>

    <button
      v-if="!editing && editable"
      @click="editing = true"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
    >Edit</button>
    <div v-if="editing" class="p-2">
      <label class="md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2">
        Name
        <input
          v-model="category.name"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Name of the category"
        >
      </label>

      <label class="md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2">
        Description
        <textarea
          v-model="category.description"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Description of the category"
        ></textarea>
      </label>

      <input v-model="category.image" type="text" class="w-full">
      <button
        @click="updateCategory"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
      >OK</button>
      <button
        @click="cancelEditing"
        class="bg-red-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
      >Cancel</button>
    </div>

    <button
      v-if="editable"
      @click="deleteCategory"
      class="bg-red-700 hover:bg-red-800 text-white p-2 rounded m-2"
    >Delete this category</button>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    CategoryData: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      category: this.CategoryData,
      categoryEdit: { ...this.CategoryData },
      editing: false
    }
  },
  watch: {
    CategoryData: function(obj) {
      this.category = obj
    }
  },
  methods: {
    cancelEditing() {
      this.category = { ...this.categoryEdit }
      this.editing = false
    },
    updateCategory() {
      this.$emit('update', this.category)
      this.editing = false
      this.categoryEdit = { ...this.category }
    },
    deleteCategory() {
      this.$emit('delete', this.category.id)
    }
  }
}
</script>

<style scoped>
.category {
  background-size: cover;
  background-position: center;
}
</style>
