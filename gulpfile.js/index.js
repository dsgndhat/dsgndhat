/*
  gulpfile.js
  ===========
  rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulpfile.js/tasks. any files in that directory get
  automatically required below.
*/

const path = require('path')
const gulp = require('gulp')
const requireDir = require('require-dir')

// fallback for windows backs out of node_modules folder to root of project
process.env.PWD = process.env.PWD || path.resolve(process.cwd(), '../../')

// globally expose config objects
global.PATH_CONFIG = require('./lib/get-path-config')
global.TASK_CONFIG = require('./lib/get-task-config')

// require all tasks in gulpfile.js/tasks, including subfolders
requireDir('./tasks', { recurse: true })

// initialise any additional user-provided tasks
TASK_CONFIG.additionalTasks.initialize(gulp, PATH_CONFIG, TASK_CONFIG)
