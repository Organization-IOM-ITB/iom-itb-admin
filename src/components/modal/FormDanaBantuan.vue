<template>
  <div class="fixed z-[998] bg-black top-0 right-0 w-full h-screen opacity-[0.4]"></div>
  <div class="fixed z-[999] flex justify-center items-center w-screen h-screen top-0 right-0" @click="closeModal">
    <div ref="modalContent" @click.stop>
      <div class="md:w-[500px] max-w-[500px] overflow-hidden bg-white border rounded-md shadow-md">
        <form @submit.prevent="handleSubmit">
          <div class="flex items-center justify-between px-5 py-3 text-gray-700 border-b">
            <h3 class="text-sm capitalize">{{ title }}</h3>
            <button type="button" @click="closeModal">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="px-5 py-6 text-gray-700 bg-gray-200 border-b max-h-[80vh] overflow-y-scroll">
            <InputText label="Nama" keyValue="nama" :value="data?.nama" @update="updateValue" :required="true" />
            <InputText label="Nim" keyValue="nim" :value="data?.nim" @update="updateValue" :required="true" />
            <InputText label="Program Studi" keyValue="program_studi" :value="data?.program_studi" @update="updateValue" :required="true" />
            <InputSelect label="Jenis Bantuan" keyValue="jenis_bantuan" :options="['Biaya UKT', 'Biaya Hidup', 'Biaya Tugas Akhir', 'Biaya Kesehatan (Bagi yang membutuhkan dan bersifat darurat)', 'Bantuan Orang Tua Asuh', 'Bantuan Lainnya']" :value="data?.jenis_bantuan" @update="updateValue" :required="true" />
            <InputSelect label="Bulan" keyValue="bulan" :options="['Januari', 'Febuari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']"  :value="data?.bulan" @update="updateValue" :required="true" />
            <InputText label="Tahun" keyValue="tahun" :value="data?.tahun" @update="updateValue" :required="true" />
            <InputPrice label="Jumlah Donasi" keyValue="jumlah_donasi" :value="data?.jumlah_donasi" @update="updateValue" :required="true" />
          </div>

          <div class="flex items-center justify-between px-5 py-3">
            <button type="button" @click="closeModal" class="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none">
              Cancel
            </button>
            <button type="submit" :disabled="isLoading" class="px-3 py-1 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none">
              {{ isLoading ? 'Loading...' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import InputText from '@/components/input/InputText.vue';
import { useStore } from 'vuex';
import { POST_DANA_BANTUAN, PUT_DANA_BANTUAN } from "@/store/danaBantuan.module";
import InputPrice from '../input/InputPrice.vue';
import InputSelect from '../input/InputSelect.vue';

export default defineComponent({
  components: {
    InputText,
    InputPrice,
    InputSelect
  },
  props: {
    title: {
      type: String,
      required: true
    },
    id:{
      type: String,
      required: false
    },
    data: {
      type: Object,
      required: false,
      default: () => ({}) // Provide a default object to prevent undefined errors
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const modalContent = ref(null);
    const isLoading = ref(false);

    const closeModal = () => {
      isLoading.value = false;
      emit('close');
    };

    const formData = {
      id: '',
      data: {} as Record<string, any>
    }

    const updateValue = (params: { key: string; value: any }) => {
      formData.data[params.key] = params.value;
    };

    const handleSubmit = async () => {
      isLoading.value = true;
      try {
        if(props?.id){
          formData.id = props?.id
          await store.dispatch(PUT_DANA_BANTUAN, formData);
        }else{
          await store.dispatch(POST_DANA_BANTUAN, formData);
        }
        closeModal();
      } catch (error:any) {
        alert(error?.response?.data?.message);
        isLoading.value = false;
      }
    };

    return {
      modalContent,
      closeModal,
      handleSubmit,
      updateValue,
      isLoading
    };
  },
});
</script>
