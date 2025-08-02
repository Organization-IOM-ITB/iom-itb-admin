<template>
    <div class="fixed z-[998] bg-black top-0 right-0 w-full h-screen opacity-[0.4]"></div>
    <div class="fixed z-[999] flex justify-center items-center w-screen h-screen top-0 right-0" @click="closeModal">
      <div ref="modalContent" @click.stop>
        <div class="md:w-[500px] max-w-[500px] overflow-hidden bg-white border rounded-md shadow-md pb-[50px]">
          
          <!-- Print Button -->
          <div class="flex justify-end p-4">
            <button @click="printCard" class="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none">
              Print
            </button>
          </div>
  
          <!-- Card Preview -->
          <div id="printableArea" class="mt-5 flex justify-center">
            <div class="relative w-[300px] h-[500px]">
              <img src="@/assets/image/card-member.png" alt="Card Background" class="absolute inset-0 w-full h-full object-cover">
              <div class="absolute inset-0 flex flex-col items-center justify-center text-white mt-[-30px]">
                <div class="w-[190px] h-[190px] rounded-full overflow-hidden bg-white mb-[40px]">
                  <img :src="data?.picture || '/placeholder.png'" alt="Profile Picture" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-col items-center gap-4">
                  <p class="text-xl !text-[#ffff] font-semibold tracking-widest whitespace-pre-line" style="word-wrap: break-word">{{ data?.parentName || 'Nama Orang Tua' }}</p>
                  <p class="text-lg !text-[#ffff] tracking-widest">{{ data?.code || 'NIM Anak' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useStore } from 'vuex';
  import { POST_MEMBER, PUT_MEMBER } from "@/store/member.module";
  
  export default defineComponent({
    props: {
      title: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: false
      },
      data: {
        type: Object,
        required: false,
        default: () => ({})
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
      };
  
      const updateValue = (params: { key: string; value: any }) => {
        formData.data[params.key] = params.value;
      };
  
      const handleSubmit = async () => {
        isLoading.value = true;
        try {
          if (props?.id) {
            formData.id = props?.id;
            await store.dispatch(PUT_MEMBER, formData);
          } else {
            await store.dispatch(POST_MEMBER, formData);
          }
          closeModal();
        } catch (error) {
          console.error('Failed to create merchandise:', error);
          alert(error);
          isLoading.value = false;
        }
      };
  
      // Print function
      const printCard = () => {
        const printContents = document.getElementById("printableArea")?.innerHTML;
        const originalContents = document.body.innerHTML;
  
        if (printContents) {
          document.body.innerHTML = printContents;
          window.print();
          document.body.innerHTML = originalContents;
          window.location.reload(); // Reload to restore original content
        }
      };
  
      return {
        modalContent,
        closeModal,
        handleSubmit,
        updateValue,
        isLoading,
        printCard
      };
    },
  });
  </script>

<style scoped>
@media print {
  #printableArea {
    color: #ffffff !important;
    background-color: #ffffff !important;
  }
}
</style>

  