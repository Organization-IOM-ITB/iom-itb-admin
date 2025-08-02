import ApiService from "./api.service";
import { ActionContext, ActionTree, GetterTree, MutationTree, Module } from "vuex";

// Action type constants
export const GET_HELP_SUBMISSIONS = "getHelpSubmissions";
export const SET_HELP_SUBMISSIONS = "setHelpSubmissions";
export const POST_HELP_SUBMISSION = "postSubmission";
export const PUT_HELP_SUBMISSION = "putSubmission";
export const DELETE_HELP_SUBMISSION = "deleteSubmission";

// Define the HelpSubmission type
interface HelpSubmission {
    id: number; // Update with the appropriate type
    name: string; // Update with the appropriate type
    nim: string; // Update with the appropriate type
    noWhatsapp: string; // Update with the appropriate type
    type: string; // Optional, for an image
    reason?: string[]; // Optional, for an image
    toPropose?: string[]; // Optional, for an image
}

// Define the state type
interface State {
    helpSubmissions: HelpSubmission[];
}

// Define initial state
const state: State = {
    helpSubmissions: [],
};

// Define getters
const getters: GetterTree<State, State> = {
    helpSubmissions(state): HelpSubmission[] {
        return state.helpSubmissions; // Return HelpSubmission data
    },
};

// Define the Vuex context type
type VuexContext = ActionContext<State, State>;

// Define actions
const actions: ActionTree<State, State> = {
    [GET_HELP_SUBMISSIONS](context: VuexContext, params: Record<string, any>): Promise<HelpSubmission[]> {
        return new Promise((resolve, reject) => {
            ApiService.get<{ data: HelpSubmission[] }>("/help-submissions", params.data)
                .then(response => {
                    const { data } = response;
                    context.commit(SET_HELP_SUBMISSIONS, data);
                    resolve(data);
                })
                .catch(err => {
                    console.error("Error fetching HelpSubmissions:", err);
                    reject(err);
                });
        });
    },
    [POST_HELP_SUBMISSION](context: VuexContext, params: Record<string, any>): Promise<HelpSubmission[]> {
        return new Promise((resolve, reject) => {
            ApiService.post<{ data: HelpSubmission[] }>("/help-submissions", params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [PUT_HELP_SUBMISSION](context: VuexContext, params: Record<string, any>): Promise<HelpSubmission[]> {
        return new Promise((resolve, reject) => {
            ApiService.put<{ data: HelpSubmission[] }>(`/help-submissions/${params.id}`, params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [DELETE_HELP_SUBMISSION](context: VuexContext, params: Record<string, any>): Promise<void> {
        return new Promise((resolve, reject) => {
            ApiService.delete(`/help-submissions/${params.id}`)
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
    [SET_HELP_SUBMISSIONS](state, data: HelpSubmission[]): void {
        state.helpSubmissions = data; // Ensure the sent data is in the expected format
    },
};

// Export the Vuex module
const helpSubmissions: Module<State, any> = {
    state,
    getters,
    actions,
    mutations,
};

export default helpSubmissions;
