<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb breadcrumb="members" />

    <!-- Modal -->
    <ModalForm
      v-if="isOpened"
      :id="currentId"
      :title="`${currentId? 'Edit' : 'Add'} Members`"
      :data="dataUpdate"
      @close="handleModalClose"
    />

    <ModalGenerate
      v-if="isGenerateOpened"
      :id="currentId"
      :title="`${currentId? 'Edit' : 'Add'} Members`"
      :data="dataUpdate"
      @close="handleModalClose"
    />

    <div v-if="isImageModalOpen" @click="closeImageModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <img :src="selectedImage" alt="Payment Image" class="max-w-full max-h-full"/>
    </div>

    <!-- Table -->
    <div class="mt-8">

      <div class="mt-6">
        <h2 class="text-xl font-semibold leading-tight text-gray-700">Members</h2>

        <div class="flex flex-col mt-3 sm:flex-row justify-between">
          <div class="flex items-center">
          <div class="flex">
            <div class="relative">
              <select
                class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>

              <div
                class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none"
              >
                <svg
                  class="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>

            <div class="relative">
              <select
                class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border-t border-b border-r border-gray-400 rounded-r appearance-none sm:rounded-r-none sm:border-r-0 focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
              >
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <div
                class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none"
              >
                <svg
                  class="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="relative block mt-2 sm:mt-0">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                viewBox="0 0 24 24"
                class="w-4 h-4 text-gray-500 fill-current"
              >
                <path
                  d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
                />
              </svg>
            </span>

            <input
              placeholder="Search"
              class="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-l-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            />
          </div>
        </div>
          <button
            class="flex justify-between items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            @click="openModal"
          >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[25px]">
            <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
          </svg>
            Add
          </button>
        </div>

        <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div
            class="inline-block min-w-full overflow-hidden rounded-lg shadow"
          >
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    Foto
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    Kode
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    Nama Orang Tua
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    NIM Anak
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    No Whatsapp
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    Pengurus IOM?
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                  Orang Tua Asuh?
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    Created at
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    Update at
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    Settings
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(u, index) in computedData" :key="index">
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        <img
                          v-if="u?.picture"
                          class="w-[50px] h-[50px] rounded-[4px] cursor-pointer hover:opacity-[0.8]"
                          :src="u?.picture"
                          alt="profile pic"
                          @click="openImageModal(u?.picture)"
                        />
                        <img
                          v-else
                          class="w-[50px] h-[50px] rounded-[4px] cursor-pointer hover:opacity-[0.8]"
                          :src="require('@/assets/image/default.png')"
                          alt="profile pic"
                          @click="openImageModal(u?.picture)"
                        />
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <p class="text-gray-900 whitespace-nowrap">{{ u?.code }}</p>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <p class="text-gray-900 whitespace-nowrap">{{ u?.parentName }}</p>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <p class="text-gray-900 whitespace-nowrap">{{ u?.childNim }}</p>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <p class="text-gray-900 whitespace-nowrap">{{ u?.noWhatsapp }}</p>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <p class="text-gray-900 whitespace-pre-line" style="word-wrap: break-word">{{ u?.options?.staff ? "Ya" : "Tidak" }}</p>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <p class="text-gray-900 whitespace-nowrap">{{ u?.options?.foster ? "Ya" : "Tidak" }}</p>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ formatDate(u?.createdAt) }}
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ formatDate(u?.updatedAt) }}
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <div class="flex justify-around">
                      <span class="text-yellow-500 flex justify-center">
                        <span class="mx-2 px-2 rounded-md cursor-pointer" @click.prevent="generateItem(u)"
                          ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-sky-700">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                           </svg>
                        </span>
                        <span class="mx-2 px-2 rounded-md cursor-pointer" @click.prevent="editItem(u)"
                          ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-green-700"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                          <button type="button" class="mx-2 px-2 rounded-md cursor-pointer" @click.prevent="deleteItem(u.id)">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-5 w-5 text-red-700"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </button>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between"
            >
              <span class="text-xs text-gray-900 xs:text-sm"
                >Showing 1 to 4 of 50 Entries</span
              >

              <div class="inline-flex mt-2 xs:mt-0">
                <button
                  class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400"
                >
                  Prev
                </button>
                <button
                  class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { GET_MEMBERS, DELETE_MEMBER } from "@/store/member.module";
import ModalForm from "../components/modal/FormMember.vue";
import ModalGenerate from "../components/modal/GenerateCard.vue";
import { useStore } from 'vuex'; // Impor useStore dari Vuex
import Breadcrumb from '../partials/AppBreadcrumb.vue';
import Swal from 'sweetalert2';

// Mengambil data tabel
const store = useStore(); // Mengambil instance store

const isOpened = ref(false); 
const isGenerateOpened = ref(false); 
const dataUpdate = ref([]); 
const currentId = ref(undefined); 
const isImageModalOpen = ref(false);
const selectedImage = ref('');

const openModal = () => {
  isOpened.value = true; // Open the modal
};

const handleModalClose = async () => {
  isOpened.value = false; // Close the modal
  isGenerateOpened.value = false; // Open the modal
  dataUpdate.value = [];
  currentId.value = undefined
  await getData();
  // Emit an event if needed, e.g., refreshing data

};

// Contoh penggunaan computed
const computedData = computed(() => {
  const members = store.getters.members; // Menggunakan store di sini
  return members || []; // Menghindari undefined
});

// Fungsi untuk mengambil data
const getData = async () => {
  const params = {
    limit: 5,
  };
  const data = await store.dispatch(GET_MEMBERS, params);
  return data;
};

// Contoh penggunaan onMounted
onMounted(async () => {
  await getData(); // Memanggil fungsi untuk mengambil data
  console.log('Komponen telah dimount, data siap digunakan');
});

const openImageModal = (imageUrl: string) => {
      selectedImage.value = imageUrl;
      isImageModalOpen.value = true;
    }
const closeImageModal = () => {
      isImageModalOpen.value = false;
}

// Fungsi untuk memformat tanggal
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  
  const date = new Date(dateString);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const formattedDate = date.toLocaleDateString('en-US', options)
    .replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g, (matched) => monthNames[new Date(`${matched} 1`).getMonth()]);

  return formattedDate.replace('AM', 'AM').replace('PM', 'PM');
};

// Inside <script setup>
const editItem = (item:any) => {
  dataUpdate.value = { ...item }; // Copy current item's data to dataUpdate
  currentId.value = item.id; 
  isOpened.value = true; // Open the modal
};

const generateItem = (item:any) => {
  dataUpdate.value = { ...item }; // Copy current item's data to dataUpdate
  currentId.value = item.id; 
  isGenerateOpened.value = true; // Open the modal
};

const deleteItem = async (id: number) => {
   await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
          if (result.isConfirmed) {
            const params = { id: id };
            try {
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
                confirmButtonColor: '#4CAF50',  // Change the color of the "OK" button
                confirmButtonText: "OK"
              }).then(async () => {
                await getData();
              });
              await store.dispatch(DELETE_MEMBER, params);
            } catch (err) {
              console.log(err);
            }
          }
        });
};
</script>