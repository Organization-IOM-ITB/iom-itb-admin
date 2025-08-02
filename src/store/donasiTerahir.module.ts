import ApiService from "./api.service";
import { ActionContext, ActionTree, GetterTree, MutationTree, Module } from "vuex";

// Action type constants
export const GET_DONATIONS = "getDonations";
export const SET_DONATIONS = "setDonations";
export const POST_DONATION = "postDonation";
export const PUT_DONATION = "putDonation";
export const DELETE_DONATION = "deleteDonation";

// Define the Donation type
interface Donation {
    id: number; // Update with the appropriate type
    name: string; // Update with the appropriate type
    email: string; // Update with the appropriate type
    noWhatsapp: string; // Update with the appropriate type
    proof?: string; // Optional, for an image
    notification?: string[]; // Optional, for an image
}

// Define the state type
interface State {
    donations: Donation[];
}

// Define initial state
const state: State = {
    donations: [],
};

// Define getters
const getters: GetterTree<State, State> = {
    donations(state): Donation[] {
        return state.donations; // Return Donation data
    },
};

// Define the Vuex context type
type VuexContext = ActionContext<State, State>;

// Define actions
const actions: ActionTree<State, State> = {
    [GET_DONATIONS](context: VuexContext, params: Record<string, any>): Promise<any> {
        return new Promise((resolve, reject) => {
            ApiService.get<{ data: any }>("/donations/admin", params.data)
                .then(response => {
                    context.commit(SET_DONATIONS, response);
                    resolve(response);
                })
                .catch(err => {
                    console.error("Error fetching Donations:", err);
                    reject(err);
                });
        });
    },
    [POST_DONATION](context: VuexContext, params: Record<string, any>): Promise<Donation[]> {
        return new Promise((resolve, reject) => {
            ApiService.post<{ data: Donation[] }>("/donations", params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [PUT_DONATION](context: VuexContext, params: Record<string, any>): Promise<Donation[]> {
        return new Promise((resolve, reject) => {
            ApiService.put<{ data: Donation[] }>(`/donations/${params.id}`, params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [DELETE_DONATION](context: VuexContext, params: Record<string, any>): Promise<void> {
        return new Promise((resolve, reject) => {
            ApiService.delete(`/donations/${params.id}`)
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
    [SET_DONATIONS](state, data: any): void {
        state.donations = data; // Ensure the sent data is in the expected format
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
