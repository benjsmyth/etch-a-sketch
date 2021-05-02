#!/bin/env node
'use strict';
// node v8.11.3
const Buffer = require('safer-buffer').Buffer;
const path = require('path');
const fs = require('fs');


var args = process.argv.slice(2);


var jsonFile = args[0];
var target = args[1];
var jsonData;
var stylizedImage;

//encode_base64('ddr.jpg');

fs.readFile(jsonFile, 'utf8', function (err, data) {
  if (err) throw err;
  // console.log(data);
  
  jsonData = JSON.parse(data);
  if (jsonData.stylizedImage) {
    stylizedImage= jsonData.stylizedImage;

    if (args[2] == "--html" || args[2] == "-html") console.log(
      `<img src="${stylizedImage}">`);

      

      decode_base64_to_file(stylizedImage, target);

    // fs.writeFileSync(target, buff);

    if (args[2] == "--verbose" || args[2] == "-verbose" || args[3] == "--verbose" || args[3] == "-verbose") console.log("should have written:" + target);
  }
  else {
    //@STCSTatus The response is probably bad
    console.log("BAD RESPONSE - Object non existent (jsonData.stylizedImage)");
    
  }

});







/**
 * @param  {string} filename
 */
function encode_base64(filename) {
  fs.readFile(filename, function (error, data) {
    if (error) {
      throw error;
    } else {
      let buf = Buffer.from(data);
      let base64 = buf.toString('base64');
      // console.log('Base64 ' + filename + ': ' + base64);
      return base64;
    }
  });
}

/**
 * @param  {string} base64str
 * @param  {string} filename
 */
function decode_base64_to_file(base64str, filename) {
  
  fs.writeFileSync(filename, 
    decode_base64_to_string(base64str)
    );

}

/**
 * @param  {string} base64str
 */
function decode_base64_to_string(base64str) {
  
  if (base64str.indexOf("png;base64") > -1)
    base64str = base64str
      .replace(/^data:image\/png;base64,/, "");

  if (base64str.indexOf("jpeg;base64") > -1) {
    base64str = base64str
      .replace(/^data:image\/jpeg;base64,/, "");
  }

  return Buffer.from(base64str, 'base64');
}
