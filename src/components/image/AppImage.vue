<template>
  <img v-if="src" :src="src" title="icon" alt="icon" class="w-[24px]" />
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true
    },
  },
});
</script>
