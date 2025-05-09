const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);

const endPointUrl = searchParams.get("url");

const heading = document.getElementById("heading");
const link = document.getElementById("link");

var annoyanceLevel;
var msg;
var phrases;
var theme;

if (searchParams.has("annoyLevel")) {annoyanceLevel = Number(searchParams.get("annoyLevel"))} else {annoyanceLevel = 5}
if (searchParams.has("msg")) {msg = searchParams.get("msg")} else {msg = "Click the link to redirect to:"}
if (searchParams.has("phraseArray")) {phrases = searchParams.get("phraseArray").split(",")} else {phrases = ["Hmm, there was a bit of an error. Try again?", "Keep clicking!", "Almost there!", "SOO CLOSE!!", "COME ON!!!!!!!!!"]}

heading.innerText = msg;

var clickCount = 0;
var lastPhrase;

link.innerText = endPointUrl;

function generatePhrase() {
    if (clickCount == 1) {
        return phrases[0]
    } else {
        return phrases[Math.floor(Math.random() * phrases.length)];
    }
}

if (annoyanceLevel != NaN) {
    link.addEventListener("click", () => {
        clickCount += 1;

        if (clickCount < annoyanceLevel) {
            var phrase = generatePhrase();
            if (phrase == lastPhrase) {
                for (;phrase == lastPhrase;) {
                    phrase = generatePhrase();
                }
            }

            lastPhrase = phrase;

            heading.innerText = phrase;
        } else {
            link.href = endPointUrl;
        }
    });
}
