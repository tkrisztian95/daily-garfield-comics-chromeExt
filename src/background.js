const URL = "http://picayune.uclick.com";

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.contentScriptQuery == "queryComicsStrip") {
            sendResponse(getDailyStripSrc(request.date));
            return true;  // Will respond asynchronously.
        }
    });

function imageExists(image_url) {

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}

function getDailyStripSrc(dateStr) {

    let date = new Date(JSON.parse(dateStr));
    let fullYear = String(date.getFullYear());
    let year = fullYear.slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" +  date.getDate()).slice(-2);

    var dirPath = "/comics/ga/" + fullYear + "/";
    var fileName = "ga" + year + month + day;
    var path = URL + dirPath + fileName;

    var jpgImage = path + ".jpg";
    var gifImage = path + ".gif";

    if (imageExists(gifImage)) {
        return gifImage;
    } else if (imageExists(jpgImage)) {
        return jpgImage;
    } else {
        return "resources/images/garfield404.png";
    }
}