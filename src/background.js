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

function getDailyStripSrc(date) {

    let d = new Date(JSON.parse(date));
    let fullYear = String(d.getFullYear());
    let year = fullYear.slice(-2);
    let month = d.getMonth() < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
    let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();

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