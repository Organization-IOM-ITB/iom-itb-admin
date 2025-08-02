import ApiService from "./api.service";
import { ActionContext, ActionTree, GetterTree, MutationTree, Module } from "vuex";

// Action type constants
export const GET_MEMBERS = "getMembers";
export const SET_MEMBERS = "setMembers";
export const POST_MEMBER = "postMember";
export const PUT_MEMBER = "putMember";
export const DELETE_MEMBER = "deleteMember";

// Define the Member type
interface Member {
    id: number; // Update with the appropriate type
    code: string; // Update with the appropriate type
    parentName: string; // Update with the appropriate type
    childNim: string; // Update with the appropriate type
    noWhatsapp: string; // Update with the appropriate type
    picture?: string; // Optional, for an image
    // Add other properties as per the member structure
}

// Define the state type
interface State {
    members: Member[];
}

// Define initial state
const state: State = {
    members: [],
};

// Define getters
const getters: GetterTree<State, State> = {
    members(state): Member[] {
        return state.members; // Return member data
    },
};

// Define the Vuex context type
type VuexContext = ActionContext<State, State>;

// Define actions
const actions: ActionTree<State, State> = {
    [GET_MEMBERS](context: VuexContext, params: Record<string, any>): Promise<Member[]> {
        return new Promise((resolve, reject) => {
            ApiService.get<{ data: Member[] }>("/members", params.data)
                .then(response => {
                    const { data } = response;
                    context.commit(SET_MEMBERS, data);
                    resolve(data);
                })
                .catch(err => {
                    console.error("Error fetching members:", err);
                    reject(err);
                });
        });
    },
    [POST_MEMBER](context: VuexContext, params: Record<string, any>): Promise<Member[]> {
        return new Promise((resolve, reject) => {
            ApiService.post<{ data: Member[] }>("/members", params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [PUT_MEMBER](context: VuexContext, params: Record<string, any>): Promise<Member[]> {
        return new Promise((resolve, reject) => {
            ApiService.put<{ data: Member[] }>(`/members/${params.id}`, params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [DELETE_MEMBER](context: VuexContext, params: Record<string, any>): Promise<void> {
        return new Promise((resolve, reject) => {
            ApiService.delete(`/members/${params.id}`)
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
    [SET_MEMBERS](state, data: Member[]): void {
        state.members = data; // Ensure the sent data is in the expected format
    },
};

// Export the Vuex module
const member: Module<State, any> = {
    state,
    getters,
    actions,
    mutations,
};

export default member;
