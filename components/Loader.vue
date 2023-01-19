<template>
  <div class="relative inline-block text-center h-7">
    <div class="relative flex items-center justify-center mt-2 gap-2">
      <span class="dot1 rounded-full w-3 h-3"
            :class="dark ? 'bg-gray-800' : 'bg-gray-50'"></span>
      <span class="dot2 rounded-full w-3 h-3"
            :class="dark ? 'bg-gray-800' : 'bg-gray-50'"></span>
      <span class="dot3 rounded-full w-3 h-3"
            :class="dark ? 'bg-gray-800' : 'bg-gray-50'"></span>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: "ScLoader",
  props: {
    dark: {
      type: Boolean,
      default: () => false
    }
  }
};
</script>
<style>
.dot1 {
  animation: loading 1.5s ease-in-out infinite;
}

.dot2 {
  animation: loading 1.5s ease-in-out infinite 200ms;
}

.dot3 {
  animation: loading 1.5s ease-in-out infinite 400ms;
}

@keyframes loading {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-0.25rem);
  }
  40% {
    transform: translateY(0);
  }
}
</style>
