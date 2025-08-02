import ApiService from "./api.service";
import JwtService from "./jwt.service";
import config from "@/ConfigProvider";
import router from "@/router";
import { ActionContext } from "vuex";

// Action Types
export const POST_LOGIN = "postLogin";
export const GET_JWT = "getJWT";
export const GET_USER = "getUser";
export const GET_USER_JSON = "getUserJson";
export const VERIFY_AUTH = "verifyAuth";
export const PURGE_AUTH = "purgeAuth";
export const FETCH_JWT = "fetchJwt";

// Mutation Types
export const SET_JWT = "setJWT";
export const SET_USER = "setUser";
export const SET_USER_JSON = "setUserJson";

// State Type
interface User {
  email?: string;
  shortName?: string;
}

interface State {
  isAuthenticated: boolean;
  user: User | null;
  userJson: Record<string, any>;
  sessionId: string | null | undefined;  // Allow undefined
}

// Initial State
const state: State = {
  isAuthenticated: !!JwtService.getToken(),
  user: {}, // Ensure it's a User object
  userJson: {},
  sessionId: JwtService.getSession() || null,
};

// Getters
const getters = {
  isAuthenticated(state: State): boolean {
    return state.isAuthenticated;
  },
  currentUser(state: State): User | null {
    return state.user;
  },
  currentSession(state: State): string | null {
    return state.sessionId ?? null;  // Convert undefined to null
  },
};

// Define Vuex Context Type
type VuexContext = ActionContext<State, any>;

// Actions
const actions = {
  [POST_LOGIN](context: VuexContext, params: Record<string, any>): Promise<any> {
    return new Promise((resolve, reject) => {
        ApiService.post<{ data: any }>("/auth/login", params.data)
            .then(({ data }) => {
                resolve(data);
            })
            .catch(err => {
                reject(err?.response?.data);
            });
    });
},

  [GET_JWT](context: VuexContext): Promise<any> {
    const tokenFormUrl = router.currentRoute.value.query?.token as string | undefined;
    return new Promise((resolve, reject) => {
      const nextUrl = encodeURIComponent(`/redirect?url=${window.location.href}`);
      if (!context.getters.currentSession && !tokenFormUrl) {
        context.commit(PURGE_AUTH);
        window.location.href = config.value("GETHIRED_WEB_URL") + `/signin?next=${nextUrl}`;
        return;
      }

      ApiService.get<{ jwt: string }>(config.value("GETHIRED_WEB_URL") + "/employee/jwt", {
        session: context.getters.currentSession,
      })
        .then(({ jwt }) => {  // Directly destructure jwt
          context.commit(SET_JWT, jwt);
          setTimeout(() => {
            ApiService.setHeader();
          }, 100);
          resolve(jwt);
        })
        .catch((err: any) => {
          if (!tokenFormUrl) {
            context.commit(PURGE_AUTH);
          }
          reject(err);
        });
    });
  },

  [GET_USER](context: VuexContext): Promise<User> {
    ApiService.setHeader();
    return new Promise((resolve, reject) => {
      ApiService.get<User>(`/me?t=${new Date().getTime()}`)
        .then(userData => {  // Directly use userData
          context.commit(SET_USER, userData);
          resolve(userData);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  },

  [FETCH_JWT](context: VuexContext): Promise<any> {
    return new Promise((resolve, reject) => {
      ApiService.get<{ data: any }>("/auth/me")
        .then(({ data }) => { 
          context.commit(SET_USER, data);
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  },
};

// Mutations
const mutations = {
  [SET_JWT](state: State, jwt: string) {
    if (jwt) {
      state.isAuthenticated = true;
      JwtService.saveToken(jwt);
    }
  },
  [PURGE_AUTH](state: State) {
    state.isAuthenticated = false;
    state.user = null;
    state.sessionId = "";
    JwtService.destroyToken();
    JwtService.destroyUser();
  },
  [SET_USER](state: State, data: User) {
    state.user = data;
  },
  [SET_USER_JSON](state: State, data: Record<string, any>) {
    state.userJson = data;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
