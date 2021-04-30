
//
const fs = require('fs');

var mainScript = "gia-ast.js";
try {
   fs.copyFileSync(mainScript+".prepublish",mainScript);
   
} catch (error) {
   console.log("The restoration of the " + mainScript + " might not have worked.");
   console.log(error.message);
}





