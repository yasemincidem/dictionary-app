const container = document.getElementById("container");
const searchInput = document.getElementById("searchInput");
const BASE_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const getCountry = (audioLink) => {
    if (audioLink.indexOf("uk") > -1) {
        return "UK";
    } else if (audioLink.indexOf("us") > -1) {
        return "US";
    } else if (audioLink.indexOf("au") > -1) {
        return "AU"
    }
};
const render = (datas) => {
    const headerContainer = document.createElement("div");
    const title = document.createElement("h1");
    title.textContent = datas.length ? datas[0]?.word : "";
    headerContainer.appendChild(title);
    container.appendChild(headerContainer);
    for (let data of datas) {
        const wordWrapper = document.createElement("div");
        wordWrapper.id = "word-wrapper";
        const phoneticContainer = document.createElement("div");
        const meaningContainer = document.createElement("div");
        meaningContainer.id = "meanings-wrapper"
        const synonymsContainer = document.createElement("div");
        synonymsContainer.id = "synonyms-wrapper"
        const type = document.createElement("p");
        type.id = "type";
        type.textContent = data?.meanings[0].partOfSpeech ?? "";
        if (data.phonetics) {
            for (let p of data.phonetics) {
                const soundFile = document.createElement("audio");
                soundFile.preload = "auto";
                const src = document.createElement("source");
                src.src = p.audio;
                soundFile.appendChild(src);
                const wrapperPhonetic = document.createElement("span")
                const svg = document.createElement("img");
                svg.src = "./audio.svg"
                svg.style.width = "12px";
                svg.style.fontWeight = "bold";
                svg.style.marginLeft = "3px";
                svg.style.marginRight = "10px";
                wrapperPhonetic.style.marginRight = "10px";
                svg.onclick = () => {
                    //Set the current time for the audio file to the beginning
                    soundFile.currentTime = 0.01;
                    //Due to a bug in Firefox, the audio needs to be played after a delay
                    setTimeout(function(){soundFile.play();},1);
                };
                const phoneticTextElement = document.createElement("span");
                const country = document.createElement("span");
                phoneticTextElement.textContent = p.text;
                country.textContent = getCountry(p.audio) ?? "";
                country.style.fontWeight = "bold";

                if (p.audio) {
                    wrapperPhonetic.appendChild(country);
                    wrapperPhonetic.appendChild(soundFile);
                    wrapperPhonetic.appendChild(svg);
                    wrapperPhonetic.appendChild(phoneticTextElement);
                }
                phoneticContainer.appendChild(wrapperPhonetic);
            }
        }
        if (data.meanings.length) {
            for (let meaning of data.meanings[0].definitions) {
                const definition = document.createElement("p");
                definition.id = "definition"
                const example = document.createElement("p");
                example.id= "example"
                definition.innerText = meaning.definition ?? ""
                example.innerText = meaning.example ?? ""
                meaningContainer.appendChild(definition);
                meaningContainer.appendChild(example);
            }
            if (data.meanings[0].synonyms.length) {
                for (let synonym of data.meanings[0].synonyms) {
                    const synonymElem = document.createElement("p");
                    synonymElem.id = "synonym"
                    synonymElem.innerText = synonym;
                    synonymsContainer.appendChild(synonymElem);
                }
            }
        }
        wordWrapper.appendChild(type);
        wordWrapper.appendChild(phoneticContainer)
        const meaningHeader = document.createElement("p");
        meaningHeader.innerText = "Meaning:";
        meaningHeader.id = "meaning-header";
        wordWrapper.appendChild(meaningHeader)
        wordWrapper.appendChild(meaningContainer)
        const synonymsHeader = document.createElement("p");
        synonymsHeader.innerText = "Synonyms:";
        synonymsHeader.id = "synonyms-header";
        wordWrapper.appendChild(synonymsHeader)
        wordWrapper.appendChild(synonymsContainer)
        container.appendChild(wordWrapper);
    }
};
const search = (event) => {
  if (event.target.value) {
      fetch(`${BASE_API_URL}${event.target.value}`)
          .then((res) => res.json())
          .then((datas) => render(datas))
          .catch((err) => console.warn("Something went wrong!", err))
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
