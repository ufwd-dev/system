'use strict';
const path = require('path')
const { appendEntry } = require('lemonitor-application');

appendEntry('bundle', path.resolve(__dirname, './app'));