<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <img :src="require('@/assets/image/logo.png')" alt="IOM-ITB" class="w-[60px]" />
        <span class="text-2xl font-semibold text-gray-700">IOM-Dashboard</span>
      </div>
      <form class="mt-4" @submit.prevent="login">
        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
        <label class="block">
          <span class="text-sm text-gray-700">Email</span>
          <input
            type="email"
            class="
              block
              w-full
              mt-1
              border
              border-gray-200
              rounded-md
              focus:border-indigo-600
              focus:ring
              focus:ring-opacity-40
              focus:ring-indigo-500
              p-2
            "
            v-model="email"
            required
          />
        </label>

        <label class="block mt-3 relative">
          <span class="text-sm text-gray-700">Password</span>
          <input
            :type="showPassword ? 'text' : 'password'"
            class="
              block
              w-full
              mt-1
              border
              border-gray-200
              rounded-md
              focus:border-indigo-600
              focus:ring
              focus:ring-opacity-40
              focus:ring-indigo-500
              p-2
            "
            v-model="password"
            required
          />
          <span class="absolute inset-y-0 top-[40%] right-0 flex items-center pr-3 cursor-pointer text-black w-[32px]" @click="showPassword = !showPassword">
            <IcEyeClose v-if="showPassword"/>
            <IcEyeOpen v-else/>
          </span>
        </label>

        <!-- <div class="flex items-center justify-between mt-4">
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="
                  text-indigo-600
                  border-gray-200
                  rounded-md
                  focus:border-indigo-600
                  focus:ring
                  focus:ring-opacity-40
                  focus:ring-indigo-500
                "
              />
              <span class="mx-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <div>
            <a
              class="block text-sm text-indigo-700 fontme hover:underline"
              href="#"
              >Forgot your password?</a
            >
          </div>
        </div> -->

        <div class="mt-6">
          <button
            type="submit"
            class="
              w-full
              px-4
              py-2
              text-sm text-center text-white
              bg-indigo-600
              rounded-md
              focus:outline-none
              hover:bg-indigo-500
            "
            :disabled="isLoading"
          >
            {{ isLoading ? "Loading..." : "Sign in"}}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { POST_LOGIN } from "@/store/auth.module";
import { useStore } from "vuex";
import IcEyeOpen from "@/assets/svg/ic-eye-open.vue";
import IcEyeClose from "@/assets/svg/ic-eye-close.vue";

// Initialize Vuex store and router
const store = useStore();

// Reactive state for email, password, and error message
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");
const showPassword = ref(false);

// Function to handle login
async function login() {
  // Reset the error message before validation
  errorMessage.value = "";
  const payload = {
    data:{
      email: email.value,
      password: password.value
    }
  };

  try {
    isLoading.value = true;
    const data = await store.dispatch(POST_LOGIN, payload);

    if (data?.token) {
      // Set the cookie with token
      const expires = new Date();
      expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
      document.cookie = `PSSID=${data.token}; path=/; secure; expires=${expires.toUTCString()}`;
      
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } else {
      // If invalid, show error message
      errorMessage.value = data;
    }
  } catch (error:any) {
    errorMessage.value = error?.message;
  }finally{
    isLoading.value = false
  }
}
</script>
