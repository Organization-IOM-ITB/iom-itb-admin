/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiService from "./api.service";
import { ActionContext } from "vuex";

// Constants for actions and mutations
export const POST_FILE = "postFile";
export const POST_IMAGE = "postImage";
export const POST_PDF = "postPdf";

// Define the state type (example placeholder, adjust as needed)
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {
}

// Define getters
const getters = {
  // Define getters if needed
};

// Helper function for handling promises and errors
const handleRequest = <T>(apiCall: Promise<{ data: T }>): Promise<T> => {
  return new Promise((resolve, reject) => {
    apiCall
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        console.error("Error in API call:", err);
        reject(err?.response?.data);
      });
  });
};

// Define actions
const actions = {
  [POST_FILE](context: ActionContext<State, any>, params: Record<string, any>): Promise<string> {
    return handleRequest(ApiService.upload<{ data: string }>("/files/upload", params.data));
  },
  [POST_IMAGE](context: ActionContext<State, any>, params: Record<string, any>): Promise<string> {
    return handleRequest(ApiService.upload<{ data: string }>("/images/upload", params.data));
  },
  [POST_PDF](context: ActionContext<State, any>, params: Record<string, any>): Promise<string> {
    return handleRequest(ApiService.upload<{ data: string }>("/pdf/upload", params.data));
  },
};

// Define mutations (you can add mutations if needed)

const mutations = {
  // Example mutation if you need to modify the state
  // setFiles(state: State, files: File[]) {
  //   state.files = files;
  // }
};

// Export the Vuex store module
export default {
  getters,
  actions,
  mutations,
};
