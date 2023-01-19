<template>
  <div
    v-if="show"
    :class="type === 'error' ? 'bg-red-500' : 'bg-blue-400'"
    class="text-sm mt-2 mb-2 px-4 py-3 rounded-md font-medium leading-5 text-white">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "SCMessage",
  props: {
    message: {
      type: String,
      default: () => ""
    },
    type: {
      type: String,
      default: () => "success",
      validator: (value) => ["success", "error"].includes(value)
    }
  },
  computed: {
    show() {
      return !!this.message;
    }
  }
};
</script>
