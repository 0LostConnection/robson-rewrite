#!/usr/bin/env node
const yargs = require('yargs')

const argv = yargs
    .option('env', {
        alias: 'e',
        description: 'Env file',
        type: 'string'
    })
    .option('key', {
        alias: 'k',
        description: 'Key to access in the env file',
        type: 'string'
    })
    .help()
    .alias('help', 'h')
    .argv

if (argv.env) {
    require('dotenv').config({ path: argv.env })
}

if (argv.key && process.env[argv.key]) {
    console.log(`The value of the key '${argv.key}' is: ${process.env[argv.key]}`)
} else {
    console.log('Error: the key does not exist in the env file')
}