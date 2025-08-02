import { createStore } from "vuex";
import auth from "./auth.module";
import activity from "./activity.module";
import merchandise from "./merchandise.module";
import member from "./member.module";
import donasiTerakhir from "./donasiTerahir.module";
import helpSubmission from "./helpSubmission.module";
import transaction from "./transaction.module";
import upload from "./upload.module";
import danaBantuan from "./danaBantuan.module";
import pendataanAnggota from "./pendataanAnggota.module";
import pengajuanBantuan from "./pengajuanBantuan.module";
import orangtuaAsuh from "./orangtuaAsuh.module";
import donasi from "./donasi.module";

export default createStore({
  modules: {
    auth,
    merchandise,
    member,
    donasiTerakhir,
    helpSubmission,
    activity,
    transaction,
    upload,
    danaBantuan,
    pendataanAnggota,
    pengajuanBantuan,
    orangtuaAsuh,
    donasi,
  },
});
