import ApiService from "./api.service";
import { ActionContext } from "vuex";

// Constants for actions and mutations
export const GET_DONASI = "getDonasi";
export const SET_DONASI = "setDonasi";
export const POST_DONASI = "postDonasi";
export const PUT_DONASI = "putDonasi";
export const DELETE_DONASI = "deleteDonasi";


// Define the state type
interface State {
    donasi: any[];
}

// Define the initial state
const state: State = {
    donasi: [],
};

// Define getters
const getters = {
    donasi(state: State): any[] {
        return state.donasi; // Return the list of donasi
    },
};

// Define the VuexContext type (with a generic RootState)
type VuexContext = ActionContext<State, any>;

const actions = {
    [GET_DONASI](context: VuexContext, params: Record<string, any>): Promise<any> {
        return new Promise((resolve, reject) => {
            ApiService.get<{ data: any }>("/donasi", params.data)
                .then(response => {
                    context.commit(SET_DONASI, response);
                    resolve(response);
                })
                .catch(err => {
                    console.error("Error fetching donasi:", err);
                    reject(err);
                });
        });
    },
    [POST_DONASI](context: VuexContext, params: Record<string, any>): Promise<any[]> {
        return new Promise((resolve, reject) => {
            ApiService.post<{ data: any[] }>("/donasi", params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    console.error("Error creating activity:", err);
                    reject(err);
                });
        });
    },
    [PUT_DONASI](context: VuexContext, params: Record<string, any>): Promise<any[]> {
        return new Promise((resolve, reject) => {
            ApiService.put<{ data: any[] }>(`/donasi/${params.id}`, params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    console.error("Error updating activity:", err);
                    reject(err);
                });
        });
    },
    [DELETE_DONASI](context: VuexContext, params: Record<string, any>): Promise<void> {
        return new Promise((resolve, reject) => {
            ApiService.delete(`/donasi/${params.id}`)
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
    [SET_DONASI](state: State, data: any[]): void {
        state.donasi = data; // Set the state with the fetched donasi data
    },
};

// Export the Vuex store module
export default {
    state,
    getters,
    actions,
    mutations,
};
