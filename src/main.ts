import { createApp } from "vue";
import VueApexCharts from "vue3-apexcharts";
import DashboardLayout from "./components/DashboardLayout.vue";
import EmptyLayout from "./components/EmptyLayout.vue";
import store from './store';
import ApiService from "./store/api.service";
import "./assets/tailwind.css";

import App from "./App.vue";
import router from "./router";
const app = createApp(App);
app.component("default-layout", DashboardLayout);
app.component("empty-layout", EmptyLayout);
ApiService.init();

app.use(router).use(store).use(VueApexCharts).mount("#app");
