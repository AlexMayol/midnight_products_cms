<template>
  <div v-if="!preview">
    <div
      class="bg-white w-full inline-flex flex-col border-solid border-2 border-gray-500 rounded-lg"
    >
      <div
        :style="(color.code) ? 'background-color:' + color.code : 'red'"
        class="w-full h-24 rounded-t-lg border-b-2"
      ></div>
      <span
        class="border-solid border-2 rounded-lg text-center -mt-6 mx-2 p-2 bg-gray-400"
      >{{color.label || 'No name'}}</span>

      <button
        v-if="!editing && editable"
        @click="editing = true"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
      >Edit</button>
      <div v-if="editing" class="px-2">
        <label class="md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2">
          Label
          <input
            v-model="color.label"
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Name for the color"
          >
        </label>

        <label class="md:w-1/2 px-2 text-gray-700 text-sm font-bold mb-2">
          Color
          <input
            v-model="color.code"
            type="color"
            class="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Name for the color"
          >
        </label>
        <button
          @click="updateColor"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
        >OK</button>
        <button
          @click="cancelEditing"
          class="bg-red-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
        >Cancel</button>
      </div>

      <button
        v-if="editable"
        @click="deleteColor"
        class="bg-red-700 hover:bg-red-800 text-white p-2 rounded m-2"
      >Delete this color</button>
    </div>
  </div>
  <div v-else class="inline-flex">
    <div
      :style="(color.code) ? 'background-color:' + color.code : 'red'"
      class="h-8 w-8 rounded m-2"
      :title="color.label"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    colorData: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      required: false,
      default: true
    },
    preview: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      color: this.colorData,
      colorEdit: { ...this.colorData },
      editing: false
    }
  },
  watch: {
    colorData: function(obj) {
      this.color = obj
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
