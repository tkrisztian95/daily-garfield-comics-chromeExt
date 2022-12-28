showComicsImage();

function showComicsImage(date) {
    // 1. Send a message to the service worker requesting the today's comics strip image url
    chrome.runtime.sendMessage("get-image-href",
        (response) => {
        // 3. Got an asynchronous response with the data from the service worker
        var image = document.createElement("img");
        image.src = response;
        image.alt = "Today's Garfield Comic Strip"
        document.getElementById('comicsImgWrapper').appendChild(image);
    });
}
