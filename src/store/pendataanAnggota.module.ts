import ApiService from "./api.service";
import { ActionContext } from "vuex";

// Constants for actions and mutations
export const GET_PENDATAAN_ANGGOTA = "getPendataanAnggota";
export const SET_PENDATAAN_ANGGOTA = "setPendataanAnggota";
export const POST_PENDATAAN_ANGGOTA = "postPendataanAnggota";
export const PUT_PENDATAAN_ANGGOTA = "putPendataanAnggota";
export const DELETE_PENDATAAN_ANGGOTA = "deletePendataanAnggota";


// Define the state type
interface State {
    pendataanAnggota: any[];
}

// Define the initial state
const state: State = {
    pendataanAnggota: [],
};

// Define getters
const getters = {
    pendataanAnggota(state: State): any[] {
        return state.pendataanAnggota; // Return the list of pendataanAnggota
    },
};

// Define the VuexContext type (with a generic RootState)
type VuexContext = ActionContext<State, any>;

const actions = {
    [GET_PENDATAAN_ANGGOTA](context: VuexContext, params: Record<string, any>): Promise<any> {
        return new Promise((resolve, reject) => {
            ApiService.get<{ data: any }>("/pendataan-anggota", params.data)
                .then(response => {
                    context.commit(SET_PENDATAAN_ANGGOTA, response);
                    resolve(response);
                })
                .catch(err => {
                    console.error("Error fetching pendataanAnggota:", err);
                    reject(err);
                });
        });
    },
    [POST_PENDATAAN_ANGGOTA](context: VuexContext, params: Record<string, any>): Promise<any[]> {
        return new Promise((resolve, reject) => {
            ApiService.post<{ data: any[] }>("/pendataan-anggota", params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    console.error("Error creating activity:", err);
                    reject(err);
                });
        });
    },
    [PUT_PENDATAAN_ANGGOTA](context: VuexContext, params: Record<string, any>): Promise<any[]> {
        return new Promise((resolve, reject) => {
            ApiService.put<{ data: any[] }>(`/pendataan-anggota/${params.id}`, params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    console.error("Error updating activity:", err);
                    reject(err);
                });
        });
    },
    [DELETE_PENDATAAN_ANGGOTA](context: VuexContext, params: Record<string, any>): Promise<void> {
        return new Promise((resolve, reject) => {
            ApiService.delete(`/pendataan-anggota/${params.id}`)
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
    [SET_PENDATAAN_ANGGOTA](state: State, data: any[]): void {
        state.pendataanAnggota = data; // Set the state with the fetched pendataanAnggota data
    },
};

// Export the Vuex store module
export default {
    state,
    getters,
    actions,
    mutations,
};
