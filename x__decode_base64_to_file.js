var fs = require('fs');

var args = process.argv.slice(2);


var jsonFile = args[0];
var target = args[1];
var jsonData;
var stylizedImage;
fs.readFile(jsonFile, 'utf8', function (err, data) {
    if (err) throw err;
   // console.log(data);
    jsonData = JSON.parse(data);
    stylizedImage = jsonData.stylizedImage;

    //console.log(stylizedImage);
    let buff = new Buffer(stylizedImage, 'base64');
    fs.writeFileSync(target, buff);
    console.log("should have written:" + target);
  });
