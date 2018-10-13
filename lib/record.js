const ioHook = require('iohook');
const fs = require('fs');

let actionsArray = [];
let diluter = true;

ioHook.on("mouseclick", event => {
    console.log(event);
    actionsArray.push({type: 'click', event})
    
    // result: {type: 'mousemove',x: 700,y: 400}
  });

ioHook.on("mousemove", event => {
  console.log(event);
  actionsArray.push({type: 'mouse', event})
  
  // result: {type: 'mousemove',x: 700,y: 400}
});
ioHook.on("keypress", event => {
  console.log(event);
  actionsArray.push({type: 'keyboard', event});
  // result: {keychar: 'f', keycode: 19, rawcode: 15, type: 'keypress'}
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

function exitHandler(options, exitCode) {
    if (options.cleanup){ 
        actionsArray.pop() // Remove the last element which is Ctrl + C ( In our case with Quick-Tasks-For-Windows, it will most likely be another global shortcut, like Alt+P)
        fs.writeFileSync('actions.json', JSON.stringify(actionsArray));
        console.log('Actions saved, now it is time to use them....');
    }
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));