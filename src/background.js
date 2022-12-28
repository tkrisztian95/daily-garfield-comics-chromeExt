const URL = "http://picayune.uclick.com";

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if (message == "get-image-href") {
            getDaily().then(sendResponse)
            return true;
        }
    });

async function checkExists(image_url) {
    const response = await fetch(image_url, {
        method: 'HEAD'
    });
    return response.ok;
}

async function getDaily() {

    let date = new Date();
    let fullYear = String(date.getFullYear());
    let year = fullYear.slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" +  date.getDate()).slice(-2);

    var dirPath = "/comics/ga/" + fullYear + "/";
    var fileName = "ga" + year + month + day;
    var path = URL + dirPath + fileName;

    var jpgImage = path + ".jpg";
    var gifImage = path + ".gif";

    if (await checkExists(gifImage)) {
        return gifImage;
    } else if (await checkExists(jpgImage)) {
        return jpgImage;
    } else {
        return "resources/images/garfield404.png";
    }
}