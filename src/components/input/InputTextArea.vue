<template>
  <div class="relative mt-2 rounded-md shadow-sm">
    <label class="text-sm capitalize">{{ label.replace(/_/g, " ") }} {{ required ? "*" : "" }}</label>
    <textarea
      v-model="inputValue"
      id="message"
      rows="4"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Write your thoughts here..."
      :required="required"
      @input="updateValue"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
    keyValue: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: true
    },
    required:{
      type: Boolean,
      required: false,
    },
    value: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup(props, { emit }) {
    const inputValue = ref(props.value);

    watch(() => props.value, (newValue) => {
      inputValue.value = newValue;
    });

    const updateValue = () => {
      emit('update', { key:  props.keyValue || props.label, value: inputValue.value });
    };

    return {
      inputValue,
      updateValue
    };
  }
});
</script>
