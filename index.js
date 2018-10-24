#! /usr/bin/env node
const path = require("path");
const fs = require("fs");
const args = process.argv;
const argument = args[2];

if (argument === "record") {
    require("./lib/record");
} else if (argument === "play") {
    require("./lib/play");
} else {
    console.log("Please add an argument: record OR play");
    console.log("Example: mkp record");
    process.exit();
}
