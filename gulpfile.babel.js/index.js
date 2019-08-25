/*
  gulpfile.js
*/

// import log from "why-is-node-running"; // should be your first require
import gulp from 'gulp';

import TASK_CONFIG from './lib/get-task-config';
import PATH_CONFIG from './lib/get-path-config';

import build from './tasks/production';
import defaultTask from './tasks/default';

// Initialize any additional user-provided tasks
TASK_CONFIG.additionalTasks.initialize(gulp, PATH_CONFIG, TASK_CONFIG);

export { build, defaultTask };

export default defaultTask;
