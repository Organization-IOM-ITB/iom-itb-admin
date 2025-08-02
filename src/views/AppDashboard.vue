<template>
  <div>
    <Breadcrumb breadcrumb="" />
    <!--Banner get you to github repo-->
    <Banner />
    <div class="mt-4">
      <h1>Selamat Datang, Admin IOM.</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Banner from "../partials/AppBanner.vue";
import Breadcrumb from "../partials/AppBreadcrumb.vue";
interface User {
  name: string;
  email: string;
  title: string;
  title2: string;
  status: string;
  role: string;
}

const testUser: User = {
  name: "John Doe",
  email: "john@example.com",
  title: "Software Engineer",
  title2: "Web dev",
  status: "Active",
  role: "Owner",
};

const users = ref<User[]>([...Array(10).keys()].map(() => testUser));
</script>
