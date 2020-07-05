showComicsImage(new Date());

function showComicsImage(date) {
    chrome.runtime.sendMessage(
        { contentScriptQuery: "queryComicsStrip", date: JSON.stringify(date) },
        imageSrc => {
            console.log("Comics href: " + imageSrc);
            var image = document.createElement("img");
            image.src = imageSrc;
            image.alt = "garfield " + date.getDate(); + "/" + date.getMonth() + "/" + date.getFullYear();
            document.getElementById('comicsWrapper').appendChild(image);
        });
}
