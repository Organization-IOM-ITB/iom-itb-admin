<template>
    <div class="relative mt-2 rounded-md shadow-sm">
      <label class="text-sm capitalize">{{ label.replace(/_/g, " ") }} {{ required ? "*" : "" }}</label>
      
      <!-- Pilihan mode (URL atau Upload) -->
      <div class="mt-2">
        <label class="inline-flex items-center">
          <input type="radio" value="url" v-model="mode" class="mr-2" /> URL
        </label>
        <label class="inline-flex items-center ml-4">
          <input type="radio" value="upload" v-model="mode" class="mr-2" /> Upload Image
        </label>
      </div>
  
      <!-- Input URL (mode 'url') -->
      <div v-if="mode === 'url'" class="mt-4">
        <InputText
          type="text"
          label="imagu Url"
          keyValue="imageUrl"
          placeholder="Enter image URL"
          :value="imageUrl || ''"
          @update="updateValue"
          :required="required"
        />
      </div>
  
      <!-- Input untuk upload gambar (mode 'upload') -->
      <div v-if="mode === 'upload'" class="mt-4">
        <input
          type="file"
          accept="image/*"
          @change="onFileChange"
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          :required="required"
        />
      </div>
  
      <!-- Preview Gambar -->
      <div v-if="imageUrl" class="mt-4">
        <img :src="imageUrl" alt="Image preview" class="rounded-md shadow-lg w-32 h-32 object-cover" />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import InputText from './InputText.vue';
  
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
    components: {
      InputText,
    },
    setup(props, { emit }) {
      const mode = ref('url'); // Mode default 'url'
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
  
      const updateValue = (params: { key: string; value: string }) => {
        imageUrl.value = params.value;
        emit('update', { key: props.keyValue || props.label, value: imageUrl.value });
      };
  
      // Watcher untuk mendeteksi perubahan pada mode dan mengupdate value
      watch(mode, (newMode) => {
        if (newMode === 'url') {
          imageUrl.value = props.value || null; // Reset ke URL jika mode 'url'
        } else if (newMode === 'upload') {
          imageUrl.value = null; // Reset ke null jika mode 'upload'
        }
      });
  
      return {
        mode,
        imageUrl,
        onFileChange,
        updateValue
      };
    }
  });
  </script>
  