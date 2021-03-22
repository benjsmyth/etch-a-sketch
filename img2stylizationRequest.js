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


console.log("Reading: " + imgFile);

encode_base64_v2(imgFile, target);

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
