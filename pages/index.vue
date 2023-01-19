<template>
  <BasePage :title="'Encrypt the text and share it with someone'">
    <SCSecretForm v-if="!data" @data="dataSaved"/>
    <SCSavedSecret v-else :saved-data="data" @newSecret="newSecret"/>
  </BasePage>
</template>
<script lang="ts">

import Vue from "vue";
import "@/assets/css/tailwind.css";
import BasePage from "~/components/BasePage.vue";
import SCSecretForm from "~/layouts/SecretForm.vue";
import SCSavedSecret from "~/layouts/SavedSecret.vue";
import { SavedSecret } from "~/models/secret.model";

export default Vue.extend({
  name: "IndexPage",
  components: { SCSavedSecret, SCSecretForm, BasePage },
  data(): { data: SavedSecret  | null} {
    return {
      data: null
    };
  },
  methods: {
    dataSaved(data: SavedSecret) {
      this.data = data;
    },
    newSecret() {
      this.data = null;
    }
  }
});
</script>
