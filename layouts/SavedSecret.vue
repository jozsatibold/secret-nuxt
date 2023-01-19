<template>
  <div class="pt-10 flex flex-col item-center gap-6">
    <h4 class="text-lg font-gray-400 font-medium">We have successfully encrypted the given text</h4>
    <div class="grid grid-cols-2 gap-2 text-center mb-4">
      <div class="flex flex-col justify-start item-center gap-4">
        <h5 class="text-md font-gray-300">Expiration</h5>
        <p class="text-xl font-gray-500 font-medium">{{ savedData.expireAfter }} mins</p>
      </div>
      <div class="flex flex-col justify-start items-center gap-4">
        <h5 class="text-md font-gray-300">Number of views</h5>
        <p class="text-xl font-gray-500 font-medium">{{ savedData.expireAfterView }}</p>
      </div>
    </div>
    <div
      class="rounded-md mb-8 border-2 border-blue-400 bg-blue-50 flex
     overflow-hidden gap-2 justify-between">
      <input
        ref="link"
        type="text"
        disabled
        :value="`${host}/${savedData.secret}`"
        class="p-4 w-full flex max-w-[289px] max-h-[55px] text-blue-900 whitespace-nowrap
       overflow-y-hidden overflow-x-auto"/>
      <button
        class="bg-blue-400 p-2 h-full w-20 text-white h-14 hover:bg-blue-500
        ease-in-out duration-300 transition-colors font-medium block"
        @click="copyToClipboard">Copy
      </button>
    </div>
    <SCButton @buttonClicked="requestNewSecret">New secret</SCbutton>
  </div>
</template>

<script>
import SCButton from "~/components/Button.vue";

export default {
  name: "SCSavedSecret",
  components: { SCButton },
  props: ['savedData'],
  computed: {
    host() {
      return window.location.origin;
    }
  },
  methods: {
    requestNewSecret() {
      this.$emit("newSecret");
    },
    copyToClipboard() {
      // Copy the text inside the text field
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.savedData.secret);
      } else {
        this.$refs.link.disabled=false;
        this.$refs.link.focus()
        this.$refs.link.select()
        this.$refs.link.setSelectionRange(0, 99999);
        document.execCommand("copy")
        this.$refs.link.disabled=true;
      }
    }
  }
};
</script>
