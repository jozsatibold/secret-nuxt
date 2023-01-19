<template>
  <article>{{ secret }}</article>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from "@nuxt/types";

export default Vue.extend({
  name: 'SecretPage',
  asyncData(ctx: Context): Promise<object | void> | object | void {
    return {secret: ctx.params.secret}
  }
})
</script>
