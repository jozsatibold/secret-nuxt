<template>
  <section class="w-screen h-screen bg-gray-800 items-center justify-center flex">
    <article class="rounded-2xl shadow-lg hover:shadow-lg mb-[20vh] bg-gray-50 hover:shadow-gray-600 ease-in-out duration-300 transition-all shadow-gray-700 md:px-12 px-6 md:py-10 py-4">
      <h2 class="text-xl text-gray-700">{{title}}</h2>
      <slot></slot>
    </article>
  </section>
</template>

<script>
export default {
  name: "BasePage",
  props: ['title']
}
</script>
