<template>
  <div v-if="show" :class="messageClass">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'SCMessage',
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'success',
      validator: (value) => ['success', 'error'].includes(value)
    }
  },
  computed: {
    show() {
      return !!this.message
    },
    messageClass() {
      return `text-sm px-4 py-3 rounded-md font-medium leading-5 text-white bg-${this.type === 'error' ? 'red' : 'green'}-500`
    }
  }
}
</script>
