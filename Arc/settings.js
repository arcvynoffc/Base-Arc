const fs = require("fs");
const chalk = require("chalk");

global.owner = ["628998052763", "6285700525270"];
global.botName = "EveBotz"
global.ownName = "Arcvyn"

global.msg = {
    owner: "Sorry You're Not My Owner",
    prem: "Sorry You're Not Premium User"
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});