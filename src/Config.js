'use strict';
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

let data = {};
class Config {

    static load(filePath) {
        try {
            if (!fs.existsSync(filePath))
                return {};

            const fileStr = this.readConfigs(filePath);
            const newConfig = yaml.load(fileStr);
            data = Object.assign(data, newConfig);
        } catch (e) {
            console.error(`Error while parsing config for ""\n${e.message}`);
            throw(e)
        }
    }

    static stringStartsWith(string, prefix) {
        return string.slice(0, prefix.length) === prefix
    }

    static dirname(filePath) {
        const currentDirArr = filePath.split(path.sep);
        currentDirArr.pop();
        return currentDirArr.join(path.sep)
    }

    static readConfigs(filePath) {
        try {
            let incName = '';
            let resultStr = '';
            const currentDir = this.dirname(filePath);
            const strings = fs.readFileSync(filePath, 'utf8').toString().split('\n');

            for (let line of strings) {
                if (this.stringStartsWith(line, '#include')) {
                    incName = path.join(currentDir, line.substr(9, line.length)).trim();
                    resultStr += resultStr + "\n" + this.readConfigs(incName) + "\n"
                } else
                    resultStr = resultStr + "\n" + line
            }
            return resultStr
        } catch (e) {
            console.error(`Error while parsing config for ""\n${e.message}`);
            throw(e)
        }
    }

    static add(obj) {
        for (let attrname in obj)
            data[attrname] = obj[attrname]
    }

    static byName(name) {
        return data[name]
    }

    static get data() {
        return data
    }

    static setParamsToCfgFromEnv(params) {
        for(const param of params) {
            if (data[param] == null)
                data[param] = process.env[param.toUpperCase()];
        }
    }
}

module.exports = Config;