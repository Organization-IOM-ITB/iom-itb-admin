<template>
    <div class="relative mt-2 rounded-md shadow-sm">
        <label class="text-sm capitalize">{{ label.replace(/_/g, " ") }} {{ required && ('*') }}</label>
        <select 
          id="countries" 
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
          @change="updateValue"
          v-model="inputValue"
          :required="required"
          >
          <option v-for="(v,i) in options" :key="i" :value="v" >{{ v }}</option>
        </select>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';

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
      default: ''  // Menyediakan nilai default jika tidak ada value
    },
    options: {
      type: Array,
      required: false,
      default: () => []  // Menyediakan array kosong sebagai default
    }
  },
  setup(props, { emit }) {
    const inputValue = ref(props.value);

    // Watch props.value to reactively update inputValue
    watch(() => props.value, (newValue) => {
      inputValue.value = newValue;
    });

    // Initialize inputValue when the component is first mounted
    onMounted(() => {
      inputValue.value = props.value;
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
