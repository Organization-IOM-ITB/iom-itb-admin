<template>
  <div class="relative mt-2 rounded-md">
    <label class="text-sm capitalize flex items-center space-x-2">
      <input
        type="checkbox"
        class="text-blue-500 rounded focus:ring-blue-500 focus:border-blue-500"
        v-model="checked"
        @change="updateValue"
      />
      <span>{{ label.replace(/_/g, " ") }} {{ required ? "*" : "" }}</span>
    </label>
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
      type: Boolean,
      required: false
    }
  },
  setup(props, { emit }) {
    const checked = ref(props.value);

    watch(() => props.value, (newValue) => {
      checked.value = newValue;
    });

    const updateValue = () => {
      emit('update', { key: props.keyValue || props.label, value: checked.value });
    };

    return {
      checked,
      updateValue
    };
  }
});
</script>
