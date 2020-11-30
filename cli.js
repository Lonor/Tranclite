#!/usr/bin/env node

const meow = require('meow');
const ora = require('ora');
const got = require('got');
const translate_api = 'https://fanyi.youdao.com/openapi.do?keyfrom=node-translator&key=2058911035&type=data&doctype=json&version=1.2&q='
const cli = meow(`meow~`);
const commands = cli.input;

const spinner = input => {
    process.spinner = ora(input).start();
}

(async (text) => {
    spinner("Translating " + commands[0]);
    let res = await got(translate_api + text)
    return res;
})(commands[0]).then(r => {
    let msg = JSON.parse(r.body);
    if (msg.basic) {
        process.spinner.succeed(msg.basic.explains[0]);
    } else {
        process.spinner.succeed(msg.translation[0]);
    }
})

