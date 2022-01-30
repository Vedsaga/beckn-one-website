import { createStore } from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

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
    mutations,
    getters,
    actions,
});

export default store;
