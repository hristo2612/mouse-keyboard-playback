const ioHook = require("iohook");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const actionsPath = path.join(__dirname, "actions.json");

let actionsArray = [];

console.log(chalk.green("Recording input.."));

ioHook.on("mouseclick", event => {
    //console.log(event);
    actionsArray.push({ type: "click", event });
});

ioHook.on("mousedown", event => {
    //console.log(event);
    actionsArray.push({ type: "mouse_down", event });
});

ioHook.on("mouseup", event => {
    //console.log(event);
    actionsArray.push({ type: "mouse_up", event });
});

ioHook.on("mousedrag", event => {
    //console.log(event);
    actionsArray.push({ type: "mouse_move", event });
});

ioHook.on("mousewheel", event => {
    //console.log(event);
    actionsArray.push({ type: "scroll", event });
});

ioHook.on("mousemove", event => {
    //console.log(event);
    actionsArray.push({ type: "mouse_move", event });
});
ioHook.on("keypress", event => {
    //console.log(event);
    actionsArray.push({ type: "keyboard", event });
});

ioHook.on("keydown", event => {
    console.log(event);
    actionsArray.push({ type: "key_down", event });
});

ioHook.on("keyup", event => {
    console.log(event);
    actionsArray.push({ type: "key_up", event });
});

//Register and stark hook
ioHook.start();

function exitHandler(isExit) {
    // If process is about to exit, save actions to json file
    if (isExit) {
        actionsArray.pop();
        actionsArray.pop();
        actionsArray.pop();
        fs.writeFileSync(actionsPath, JSON.stringify(actionsArray));
        console.log("Actions saved, now it is time to use them....");
    } else {
        process.exit();
    }
}

setTimeout(() => {
    exitHandler();
}, 30000);

process.on("exit", exitHandler.bind(null, true));

//catches ctrl+c event
process.on("SIGINT", exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", exitHandler);
process.on("SIGUSR2", exitHandler);
