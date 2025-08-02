<template>
  <div class="mt-2">
    <label class="text-sm capitalize font-[600]">
      {{ label.replace(/_/g, " ") }} {{ required ? "*" : "" }}
    </label>
    <input type="text" :value="checked" :required="required" class="cursor-default w-[1px] h-[1px] opacity-0" autocomplete="false" readonly />
    <div
      v-for="(option, index) in options"
      :key="index"
      class="flex items-center space-x-2"
    >
      <input
        type="checkbox"
        :value="option"
        v-model="checked"
        @change="updateValue"
        class="text-blue-500 rounded focus:ring-blue-500 focus:border-blue-500"
      />
      <span class="capitalize">{{ option }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from "vue";

export default defineComponent({
  name: "InputCheckboxGroup",
  components: {
  },
  props: {
    keyValue: {
      type: String as PropType<string>,
      required: false,
    },
    label: {
      type: String as PropType<string>,
      required: true,
    },
    value: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => [],
    },
    options: {
      type: Array as PropType<string[]>,
      required: true,
    },
    required: {
      type: Boolean as PropType<boolean>,
      required: false,
    },
  },
  setup(props, { emit }) {
    const checked = ref<string[]>(props.value);

    // Watch for external value changes
    watch(
      () => props.value,
      (newValue) => {
        checked.value = newValue;
      }
    );

    // Emit changes when the value updates
    const updateValue = () => {
      emit("update", {
        key: props.keyValue || props.label,
        value: checked.value,
      });
    };

    return {
      checked,
      updateValue,
    };
  },
});
</script>

<style scoped>
/* Tambahkan style custom Anda di sini jika diperlukan */
</style>
