<template>
  <div class="pt-10 pb-4 flex flex-col item-center gap-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start my-4">
      <div class="flex flex-col justify-start items-center gap-4">
        <h5 class="text-md font-gray-300">Created</h5>
        <p class="text-xl font-gray-500 font-medium">{{ convert(secret.createdAt) }}</p>
      </div>
      <div class="flex flex-col justify-start items-center gap-4">
        <h5 class="text-md font-gray-300">Expire at</h5>
        <p class="text-xl font-gray-500 font-medium">{{ convert(secret.expiresAt, true) }}</p>
      </div>
      <div class="flex flex-col justify-start items-center gap-4">
        <h5 class="text-md font-gray-300">Remaining Views</h5>
        <p class="text-xl font-gray-500 font-medium">{{ secret.remainingViews }}</p>
      </div>
    </div>
    <div class="bg-blue-50 border-2 rounded-md border-blue-300 text-gray-600 p-4">
      <h5 class="text-gray-500 font-md mb-4">Encrypted text</h5>
      <p>{{secret.hash}}</p>
    </div>
    <div class="bg-blue-50 border-2 rounded-md border-blue-300 text-gray-600 p-4">
      <h5 class="text-gray-500 font-md mb-4">Secret text</h5>
      <p>{{secret.secretText}}</p>
    </div>
  </div>
</template>

<script lang="ts">

import { EncryptedSecret } from "~/models/secret.model";

export default {
  name: "SCSecretEncrypted",
  props: {
    secret: {
      type: EncryptedSecret,
      default: () => null
    }
  },
  methods: {
    convert(millis: number, isShort: boolean) {
      const date = new Date(millis);
      return (isShort ? '' : `${date.getFullYear()}.${date.getMonth()}.${date.getFullYear()} `)
        + `${date.getHours()}:${date.getMinutes()}`;
    }
  }
};
</script>
