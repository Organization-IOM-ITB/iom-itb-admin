<template>
    <div class="relative mt-2 rounded-md shadow-sm">
      <label class="text-sm capitalize">{{ label.replace(/_/g, " ") }} {{ required ? "*" : "" }}</label>
  
      <!-- Input untuk upload gambar -->
      <input
        type="file"
        accept="image/*"
        @change="onFileChange"
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        :required="required"
      />
  
      <!-- Preview Gambar -->
      <div v-if="imageUrl" class="mt-4">
        <img :src="imageUrl" alt="Image preview" class="rounded-md shadow-lg w-32 h-32 object-cover" />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
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
        required: true
      }
    },
    setup(props, { emit }) { // Use 'props' correctly
      const imageUrl = ref<string | null>(props.value || null);
  
      // Fungsi untuk menangani perubahan file yang diupload
      const onFileChange = (event: Event) => {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files[0]) {
          const file = fileInput.files[0];
          const reader = new FileReader();
  
          reader.onload = (e: ProgressEvent<FileReader>) => {
            imageUrl.value = e.target?.result as string;
            emit('update', { key: props.keyValue || props.label, value: file }); // Emit file gambar yang diunggah ke parent
          };
  
          reader.readAsDataURL(file); // Membaca file gambar
        }
      };
  
      return {
        imageUrl,
        onFileChange
      };
    }
  });
  </script>
  