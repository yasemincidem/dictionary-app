export default {
    setWords(context, payload) {
        context.commit('setWords', payload);
    },
    getWords(context) {
        context.commit('getWords');
    },
    clearWords(context, payload) {
        context.commit('clearWords', payload);
    }
};
