import Component from "../lib/component";
import store from '../store/index.js';

export default class Header extends Component {
    constructor() {
        super({
            store,
            element: document.getElementById('titleHeader')
        });
    }

    render() {
        this.element.textContent = store.state.words ? store.state.words[0]?.word ?? "" : "";
    }
};
