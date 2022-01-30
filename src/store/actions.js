export default {
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
};
