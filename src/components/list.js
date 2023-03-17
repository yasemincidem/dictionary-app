import Component from "../lib/component";
import store from '../store/index.js';

export default class List extends Component {
    constructor() {
        super({
            store,
            element: document.getElementById('listContainer')
        });
    }

    render() {
        const getCountry = (audioLink) => {
            if (audioLink.indexOf("uk") > -1) {
                return "UK";
            } else if (audioLink.indexOf("us") > -1) {
                return "US";
            } else if (audioLink.indexOf("au") > -1) {
                return "AU"
            }
        };
        let innerHtml = "";
        const phoneticContainer = document.createElement("span");
        for (let word of store.state.words) {
            let phoneticHtml = "";
            if (word.phonetics) {
                for (let p of word.phonetics) {
                    if (p.audio) {
                      phoneticHtml += `
                       <span id="phonetic-container">
                            <audio preload="auto">
                              <source src=${p.audio}></source>
                            </audio>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/1200px-Speaker_Icon.svg.png" class="audio-icon"></img>
                            <span>${p.text}</span>
                            <span id="country">${getCountry(p.audio) ?? ""}</span>
                       </span>
                    `
                    }

                }
            }
            phoneticContainer.innerHTML = phoneticHtml;
            let definitionsHTML = "";
            for (let definition of word.meanings[0].definitions) {
                definitionsHTML += `<p>${definition.definition}</p>`
            }
            innerHtml += `
                  <div id="word-wrapper">
                     <p id="type">${word?.meanings[0].partOfSpeech ?? ""}</p>
                     ${phoneticContainer.outerHTML}
                     <p id="meaning-header">Meaning:</p>
                     <div class="line-numbered">${definitionsHTML}</div>
                     <p id="synonyms-header">Synonyms: ${word.meanings[0].synonyms.join(",")}</p>
                  </div>
            `
        }
        this.element.innerHTML = innerHtml;

        Array.from(document.getElementsByClassName("audio-icon")).forEach((audioIcon, index) => {
            audioIcon.addEventListener('click', () => {
                const soundFile = audioIcon.parentElement.firstElementChild;
                console.log("soundFile", soundFile);
                //Set the current time for the audio file to the beginning
                soundFile.currentTime = 0.01;
                //Due to a bug in Firefox, the audio needs to be played after a delay
                setTimeout(function(){soundFile.play();},1);
            });
        });
    }
};
