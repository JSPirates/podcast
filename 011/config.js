var convict = require('convict');

var schema = require("./config/schema.js");

var conf = convict(schema);

conf.loadFile(["./config/common.json", "./config/"+conf.get("env")+".json"]);

conf.validate({ strict: true });

module.exports = conf;

