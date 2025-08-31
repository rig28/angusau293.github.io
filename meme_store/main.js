const memes_div = document.getElementById("memes");
const raw_data = `[
    {
        "file": "memes/cat.jpeg",
        "title": "Cat"
    },
    {
        "file": "memes/gun.png",
        "title": "Gun"
    },
    {
        "file": "memes/larry.jpg",
        "title": "Larry"
    },
    {
        "file": "memes/laugh.gif",
        "title": "Laugh"
    },
    {
        "file": "memes/mike.jpeg",
        "title": "Mike"
    },
    {
        "file": "memes/rick_roll.png",
        "title": "Rick Roll"
    },
    {
        "file": "memes/rick.gif",
        "title": "Rick Roll GIF"
    },
    {
        "file": "memes/security.jpg",
        "title": "Sekurity"
    },
    {
        "file": "memes/sus_wide.jpg",
        "title": "Sus Wide"
    },
    {
        "file": "memes/sus.jpg",
        "title": "Sus"
    },
    {
        "file": "memes/thumbs_up.jpg",
        "title": "Thumbs Up"
    },
    {
        "file": "memes/troll.png",
        "title": "Troll"
    },
    {
        "file": "memes/twerk.gif",
        "title": "Twerk"
    }
]`

const data = JSON.parse(raw_data);

data.forEach(item => {
    var new_div = document.createElement("div");
    new_div.className = "meme";

    var new_img = document.createElement("img");
    new_img.src = item.file;
    new_img.className = "meme_img";
    
    var img_title = document.createElement("p");
    img_title.textContent = item.title;
    img_title.className = "meme_title";

    new_div.appendChild(new_img);
    new_div.appendChild(img_title);

    memes_div.appendChild(new_div);
});
