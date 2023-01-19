<template>
  <button
    :type="type"
    class="py-2 min-h-[2.5rem] px-4 rounded-md text-sm font-medium leading-5
     text-white bg-blue-600 hover:bg-blue-500 focus:outline-none
     focus:shadow-outline-blue active:bg-blue-800"
    @click="buttonClicked">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'SCButton',
  props: {
    buttonText: {
      type: String,
      default: "Submit",
    },
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['submit', 'button', 'reset'].includes(value)
    }
  },
  methods: {
    buttonClicked() {
      this.$emit("buttonClicked");
    },
  }
}
</script>
