<template>
  <div class="relative mt-2 rounded-md shadow-sm">
    <label class="text-sm capitalize">{{ label.replace(/_/g, " ") }} {{ required ? "*" : "" }}</label>
    <input
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      :value="formattedValue"
      @input="onInput"
      :required="required"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
      type: [String, Number],
      required: false,
      default: ''
    }
  },
  computed: {
    formattedValue(): string {
      const numberValue = parseInt(this.value.toString());
      if (isNaN(numberValue)) return '';

      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(numberValue);
    }
  },
  methods: {
    onInput(event: Event) {
      const input = event.target as HTMLInputElement;
      let rawValue = input.value.replace(/\D/g, ''); // Remove all non-digit characters

      if (rawValue === '') {
        this.$emit('update', {  key:this.keyValue || this.label, value: '' });
        return;
      }
      // Emit the raw numeric value
      this.$emit('update', { key: this.keyValue || this.label, value: parseInt(rawValue, 10) });

      // Reformat the input value to Rupiah format
      input.value = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(parseInt(rawValue, 10));
    }
  }
});
</script>
