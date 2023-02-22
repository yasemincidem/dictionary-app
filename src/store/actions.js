export default {
    setWords(context, payload) {
        console.log("set words", payload);
        context.commit('setWords', payload);
    },
    getWords(context) {
        context.commit('getWords');
    },
    clearWords(context, payload) {
        context.commit('clearWords', payload);
    }
};
