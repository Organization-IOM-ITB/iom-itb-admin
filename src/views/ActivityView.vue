<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb :breadcrumb="title" />

    <!-- Modal -->
    <ModalForm
      v-if="isOpened"
      :id="currentId"
      :title="`${currentId? 'Edit' : 'Add'} ${title}`"
      :data="dataUpdate"
      @close="handleModalClose"
    />

    <!-- Table -->
    <div class="mt-8">

      <div class="mt-6">
        <h2 class="text-xl font-semibold leading-tight text-gray-700">{{ title }}</h2>

        <div class="flex flex-col mt-3 sm:flex-row justify-between">
          <div class="flex items-center">
          <div class="flex">
            <div class="relative">
              <select
                class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                v-model="limit"
                @change="getData"
              >
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="20">20</option>
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
              v-model="search"
              @input="getData"
            />
          </div>
        </div>
          <button
            class="flex justify-between items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            @click="openModal"
          >
          <IcPlus/>
            Add
          </button>
        </div>

        <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div
            class="inline-block min-w-full overflow-hidden rounded-lg shadow"
          >
            <table class="min-w-full leading-normal">
              <thead>
                <tr v-if="isLoading">
                  <td colspan="20" class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    Loading...
                  </td>
                </tr>
                <tr>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    Gambar
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    Judul
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    Tanggal
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    URL Detail Kegiatan
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    Deskripsi
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
                <tr v-if="isLoading">
                  <td colspan="20" class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    Loading...
                  </td>
                </tr>
                <tr v-else v-for="(u, index) in computedData" :key="index">
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        <img
                          v-if="u?.image"
                          class="w-[50px] h-[50px] rounded-[4px]"
                          :src="u.image" 
                          alt="activity image"
                        />
                        <img
                          v-else
                          class="w-[50px] h-[50px] rounded-[4px]"
                          :src="require('@/assets/image/default.png')"
                          alt="default image"
                        />
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <p class="text-gray-900 whitespace-nowrap">{{ u?.title }}</p>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <p class="text-gray-900 whitespace-nowrap">{{ u?.date }}</p>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <p class="text-gray-900 break-words w-[150px]">{{ u?.url }}</p>
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <p class="text-gray-900 whitespace-pre-line w-[300px]" style="word-wrap: break-word">{{ truncate(u?.description, 300) }}</p>
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
                        <button class="mx-2 px-2 rounded-md cursor-pointer" @click.prevent="editItem(u)">
                          <IcEdit/>
                        </button>
                          <button type="button" class="mx-2 px-2 rounded-md cursor-pointer" @click.prevent="deleteItem(u.id)">
                             <IcTrash/>
                          </button>
                          <a :href="u?.url?.split(':')?.[1]?.length > 0 ? u.url :`https://iom-itb.id/kegiatan/${u.url}`" target="_blank" class="mx-2 px-2 rounded-md cursor-pointer w-[34px] text-blue-600">
                          <IcLink/>
                        </a>
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
                >Showing {{ pagination?.start }} to {{ pagination?.end }} of {{ pagination?.totalEntries }}  Entries</span
              >
              <div class="inline-flex mt-2 xs:mt-0">
                <button
                    class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400"
                    :disabled="page <= 1"
                    @click="()=>{page = pagination?.currentPage - 1; getData()}"
                  >
                    Prev
                  </button>
                  <button
                    class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400"
                    :disabled="page >= pagination?.totalPages"
                    @click="()=>{page = pagination?.currentPage + 1; getData()}"
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
import { GET_ACTIVITIES, DELETE_ACTIVITY } from "@/store/activity.module";
import ModalForm from "../components/modal/FormActivity.vue";
import { useStore } from 'vuex'; // Impor useStore dari Vuex
import Breadcrumb from '../partials/AppBreadcrumb.vue';
import Swal from 'sweetalert2';
import IcTrash from '@/assets/svg/ic-trash.vue';
import IcEdit from '@/assets/svg/ic-edit.vue';
import { truncate } from '@/utils';
import IcLink from '@/assets/svg/ic-link.vue';
import IcPlus from '@/assets/svg/ic-plus.vue';

// Mengambil data tabel
const store = useStore(); // Mengambil instance store

const isOpened = ref(false); 
const isLoading = ref(true); 
const dataUpdate = ref([]); 
const currentId = ref(undefined); 
const page = ref(1);
const limit = ref(5);
const search = ref(""); 
const title = ref("Kegiatan"); 

const openModal = () => {
  isOpened.value = true; // Open the modal
};

const handleModalClose = async () => {
  isOpened.value = false; // Close the modal
  dataUpdate.value = [];
  currentId.value = undefined
  await getData();
};

// Contoh penggunaan computed
const computedData = computed(() => {
  const activities = store.getters.activities; // Menggunakan store di sini
  return activities?.data || []; // Menghindari undefined
});

const pagination = computed(() => {
  const activities = store.getters.activities; // Menggunakan store di sini
  return activities?.pagination || []; // Menghindari undefined
});

// Fungsi untuk mengambil data
const getData = async () => {
  const params = {
      search: search.value,
      limit: limit.value,
      page: page.value,
  };
  const data = await store.dispatch(GET_ACTIVITIES, params);
  isLoading.value = false;
  return data;
};

// Contoh penggunaan onMounted
onMounted(async () => {
  await getData(); // Memanggil fungsi untuk mengambil data
  console.log('Komponen telah dimount, data siap digunakan');
});

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
            await store.dispatch(DELETE_ACTIVITY, params);
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
            } catch (err) {
              console.log(err);
            }
          }
        });
};
</script>