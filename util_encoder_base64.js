var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

//var base64str = base64_encode('kitten.jpg');

var imageAsBase64 = fs.readFileSync('./sample-content.png', 'base64');

console.log(imageAsBase64);
