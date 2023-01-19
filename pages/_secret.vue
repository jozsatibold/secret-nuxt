<template>
  <BasePage :title="'Secret data'">
    <div v-if="isLoading" class="flex flex-col items-center pt-8 gap-4">
      <ScLoader :dark="true" />
      <h5 class="text-lg text-center  font-medium text-gray-400">Data is loading</h5>
    </div>
    <div v-else-if="error" class="w-full gap-2 flex flex-col items-center">
      <SCMessage  :message="error" :type="'error'" />
      <SCButton @buttonClicked="navigateToHome">New secret</SCButton>
    </div>
    <div v-else class="w-full gap-2 flex flex-col items-center">
      <SCSecretEncrypted :secret="secret"/>
      <SCButton @buttonClicked="navigateToHome">New secret</SCButton>
    </div>
  </BasePage>
</template>

<script lang="ts">
import Vue from "vue";
import ScLoader from "~/components/Loader.vue";
import SCMessage from "~/components/Message.vue";
import SCButton from "~/components/Button.vue";
import SCSecretEncrypted from "~/layouts/SecretEncrypted.vue";
import { EncryptedSecret } from "~/models/secret.model";

export default Vue.extend({
  name: "SecretPage",
  components: { SCSecretEncrypted, SCButton, SCMessage, ScLoader },
  data(): {
    secret: EncryptedSecret | null,
    error: string,
    isLoading: boolean
  } {
    return {
      secret: null,
      error: "",
      isLoading: true
    };
  },
  async mounted() {
    try {
      const response = await this.$axios.get(`/api/secrets/${this.$route.params.secret || ""}`);
      this.secret = response.data as EncryptedSecret;
      this.isLoading = false;
    } catch (error) {
      if ((error as Error).message.includes("404")) {
        this.error = "Secret not found or expired";
      } else if ((error as Error).message.includes("401")) {
        this.error = "Invalid secret";
      } else {
        this.error = "Something went wrong. Please try again later";
      }
      this.isLoading = false;
    }
  },
  methods: {
    navigateToHome() {
      this.$router.push('/')
    }
  }
});
</script>
