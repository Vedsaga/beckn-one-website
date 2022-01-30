export default {
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
};
