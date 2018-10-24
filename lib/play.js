const robot = require("robotjs");
const fs = require("fs");
const path = require("path");
const sleep = require("sleep");
const actionsPath = path.join(__dirname, "actions.json");
const keysPath = path.join(__dirname, "keys.json");

// Speed up the mouse.
robot.setMouseDelay(10);
robot.setKeyboardDelay(42);

const actions = JSON.parse(fs.readFileSync(actionsPath, "utf8"));
const keyTable = JSON.parse(fs.readFileSync(keysPath, "utf8"));

actions.forEach((action) => {
    switch (action.type) {
        case 'mouse_move':
            move(action.event.x, action.event.y);
            break;
        case 'mouse_down':
            press(action.event.button, 'down');
            break;
        case 'mouse_up':
            press(action.event.button, 'up');
            break;
        case 'mouse_scroll':
            scroll(action.event.direction);
            break;
        case 'key_down':
            key(keyTable[String(action.event.rawcode)], 'down');
            break;
        case 'key_up':
            key(keyTable[String(action.event.rawcode)], 'up');
            break;
        case 'wait_for_action':
            wait(action.event.seconds);
            break;
        default:
            break;
    }
});

function move(x, y) {
    robot.moveMouse(x, y);
}

function press(btn, direction) {
    const button = (btn === 1) ? 'left' : 'right';
    robot.mouseToggle(direction, button);
}

function scroll(direction) {

}

function key(key, direction) {
    robot.keyToggle(key, direction);
}

function wait(seconds) {
    // This will halt Node.js' event loop and stop all javascript execution
    // might not be the best solution..
    sleep.sleep(seconds);
}