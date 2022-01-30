export default {
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
};
