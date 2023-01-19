<template>
  <div class="relative rounded-md shadow-sm w-full">
    <label v-if="label" class="block text-sm font-medium leading-5 text-gray-700">{{ label }}</label>
    <input
      :placeholder="placeholder"
      :disabled="disabled"
      type="number"
      :max="+max"
      :min="+min"
      :class="{'border-red-500': hasError }"
      v-model="text"
      class="form-input disabled:bg-gray-200 py-3 px-4 block w-full leading-5 rounded-md transition
       duration-150 ease-in-out bg-white border border-gray-300 placeholder-gray-500
       border-2 resize-none
       rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
      @click="inputClicked"
      @input="textChanged"
    />
    <div v-if="hasError" class="text-red-500 text-xs">
      Required
    </div>

  </div>
</template>

<script>

export default {
  name: "NumberInput",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: null
    },
    min: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: ""
    },
    value: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      hasError: false,
      touched: false,
      text: this.value
    };
  },
  methods: {
    textChanged() {
      this.hasError = !this.text;
      this.$emit("text-changed", this.text);
    },
    inputClicked() {
      this.touched = true;
      this.hasError = !this.text;
    }
  }
};
</script>
