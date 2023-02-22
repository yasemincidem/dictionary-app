import Component from "../lib/component";
import store from '../store/index.js';

const BASE_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export default class Search extends Component {
    constructor() {
        super({
            store,
            element: document.getElementById('searchInput')
        });
    }

    render() {
        const debounce = (callback, duration = 500) => {
            let timeout;

            /*
            But let's say that the user keeps writing,
            so each key release triggers the debounce again.
            Every invocation needs to reset the timer, or,
            in other words, cancel the previous plans with search(),
            and reschedule it for a new time—500 ms in the future.
            This goes on as long as the user keeps hitting the keys under 500 ms.
            */
            return (argument) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => callback(argument), duration);
            }
        };

        const search = (event) => {
            if (event.target.value) {
                fetch(`${BASE_API_URL}${event.target.value}`)
                    .then((res) => res.json())
                    .then((datas) => {
                        store.dispatch("setWords", datas)
                    })
                    .catch((err) => console.warn("Something went wrong!", err))
            }
        };

        const debouncedSearchInput = debounce(search);

        this.element.addEventListener("input", function (event) {
            debouncedSearchInput(event);
        });
    }
};
