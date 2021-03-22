#!/bin/env node

'use strict';


//@STCGoal an input file is transformed into a base64 request for stylization


// node v8.11.3




const Buffer = require('safer-buffer').Buffer;
const path = require('path');
const fs = require('fs');


var args = process.argv.slice(2);


var imgFile = args[0];
var target = args[1];


console.log("Reading using v3: " + imgFile);

//encode_base64_v2(imgFile, target);
encode_base64_v3(imgFile, target);

/**
 * @param  {string} filename
 * @param  {string} targetJsonFile
 */
function encode_base64_v3(filename, targetJsonFile) {
    var base64Raw = fs.readFileSync(filename, 'base64');
    
    var base64 = base64Raw;
    var ext = path.extname(imgFile).replace(".","");
    if (ext == "jpg" || ext == "JPG" || ext == "JPEG" ) ext = "jpeg";
    if (ext == "pneg" || ext == "PNG" || ext == "Png" ) ext = "png";
    

    if (base64Raw.indexOf("data:")== -1) //fixing the string
     base64 = `data:image/${ext};base64,`
        + base64Raw  ;

    //console.log(base64);
    var jsonRequest = new Object();
    jsonRequest.contentImage = base64;
    var jsonData = JSON.stringify(jsonRequest);
    
    fs.writeFileSync(targetJsonFile, jsonData);
    //console.log("Should have saved :" + targetJsonFile);

}
/**
 * @param  {string} filename
 * @param  {string} targetJsonFile
 */
function encode_base64_v2(filename, targetJsonFile) {
    fs.readFile(filename, function (error, data) {
        if (error) {
            throw error;
        } else {
            let buf = Buffer.from(data);
            let base64 = buf.toString('base64');

            var jsonRequest = new Object();
            jsonRequest.stylizedImage = base64;
            var jsonData = JSON.stringify(jsonRequest);

            // console.log('Base64 ' + filename + ': ' + base64);
            fs.writeFileSync(targetJsonFile, jsonData);
            console.log("Should have saved :" + targetJsonFile);

            return base64;
        }
    });
}

/**
 * @param  {string} base64str
 * @param  {string} filename
 */
function decode_base64(base64str, filename) {
    let buf = Buffer.from(base64str, 'base64');

    fs.writeFileSync(filename, buf);

}
