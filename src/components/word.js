import Component from "../lib/component";
import store from '../store/index.js';

export default class WordMeaning extends Component {
    constructor() {
        super({
            store,
            element: document.getElementById('wordContainer')
        });
    }

    render() {
        this.element.innerHTML = `
            <p id="word-type">${store?.meanings[0].partOfSpeech ?? ""}</p>
        `
    }
};
