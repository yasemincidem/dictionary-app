const searchInput = document.getElementById("searchInput");
const BASE_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const search = (event) => {
  if (event.target.value) {
      fetch(`${BASE_API_URL}${event.target.value}`)
          .then((res) => res.json())
          .then((data) => console.log("data", data))
          .catch((err) => console.warn("Something went wrong!"))
  }
};

const debounce = (callback, duration = 500) => {
    let timeout;

    /*
    But let's say that the user keeps writing,
    so each key release triggers the debounce again.
    Every invocation needs to reset the timer, or,
    in other words, cancel the previous plans with search(),
    and reschedule it for a new time—500 ms in the future.
    This goes on as long as the user keeps hitting the keys under 500 ms.
    * */
    return (argument) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(argument), duration);
    }
};

const debouncedSearchInput = debounce(search);

searchInput.addEventListener("input", debouncedSearchInput);
