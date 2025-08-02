import ApiService from "./api.service";
import { ActionContext } from "vuex";

export const GET_TRANSACTIONS = "getTransactions";
export const SET_TRANSACTIONS = "setTransactions";
export const POST_TRANSACTION = "postTransaction";
export const PUT_TRANSACTION = "putTransaction";
export const DELETE_TRANSACTION = "deleteTransaction";

// Define type for transaction
interface Transaction {
    id: number; // Use appropriate type for transaction ID
    code: string; // Transaction code
    username: string; // User's name associated with the transaction
    email: string; // User's email
    noTelp: string; // User's phone number
    address: string; // User's address
    merchandiseId: number; // Related merchandise ID
    qty: number; // Quantity of merchandise
    payment: string | null; // Payment image path or null
    status: string; // Current status of the transaction (e.g., waiting, completed)
}

// Define type for state
interface State {
    transactions: Transaction[];
}

// Define initial state
const state: State = {
    transactions: [],
};

// Define getters
const getters = {
    transactions(state: State): Transaction[] {
        return state.transactions; // Return transaction data
    },
};

// Define VuexContext type
type VuexContext = ActionContext<State, any>;

const actions = {
    [GET_TRANSACTIONS](context: VuexContext, params: Record<string, any>): Promise<Transaction[]> {
        return new Promise((resolve, reject) => {
            ApiService.get<{ data: Transaction[] }>("/transactions", params.data)
                .then(response => {
                    const { data } = response;
                    context.commit(SET_TRANSACTIONS, data);
                    resolve(data);
                })
                .catch(err => {
                    console.error("Error fetching transactions:", err);
                    reject(err);
                });
        });
    },
    [POST_TRANSACTION](context: VuexContext, params: Record<string, any>): Promise<Transaction[]> {
        return new Promise((resolve, reject) => {
            ApiService.post<{ data: Transaction[] }>("/transactions", params.data)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    [PUT_TRANSACTION](context: VuexContext, params: Record<string, any>): Promise<Transaction[]> {
        return new Promise((resolve, reject) => {
            ApiService.put<{ data: Transaction[] }>(`/transactions/${params.id}`, params.data)
                .then(({ data }) => resolve(data))
                .catch((err) => {
                    reject(err);
                });
        });
    },
    [DELETE_TRANSACTION](context: VuexContext, params: Record<string, any>): Promise<void> {
        return new Promise((resolve, reject) => {
            ApiService.delete(`/transactions/${params.id}`)
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};

const mutations = {
    [SET_TRANSACTIONS](state: State, data: Transaction[]): void {
        state.transactions = data; // Ensure the data sent matches the expected format
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
