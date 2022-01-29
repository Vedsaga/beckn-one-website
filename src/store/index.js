import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            token: null,
            name: null,
            id: null,
            error: null,
            state: null,
        };
    },
    mutations: {
        setToken(state, payload) {
            localStorage.setItem("token", payload);
            state.token = payload;
        },
        setName(state, payload) {
            localStorage.setItem("name", payload);
            state.name = payload;
        },
        setId(state, payload) {
            localStorage.setItem("id", payload);
            state.id = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
        setState(state, payload) {
            state.state = payload;
        },
        setParticipantList(state, payload) {
            state.participantList = payload;
        },
    },
    getters: {
        getToken(state) {
            //    if token is not null then return token else set state to NotLoggedIn
            if (state.token) {
                return state.token;
            } else {
                state.state = "notLoggedIn";
            }
        },
        getName(state) {
            if (state.name) {
                return state.name;
            } else {
                state.state = "notLoggedIn";
            }
        },
        getId(state) {
            if (state.id) {
                return state.id;
            } else {
                state.state = "notLoggedIn";
            }
        },
        getError(state) {
            return state.error;
        },
        getState(state) {
            return state.state;
        },
    },
    actions: {
        setToken({ commit }, payload) {
            commit("setToken", payload);
        },
        setName({ commit }, payload) {
            commit("setName", payload);
        },
        setId({ commit }, payload) {
            commit("setId", payload);
        },
        setError({ commit }, payload) {
            commit("setError", payload);
        },
        setState({ commit }, payload) {
            commit("setState", payload);
        },
    },
});

export default store;
