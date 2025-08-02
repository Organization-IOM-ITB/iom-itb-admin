import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../views/AppDashboard.vue";
import Forms from "../views/AppForms.vue";
import Tables from "../views/AppTables.vue";
import UIElements from "../views/UIElements.vue";
import Merchandises from "../views/MerchandiseView.vue";
import Activities from "../views/ActivityView.vue";
import Transactions from "../views/TransactionView.vue";
import Users from "../views/UserView.vue";
import Members from "../views/MemberView.vue";
import DonasiTerakhir from "../views/DonasiTerakhirView.vue";
import Donasi from "../views/DonasiView.vue";
import HelpSubmissions from "../views/HelpSubmissionView.vue";
import PendataanAnggota from "../views/PendataanAnggotaView.vue";
import Login from "../views/AppLogin.vue";
import Modal from "../views/AppModal.vue";
import Chart from "../views/ChartView.vue";
import Card from "../views/CardView.vue";
import Blank from "../views/BlankView.vue";
import NotFound from "../views/NotFound.vue";
import store from "@/store";
import { FETCH_JWT } from "@/store/auth.module";
import DanaBantuan from "@/views/DanaBantuan.vue";
import PengajuanBantuan from "@/views/PengajuanBantuanView.vue";
import OrangtuaAsuh from "@/views/OrangtuaAsuhView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { layout: "empty" },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/forms",
    name: "Forms",
    component: Forms,
  },
  {
    path: "/cards",
    name: "Cards",
    component: Card,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/ui-elements",
    name: "UIElements",
    component: UIElements,
  },
  {
    path: "/merchandise",
    name: "Merchandise",
    component: Merchandises,
  },
  {
    path: "/kegiatan",
    name: "Kegiatan",
    component: Activities,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/members",
    name: "Members",
    component: Members,
  },
  {
    path: "/10-donasi-terakhir",
    name: "Donasi Trakhir",
    component: DonasiTerakhir,
  },
  {
    path: "/donasi",
    name: "Donasi",
    component: Donasi,
  },
  {
    path: "/dana-bantuan",
    name: "Dana Bantuan",
    component: DanaBantuan,
  },
  {
    path: "/orangtua-asuh",
    name: "Orangtua Asuh",
    component: OrangtuaAsuh,
  },
  {
    path: "/pengajuan-bantuan",
    name: "Pengajuan Bantuan",
    component: PengajuanBantuan,
  },
  {
    path: "/pendataan-anggota",
    name: "Pendataan Anggota",
    component: PendataanAnggota,
  },
  {
    path: "/pendataan-anggota",
    name: "Pendataan Anggota",
    component: PendataanAnggota,
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions,
  },
  {
    path: "/modal",
    name: "Modal",
    component: Modal,
  },
  {
    path: "/charts",
    name: "Chart",
    component: Chart,
  },
  {
    path: "/blank",
    name: "Blank",
    component: Blank,
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Jika bukan halaman login
  if (to.name !== "Login") {
      try {
          // Panggil FETCH_JWT untuk memastikan token/jwt valid
          await store.dispatch(FETCH_JWT);
          next(); // Lanjutkan ke halaman tujuan
      } catch (error) {
          console.error("JWT validation failed:", error);
          // Redirect ke halaman login jika FETCH_JWT gagal
          next({ name: "Login" });
      }
  } else {
      next(); // Langsung ke halaman login tanpa validasi
  }
});

export default router;
