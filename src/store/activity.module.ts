import ApiService from "./api.service";
import { ActionContext } from "vuex";

// Constants for actions and mutations
export const GET_ACTIVITIES = "getActivities";
export const SET_ACTIVITIES = "setActivities";
export const POST_ACTIVITY = "postActivity";
export const PUT_ACTIVITY = "putActivity";
export const DELETE_ACTIVITY = "deleteActivity";

// Define the type for Activity
interface Activity {
    id: number;
    name: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    image: Blob;
}

// Define the state type
interface State {
    activities: Activity[];
}

// Define the initial state
const state: State = {
    activities: [],
};

// Define getters
const getters = {
    activities(state: State): Activity[] {
        return state.activities; // Return the list of activities
    },
};

// Define the VuexContext type (with a generic RootState)
type VuexContext = ActionContext<State, any>;

const actions = {
    [GET_ACTIVITIES](context: VuexContext, params: Record<string, any>): Promise<any> {
        return new Promise((resolve, reject) => {
            ApiService.get<{ data: any }>("/activities", params)
                .then(response => {
                    context.commit(SET_ACTIVITIES, response);
                    resolve(response);
                })
                .catch(err => {
                    console.error("Error fetching activities:", err);
                    reject(err);
                });
        });
    },
    [POST_ACTIVITY](context: VuexContext, params: Record<string, any>): Promise<Activity[]> {
        return new Promise((resolve, reject) => {
            ApiService.post<{ data: Activity[] }>("/activities", params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    console.error("Error creating activity:", err);
                    reject(err);
                });
        });
    },
    [PUT_ACTIVITY](context: VuexContext, params: Record<string, any>): Promise<Activity[]> {
        return new Promise((resolve, reject) => {
            ApiService.put<{ data: Activity[] }>(`/activities/${params.id}`, params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    console.error("Error updating activity:", err);
                    reject(err);
                });
        });
    },
    [DELETE_ACTIVITY](context: VuexContext, params: Record<string, any>): Promise<void> {
        return new Promise((resolve, reject) => {
            ApiService.delete(`/activities/${params.id}`)
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
    [SET_ACTIVITIES](state: State, data: Activity[]): void {
        state.activities = data; // Set the state with the fetched activities data
    },
};

// Export the Vuex store module
export default {
    state,
    getters,
    actions,
    mutations,
};
