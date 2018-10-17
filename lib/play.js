const robot = require('robotjs');
const fs = require('fs');
const path = require('path');
const actionsPath = path.join(__dirname, 'actions.json');
const keysPath = path.join(__dirname, 'keys.json');

// Speed up the mouse.
robot.setMouseDelay(3);
robot.setKeyboardDelay(110);

const actions = JSON.parse(fs.readFileSync(actionsPath, 'utf8'));
const keyTable = JSON.parse(fs.readFileSync(keysPath, 'utf8'));

for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    if (action.type === 'click') {
        if (action.event.button === 1) {
            robot.mouseClick('left');
        } else if (action.event.button === 2) {
            robot.mouseClick('right');
        }
    } else if (action.type === 'mouse') {
        robot.moveMouse(action.event.x, action.event.y);
    } else if (action.type === 'keyboard') {
        let modifiers = [];
        if (action.event.shiftKey) {
            modifiers.push('shift');
        } else if (action.event.altKey) {
            modifiers.push('alt');
        } else if (action.event.ctrlKey) {
            modifiers.push('control');            
        }
        robot.keyTap(keyTable[String(action.event.rawcode)], modifiers);
    }
}