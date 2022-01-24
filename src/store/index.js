import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            token: "",
        };
    },
    mutations: {
        setToken(state, payload) {
            localStorage.setItem("token", payload);
            state.token = payload;
        },
    },
    getters: {
        getToken(state) {
            if (state.token.empty) {
                state.token = localStorage.getItem("token");
            }

            return state.token;
        },
    },
});

export default store;
