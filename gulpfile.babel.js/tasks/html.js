import browserSync from 'browser-sync';

import data from 'gulp-data';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import TASK_CONFIG from '../lib/get-task-config';
import PATH_CONFIG from '../lib/get-path-config';
import handleErrors from '../lib/handleErrors';
import projectPath from '../lib/projectPath';
import isProduction from '../lib/isProduction';
import htmlmin from 'gulp-htmlmin';
import fs from 'fs';

const htmlTask = function() {
  const exclude =
    "!" +
    projectPath(
      PATH_CONFIG.src,
      PATH_CONFIG.html.src,
      "**/{" + TASK_CONFIG.html.excludeFolders.join(',') + "}/**"
    );

  const paths = {
    src: [
      projectPath(
        PATH_CONFIG.src,
        PATH_CONFIG.html.src,
        "**/*.{" + TASK_CONFIG.html.extensions + "}"
      ),
      exclude
    ],
    dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.html.dest)
  };

  const dataFunction =
    TASK_CONFIG.html.dataFunction ||
    function(file) {
      const dataPath = projectPath(
        PATH_CONFIG.src,
        PATH_CONFIG.html.src,
        TASK_CONFIG.html.dataFile
      );
      return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    };

  const nunjucksRenderPath = [
    projectPath(PATH_CONFIG.src, PATH_CONFIG.html.src)
  ];
  TASK_CONFIG.html.nunjucksRender.path =
    TASK_CONFIG.html.nunjucksRender.path || nunjucksRenderPath;

  return gulp.src(paths.src)
    .pipe(browserSync.stream());
};

const { alternateTask = () => htmlTask } = TASK_CONFIG.html;
const task = alternateTask(gulp, PATH_CONFIG, TASK_CONFIG);
gulp.task('html', task);
export default task;
