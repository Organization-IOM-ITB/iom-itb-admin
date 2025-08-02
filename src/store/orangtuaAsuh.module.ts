import ApiService from "./api.service";
import { ActionContext } from "vuex";

// Constants for actions and mutations
export const GET_ORANGTUA_ASUH = "getOrangtuaAsuh";
export const SET_ORANGTUA_ASUH = "setOrangtuaAsuh";
export const POST_ORANGTUA_ASUH = "postOrangtuaAsuh";
export const PUT_ORANGTUA_ASUH = "putOrangtuaAsuh";
export const DELETE_ORANGTUA_ASUH = "deleteOrangtuaAsuh";


// Define the state type
interface State {
    orangtuaAsuh: any[];
}

// Define the initial state
const state: State = {
    orangtuaAsuh: [],
};

// Define getters
const getters = {
    orangtuaAsuh(state: State): any[] {
        return state.orangtuaAsuh; // Return the list of orangtuaAsuh
    },
};

// Define the VuexContext type (with a generic RootState)
type VuexContext = ActionContext<State, any>;

const actions = {
    [GET_ORANGTUA_ASUH](context: VuexContext, params: Record<string, any>): Promise<any> {
        return new Promise((resolve, reject) => {
            ApiService.get<{ data: any }>("/orangtua-asuh", params.data)
                .then(response => {
                    context.commit(SET_ORANGTUA_ASUH, response);
                    resolve(response);
                })
                .catch(err => {
                    console.error("Error fetching orangtuaAsuh:", err);
                    reject(err);
                });
        });
    },
    [POST_ORANGTUA_ASUH](context: VuexContext, params: Record<string, any>): Promise<any[]> {
        return new Promise((resolve, reject) => {
            ApiService.post<{ data: any[] }>("/orangtua-asuh", params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    console.error("Error creating activity:", err);
                    reject(err);
                });
        });
    },
    [PUT_ORANGTUA_ASUH](context: VuexContext, params: Record<string, any>): Promise<any[]> {
        return new Promise((resolve, reject) => {
            ApiService.put<{ data: any[] }>(`/orangtua-asuh/${params.id}`, params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    console.error("Error updating activity:", err);
                    reject(err);
                });
        });
    },
    [DELETE_ORANGTUA_ASUH](context: VuexContext, params: Record<string, any>): Promise<void> {
        return new Promise((resolve, reject) => {
            ApiService.delete(`/orangtua-asuh/${params.id}`)
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
    [SET_ORANGTUA_ASUH](state: State, data: any[]): void {
        state.orangtuaAsuh = data; // Set the state with the fetched OrangtuaAsuh data
    },
};

// Export the Vuex store module
export default {
    state,
    getters,
    actions,
    mutations,
};
