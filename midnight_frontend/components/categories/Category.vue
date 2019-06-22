<template>
  <div
    class="bg-white w-full inline-flex flex-col border-solid border-2 border-gray-500 rounded-lg"
  >
    <div
      class="h-32 w-full category"
      :style="(category.image) ? 'background-image: url(' + category.image +');  ' : 'none'"
    ></div>
    <span
      class="border-solid border-2 rounded-lg text-center -mt-6 mx-2 p-2 bg-gray-400"
    >{{category.name || 'No name'}}</span>
    <p class="p-2">{{category.description || 'No description'}}</p>

    <button v-if="!editing && editable" @click="editing = true">Edit</button>
    <div v-if="editing">
      <input v-model="category.name" type="text" class="w-full">
      <textarea v-model="category.description"></textarea>
      <input v-model="category.image" type="text" class="w-full">
    </div>
    <button v-if="editing" @click="updateCategory">OK</button>
    <button v-if="editing" @click="cancelEditing">Cancel</button>

    <button
      v-if="editable"
      @click="deleteCategory"
   class="bg-red-800 text-white p-2 rounded mt-2"
    >Delete this category</button>
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
