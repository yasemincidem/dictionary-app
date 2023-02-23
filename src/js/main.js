import Header from "../components/header";
import List from "../components/list";
import store from "../store";

const BASE_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const debounce = (callback, duration = 500) => {
    let timeout;

    /*
    But let's say that the user keeps writing,
    so each key release triggers debounce again.
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

const element = document.getElementById("searchInput");

element.addEventListener("input", function (event) {
    debouncedSearchInput(event);
});

const header = new Header();
const list = new List();

header.render();
list.render();
