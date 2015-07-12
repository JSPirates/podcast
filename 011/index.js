var config = require("./config.js");

console.log(config.get("env"));
console.log(config.get("bind.ip"));
console.log(config.get("bind.port"));
