#!/usr/bin/env node

const translateApi = 'https://fanyi.youdao.com/openapi.do?keyfrom=node-translator&key=2058911035&type=data&doctype=json&version=1.2&q='
import meow = require('meow');
import got = require('got');
import ora = require('ora');

const cli: meow.Result<meow.AnyFlags> = meow(`TypeScript meow...`);
const commands: string[] = cli.input;

(async (word) => {
        if (commands.length === 0) {
                ora("No word input. Please try angin.").warn();
        } else {
                let spin: ora.Ora = ora(`Translating ${word} ...`).start()
                const res = await got.default.get(translateApi + word);
                const msg = JSON.parse(res.body)
                if (msg.basic) {
                        spin.succeed(msg.basic.explains[0])
                } else {
                        spin.succeed(msg.translation[0])
                }
        }
})(commands[0])

