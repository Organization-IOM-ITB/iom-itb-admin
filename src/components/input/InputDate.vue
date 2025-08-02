<template>
  <div class="relative mt-2 rounded-md shadow-sm">
    <label class="text-sm capitalize">{{ label.replace(/_/g, " ") }} {{ required ? "*" : "" }}</label>
    <input
      type="date"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      v-model="inputValue"
      @input="updateValue"
      :required="required"
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
      type: String,
      required: false
    }
  },
  setup(props, { emit }) {
    const inputValue = ref(formatDate(props.value));

    // Watcher untuk memperbarui nilai input saat prop value berubah
    watch(() => props.value, (newValue) => {
      inputValue.value = formatDate(newValue);
    });

    const updateValue = () => {
      emit('update', { key: props.keyValue || props.label, value: inputValue.value });
    };

    // Fungsi untuk memformat tanggal ISO ke YYYY-MM-DD
    function formatDate(isoString: string | undefined): string {
      if (!isoString) return ''; // Jika value undefined atau kosong, return empty string
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0, jadi perlu ditambah 1
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    return {
      inputValue,
      updateValue
    };
  }
});
</script>
