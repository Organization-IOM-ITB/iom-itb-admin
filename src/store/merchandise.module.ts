import ApiService from "./api.service";
import { ActionContext } from "vuex";

export const GET_MERCHANDISES = "getMerchandises";
export const SET_MERCHANDISES = "setMerchandises";
export const POST_MERCHANDISE = "postMerchandise";
export const PUT_MERCHANDISE = "putMerchandise";
export const DELETE_MERCHANDISE = "deleteMerchandise";

// Definisikan tipe untuk merchandise
interface Merchandise {
    id: number; // Ganti dengan tipe yang sesuai
    title: string; // Ganti dengan tipe yang sesuai
    // Tambahkan properti lainnya sesuai dengan struktur data merchandise
}

// Definisikan tipe untuk state
interface State {
    merchandises: Merchandise[];
}

// Definisikan state awal
const state: State = {
    merchandises: [],
};

// Definisikan getters
const getters = {
    merchandises(state: State): Merchandise[] {
        return state.merchandises; // Mengembalikan data merchandise
    },
};

// Definisikan tipe VuexContext
type VuexContext = ActionContext<State, State>;

const actions = {
    [GET_MERCHANDISES](context: VuexContext, params: Record<string, any>): Promise<any> {
        return new Promise((resolve, reject) => {
            ApiService.get<{ data: any }>("/merchandises", params.data)
                .then(response => {
                    context.commit(SET_MERCHANDISES, response);
                    resolve(response);
                })
                .catch(err => {
                    console.error("Error fetching jobs:", err);
                    reject(err);
                });
        });
    },
    [POST_MERCHANDISE](context: VuexContext, params: Record<string, any>): Promise<Merchandise[]>{
        return new Promise((resolve, reject) => {
          ApiService.post<{ data: Merchandise[] }>("/merchandises", params.data)
            .then(async ({ data }) => {
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
    [PUT_MERCHANDISE](context: VuexContext, params: Record<string, any>): Promise<Merchandise[]>{
        return new Promise((resolve, reject) => {
          ApiService.put<{ data: Merchandise[] }>(`/merchandises/${params.id}`, params.data)
            .then(async ({ data }) => {
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
      [DELETE_MERCHANDISE](context: VuexContext, params: Record<string, any>): Promise<Merchandise[]> {
        return new Promise((resolve, reject) => {
          ApiService.delete(`merchandises/${params.id}`).catch((err) => {
            reject(err);
          });
        });
      },
};

const mutations = {
    [SET_MERCHANDISES](state: State, data: Merchandise[]): void {
        state.merchandises = data; // Pastikan data yang dikirim sesuai dengan format yang diharapkan
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
