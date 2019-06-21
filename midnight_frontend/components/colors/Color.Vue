<template>
  <div class="inline-flex flex-col border-solid border-2 border-gray-500 rounded-lg m-2">
  <div :style="(color.code) ? 'background-color:' + color.code : 'red'" class="w-full h-16 rounded-t-lg border-b-2"></div>
    <span class="border-solid border-2 rounded-lg text-center -mt-6 mx-2 p-2 bg-gray-400">{{color.label || 'Sin nombre'}}</span>

    <button v-if="!editing" @click="editing = true">Edit</button>
    <div v-if="editing">
      <input v-model="color.label" type="text" class="w-full">
      <input v-model="color.code" type="color">
    </div>
    <button v-if="editing" @click="updateColor">OK</button>
    <button v-if="editing" @click="cancelEditing">Cancel</button>
    <!-- <div v-if="editing"></div> -->

    <button @click="deleteColor" class="border-solid border-2 border-red-900">Delete this color</button>
  </div>
</template>

<script>
export default {
  props: {
    colorData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      color: this.colorData,
      colorEdit: { ...this.colorData },
      editing: false
    }
  },
  methods: {
    cancelEditing() {
      this.color = { ...this.colorEdit }
      this.editing = false
    },
    updateColor() {
      this.$emit('update', this.color)
      this.editing = false
      this.colorEdit = { ...this.color }
    },
    deleteColor() {
      this.$emit('delete', this.color.id)
    }
  }
}
</script>
