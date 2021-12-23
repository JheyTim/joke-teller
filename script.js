const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

const toggleButton = () => (button.disabled = !button.disabled);

//Passing Joke to VoiceRSS API
const tellJoke = (joke) =>
  VoiceRSS.speech({
    key: "1c8c3ea466884a9ea96e845502f3594f",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });

// Get jokes from Joke API
const getJokes = async () => {
  let joke = "";
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Programming");
    const data = await response.json();
    if (data.type === "twopart") {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellJoke(joke);
    toggleButton();
  } catch (error) {
    // Catch Errors here
    console.log(error);
  }
};

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
