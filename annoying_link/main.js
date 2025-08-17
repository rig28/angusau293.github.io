const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);

var endPointUrl;
const endPointUrlRaw = searchParams.get("url");
if (endPointUrlRaw[0] && endPointUrlRaw[endPointUrlRaw.length] == "\"" || "\'") {
    endPointUrl = endPointUrlRaw.substring(1, endPointUrlRaw.length - 1);
} else {
    endPointUrl = endPointUrlRaw;
}

const heading = document.getElementById("heading");
const link = document.getElementById("link");

var displayText;
var annoyanceLevel;
var msg;
var phrases;
var theme;

if (searchParams.has("displayText")) {displayText = searchParams.get("displayText")} else {displayText = endPointUrl}
if (searchParams.has("annoyLevel")) {annoyanceLevel = Number(searchParams.get("annoyLevel"))} else {annoyanceLevel = 5}
if (searchParams.has("msg")) {msg = searchParams.get("msg")} else {msg = "Click the link to redirect:"}
if (searchParams.has("phraseArray")) {phrases = searchParams.get("phraseArray").split(";")} else {phrases = ["Hmm, there was a bit of an error. Try again?", "Keep clicking!", "Almost there!", "SOO CLOSE!!", "COME ON!!!!!!!!!"]}

heading.innerText = msg;

var clickCount = 0;
var lastPhrase;

link.innerText = displayText;

const infoButton = document.getElementById("info");
const credit = document.getElementById("credit");

var creditShowing = false;

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

infoButton.addEventListener("click", () => {
    if (creditShowing) {
        credit.style.display = "none";
        creditShowing = false;
    } else {
        credit.style.display = "flex";
        creditShowing = true;
    }
});

const urlBuilderBtn = document.getElementById("create_url");

const urlBuilderDiv = document.getElementById("url_builder");
const urlBuilderHeader = document.getElementById("url_builder_header");

var urlBuilderVisible = false;

urlBuilderBtn.addEventListener("click", () => {
    if (urlBuilderVisible) {
        urlBuilderDiv.style.display = "none";
        urlBuilderVisible = false;
    } else {
        urlBuilderDiv.style.display = "block";
        urlBuilderVisible = true;
    }
});

var isDragging = false;
var offsetX, offsetY;

var maxX = document.body.offsetWidth - 400;
var maxY = document.body.offsetHeight;
var minX = 10;
var minY = 10;

urlBuilderHeader.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - urlBuilderDiv.getBoundingClientRect().left;
    offsetY = e.clientY - urlBuilderDiv.getBoundingClientRect().top;
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    var newX = e.clientX - offsetX;
    var newY = e.clientY - offsetY;

    if (newX >= maxX) {
        newX = maxX;
        if (newY <= minY) newY = minY;
        if (newY >= maxY) newY = maxY;
    } else if (newY >= maxY) {
        newY = maxY;
        if (newX <= minX) newX = minX;
        if (newX >= maxX) newX = maxX;
    } else if (newX <= minX) {
        newX = minX;
        if (newY <= minY) newY = minY;
        if (newY >= maxY) newY = maxY;
    } else if (newY <= minY) {
        newY = minY;
        if (newX <= minX) newX = minX;
        if (newX >= maxX) newX = maxX;
    }

    urlBuilderDiv.style.left = newX + "px";
    urlBuilderDiv.style.top = newY + "px";
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

class URLBuilder {
    constructor() {
        this.baseURL = "https://angusau293.github.io/annoying_link/index.html";
        this.params = [];
    }

    setURL(url) {
        this.url = "\"" + url.replaceAll("&", "%26") + "\"";
    }
    setParameter(name, value) {
        this.params.push(name + "=" + value);
    }

    build() {
        this.result = this.baseURL + "?url=" + this.url;

        for (i = 0; i < this.params.length; i++) {
            this.result = this.result + "&" + this.params[i];
        }

        return this.result;
    }
}

const builder_url = document.getElementById("builder-url");
const builder_display_text = document.getElementById("builder-display_text");
const builder_annoy_level = document.getElementById("builder-annoy_level");
const builder_msg = document.getElementById("builder-msg");
const builder_phrases_div = document.getElementById("builder-phrases");
const builder_phrases_add_phrase = document.getElementById("builder-phrases_add_phrase");
const builder_build = document.getElementById("builder_build");
const builder_output = document.getElementById("builder_output");
const builder_phrases = document.getElementsByClassName("builder-phrases_phrase");
const builder_close = document.getElementById("builder_close");

var builder_phrases_list = [];
var phraseCount = 1;

builder_phrases_add_phrase.addEventListener("click", () => {
    phraseCount++;
    var newPhrase = document.createElement("input");
    newPhrase.type = "text";
    newPhrase.className = "builder-phrases_phrase";
    newPhrase.placeholder = "Phrase " + phraseCount.toString();
    builder_phrases_div.appendChild(newPhrase);
    builder_phrases_div.appendChild(document.createElement("br"));
});

builder_build.addEventListener("click", () => {
    var urlBuilder = new URLBuilder();

    builder_phrases_list = "";

    for (i = 0; i < builder_phrases.length; i++) {
        builder_phrases_list = builder_phrases_list + builder_phrases[i].value + ";";
    }

    builder_phrases_list = builder_phrases_list.slice(0, -1);

    urlBuilder.setURL(builder_url.value);
    urlBuilder.setParameter("displayText", builder_display_text.value);
    urlBuilder.setParameter("annoyLevel", builder_annoy_level.value);
    urlBuilder.setParameter("msg", builder_msg.value);
    urlBuilder.setParameter("phraseArray", builder_phrases_list);

    builder_output.innerText = urlBuilder.build();
});

builder_output.addEventListener("click", () => {
    builder_output.select();
    navigator.clipboard.writeText(builder_output.innerHTML.replaceAll("&amp;", "&"));
});

builder_close.addEventListener("click", () => {
    urlBuilderVisible = false;
    urlBuilderDiv.style.display = "none";
});
