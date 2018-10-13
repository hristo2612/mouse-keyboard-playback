var robot = require('robotjs');
var fs = require('fs');

// Speed up the mouse.
robot.setMouseDelay(2);
robot.setKeyboardDelay(200);

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;

var actions = JSON.parse(fs.readFileSync('actions.json', 'utf8'));
var keyTable = JSON.parse(fs.readFileSync('keys.json', 'utf8'));

for (var i = 0; i < actions.length; i++) {
    var action = actions[i];
    if (action.type === 'click') {
        if (action.event.button === 1) {
            robot.mouseClick('left');
        } else if (action.event.button === 2) {
            robot.mouseClick('right');
        }
    } else if (action.type === 'mouse') {
        robot.moveMouseSmooth(action.event.x, action.event.y);
    } else if (action.type === 'keyboard') {
        var modifiers = [];
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