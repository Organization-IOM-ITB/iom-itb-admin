import ApiService from "./api.service";
import { ActionContext, ActionTree, GetterTree, MutationTree, Module } from "vuex";

// Action type constants
export const GET_DANA_BANTUAN = "getDanaBantuan";
export const SET_DANA_BANTUAN = "setDanaBantuan";
export const POST_DANA_BANTUAN = "postDanaBantuan";
export const PUT_DANA_BANTUAN = "putDanaBantuan";
export const DELETE_DANA_BANTUAN = "deleteDanaBantuan";

interface State {
    danaBantuan: any[];
}

// Define initial state
const state: State = {
    danaBantuan: [],
};

// Define getters
const getters: GetterTree<State, State> = {
    danaBantuan(state): any[] {
        return state.danaBantuan; // Return Donation data
    },
};

// Define the Vuex context type
type VuexContext = ActionContext<State, State>;

// Define actions
const actions: ActionTree<State, State> = {
    [GET_DANA_BANTUAN](context: VuexContext, params: Record<string, any>): Promise<any> {
        return new Promise((resolve, reject) => {
            ApiService.get<{ data: any }>("/dana-bantuan", params.data)
                .then(response => {
                    context.commit(SET_DANA_BANTUAN, response);
                    resolve(response);
                })
                .catch(err => {
                    console.error("Error fetching danaBantuan:", err);
                    reject(err);
                });
        });
    },
    [POST_DANA_BANTUAN](context: VuexContext, params: Record<string, any>): Promise<any[]> {
        return new Promise((resolve, reject) => {
            ApiService.post<{ data: any[] }>("/dana-bantuan", params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [PUT_DANA_BANTUAN](context: VuexContext, params: Record<string, any>): Promise<any[]> {
        return new Promise((resolve, reject) => {
            ApiService.put<{ data: any[] }>(`/dana-bantuan/${params.id}`, params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [DELETE_DANA_BANTUAN](context: VuexContext, params: Record<string, any>): Promise<void> {
        return new Promise((resolve, reject) => {
            ApiService.delete(`/dana-bantuan/${params.id}`)
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
};

// Define mutations
const mutations: MutationTree<State> = {
    [SET_DANA_BANTUAN](state, data: any): void {
        state.danaBantuan = data; // Ensure the sent data is in the expected format
    },
};

// Export the Vuex module
const donation: Module<State, any> = {
    state,
    getters,
    actions,
    mutations,
};

export default donation;
