const URL = "http://picayune.uclick.com";

let d = new Date();
let fullYear = String(d.getFullYear());
let year = fullYear.slice(-2);
let month = d.getMonth() < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();

let image = createComicsImageBox();
document.getElementById('comicsWrapper').appendChild(image);

function getDailyStripSrc() {
    var dirPath = "/comics/ga/" + fullYear + "/";
    var fileName = "ga" + year + month + day + ".jpg";
    return URL + dirPath + fileName;
}

function createComicsImageBox() {
    var comicsSrc = getDailyStripSrc();
    console.log("Comics strip source: " + comicsSrc);
    var image = document.createElement("img");
    image.src = comicsSrc;
    image.alt = "garfield " + day + "/" + month + "/" + fullYear;
    return image;
}