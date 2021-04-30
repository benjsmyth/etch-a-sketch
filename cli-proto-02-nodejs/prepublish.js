
//
const fs = require('fs');
var json = fs.readFileSync("package.json");
var data = JSON.parse(json);
var mainScript = "gia-ast.js";

var script = fs.readFileSync(mainScript).replace("VERSIONFLAG",data.version);

fs.writeFileSync(mainScript,script);

