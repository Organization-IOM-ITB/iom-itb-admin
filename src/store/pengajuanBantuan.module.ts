import ApiService from "./api.service";
import { ActionContext } from "vuex";

// Constants for actions and mutations
export const GET_PENGAJUAN_BANTUAN = "getPengajuanBantuan";
export const SET_PENGAJUAN_BANTUAN = "setPengajuanBantuan";
export const POST_PENGAJUAN_BANTUAN = "postPengajuanBantuan";
export const PUT_PENGAJUAN_BANTUAN = "putPengajuanBantuan";
export const DELETE_PENGAJUAN_BANTUAN = "deletePengajuanBantuan";


// Define the state type
interface State {
    pengajuanBantuan: any[];
}

// Define the initial state
const state: State = {
    pengajuanBantuan: [],
};

// Define getters
const getters = {
    pengajuanBantuan(state: State): any[] {
        return state.pengajuanBantuan; // Return the list of pengajuanBantuan
    },
};

// Define the VuexContext type (with a generic RootState)
type VuexContext = ActionContext<State, any>;

const actions = {
    [GET_PENGAJUAN_BANTUAN](context: VuexContext, params: Record<string, any>): Promise<any> {
        return new Promise((resolve, reject) => {
            ApiService.get<{ data: any }>("/pengajuan-bantuan", params.data)
                .then(response => {
                    context.commit(SET_PENGAJUAN_BANTUAN, response);
                    resolve(response);
                })
                .catch(err => {
                    console.error("Error fetching pengajuanBantuan:", err);
                    reject(err);
                });
        });
    },
    [POST_PENGAJUAN_BANTUAN](context: VuexContext, params: Record<string, any>): Promise<any[]> {
        return new Promise((resolve, reject) => {
            ApiService.post<{ data: any[] }>("/pengajuan-bantuan", params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    console.error("Error creating activity:", err);
                    reject(err);
                });
        });
    },
    [PUT_PENGAJUAN_BANTUAN](context: VuexContext, params: Record<string, any>): Promise<any[]> {
        return new Promise((resolve, reject) => {
            ApiService.put<{ data: any[] }>(`/pengajuan-bantuan/${params.id}`, params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    console.error("Error updating activity:", err);
                    reject(err);
                });
        });
    },
    [DELETE_PENGAJUAN_BANTUAN](context: VuexContext, params: Record<string, any>): Promise<void> {
        return new Promise((resolve, reject) => {
            ApiService.delete(`/pengajuan-bantuan/${params.id}`)
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    console.error("Error deleting activity:", err);
                    reject(err);
                });
        });
    },
};

// Define mutations
const mutations = {
    [SET_PENGAJUAN_BANTUAN](state: State, data: any[]): void {
        state.pengajuanBantuan = data; // Set the state with the fetched PengajuanBantuan data
    },
};

// Export the Vuex store module
export default {
    state,
    getters,
    actions,
    mutations,
};
