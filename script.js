const button = document.getElementById("button");
const audioElement = document.getElementById("audio");


// Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Pass joke to VoiceRSS API
function tellMe(joke) { 
    console.log(joke);
    VoiceRSS.speech({
        key: "0280ef7fdeee4a07bd7f0bc7401159e1",
        src: joke,
        hl: "en-us",
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false
    })
}

// Get jokes from joke API
async function getJokes() {
    let joke = "";
    const apiURL = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        // Two part jokes
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //  Text-to-Speech
        tellMe(joke);
        // Disable button
        toggleButton();   
    } catch (error) {
        // Catch errors
        console.log("Whoops", error);
    }
}

//  Event listener
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);