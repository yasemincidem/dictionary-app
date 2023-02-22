export default {
    setWords(state, payload) {
        state.words = [...payload];

        return state;
    },
    getWords(state) {
        return state.words;
    },
    clearWords(state) {
        state.words = [];

        return state;
    }
};
