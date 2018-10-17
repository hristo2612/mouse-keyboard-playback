const ioHook = require('iohook');
const fs = require('fs');
const path = require('path');
const actionsPath = path.join(__dirname, 'actions.json');

let actionsArray = [];

ioHook.on("mouseclick", event => {
    console.log(event);
    actionsArray.push({type: 'click', event})
});

ioHook.on("mousedown", event => {
  console.log(event);
  actionsArray.push({type: 'mouse_down', event})
});

ioHook.on("mouseup", event => {
  console.log(event);
  actionsArray.push({type: 'mouse_up', event})
});

ioHook.on("mousedrag", event => {
  console.log(event);
  actionsArray.push({type: 'drag', event});
});

ioHook.on("mousewheel", event => {
  console.log(event);
  actionsArray.push({type: 'scroll', event});
});

ioHook.on("mousemove", event => {
  console.log(event);
  actionsArray.push({type: 'mouse', event})
});
ioHook.on("keypress", event => {
  console.log(event);
  actionsArray.push({type: 'keyboard', event});
});

ioHook.on("keydown", event => {
  console.log(event);
  actionsArray.push({type: 'keydown', event});
});

ioHook.on("keyup", event => {
  console.log(event);
  actionsArray.push({type: 'keyup', event});
});

//Register and stark hook 
ioHook.start();

function exitHandler(isExit) {
    // If process is about to exit, save actions to json file
    if (isExit) {
      let newArray = [];
      for (let i = 0; i < actionsArray.length; i++) {
        if (actionsArray[i].type === "drag") {
          // If it is the last item in the array OR the next item is NOT drag
          if (actionsArray.length - 1 === i || actionsArray[i + 1].type !== "drag") {
            newArray.push(actionsArray[i]);
          }
        } else {
          newArray.push(actionsArray[i]);
        }
      }
      fs.writeFileSync(actionsPath, JSON.stringify(newArray));
      console.log('Actions saved, now it is time to use them....');
    } else {
      process.exit();
    }
}

setTimeout(() => {
  exitHandler();
}, 30000);

process.on('exit', exitHandler.bind(null, true));

//catches ctrl+c event
process.on('SIGINT', exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);