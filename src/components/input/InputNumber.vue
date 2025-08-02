<template>
    <div class="relative mt-2 rounded-md shadow-sm">
      <label class="text-xs capitalize">{{ label.replace(/_/g, " ") }} {{ required ? "*" : "" }}</label>
      <input
        v-model="inputValue"
        type="number"
        id="number-input"
        aria-describedby="helper-text-explanation"
        min="0"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        :required="required"
        @input="updateValue"
      />
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
        type: Number,
        required: true
      }
    },
    setup(props, { emit }) {
      const inputValue = ref(props.value);
  
      watch(() => props.value, (newValue) => {
        inputValue.value = newValue;
      });

      const updateValue = () => {
        emit('update', { key: props.keyValue || props.label, value: inputValue.value });
      };
  
      return {
        inputValue,
        updateValue
      };
    }
  });
  </script>
  