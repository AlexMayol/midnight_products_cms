<template>
  <div class="bg-white w-full inline-flex flex-col border-solid border-2 border-gray-500 rounded-lg m-2">
    <div
      :style="(color.code) ? 'background-color:' + color.code : 'red'"
      class="w-full h-32 rounded-t-lg border-b-2"
    ></div>
    <span
      class="border-solid border-2 rounded-lg text-center -mt-6 mx-2 p-2 bg-gray-400"
      >{{color.label || 'No name'}}</span>

    <button v-if="!editing && editable" @click="editing = true">Edit</button>
    <div v-if="editing">
      <input v-model="color.label" type="text" class="w-full">
      <input v-model="color.code" type="color">
    </div>
    <button v-if="editing" @click="updateColor">OK</button>
    <button v-if="editing" @click="cancelEditing">Cancel</button>

    <button
      v-if="editable"
      @click="deleteColor"
    class="bg-red-800 text-white p-2 rounded mt-2"
    >Delete this color</button>
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
