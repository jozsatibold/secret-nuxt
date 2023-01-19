<template>
  <div class="pt-10 flex flex-col item-center gap-6">
      <TextArea
        placeholder="Write a text"
        label="Type a secret text"
        @text-changed="textChanged" />
    <NumberInput
      placeholder="Time in minutes"
      label="Expiration"
      :max="120"
      :min="5"
      :value="60"
      @text-changed="expirationChanged" />
    <SCMessage v-if="error" :message="error" />
    <SCButton @buttonClicked="submit">
      <ScLoader v-if="isLoading" />
      <template v-else>Encrypt text</template>
    </SCbutton>
  </div>
</template>

<script>
import SCMessage from "~/components/Message.vue";
import ScLoader from "~/components/Loader.vue";
import SCButton from "~/components/Button.vue";
import TextArea from "~/components/TextArea.vue";

export default {
  name: "SCSecretForm",
  components: { SCMessage, ScLoader, SCButton, TextArea },
  data() {
    return {
      text: "",
      expiration: 60,
      isLoading: false,
      error: ""
    };
  },
  methods: {
    textChanged(text) {
      this.text = text;
    },

    expirationChanged(expiration) {
      this.expiration = expiration;
    },

    async submit() {
      if (!this.text || this.isLoading) {
        return;
      }
      try {
        this.isLoading = true;
        this.error = "";
        const response = await this.$axios.post("/api/secrets", {
          text: this.text,
          expiration: +this.expiration
        });
        this.isLoading = false;
        this.$emit("data", response.data);
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    }
  }
};
</script>
