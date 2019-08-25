import gulp from 'gulp';
import gulpif from 'gulp-if';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import handleErrors from '../lib/handleErrors';
import autoprefixer from 'gulp-autoprefixer';
import projectPath from '../lib/projectPath';
import TASK_CONFIG from '../lib/get-task-config';
import PATH_CONFIG from '../lib/get-path-config';
import isProduction from '../lib/isProduction';
import cssnano from 'gulp-cssnano';

const stylesheetsTask = function() {
  const paths = {
    src: projectPath(
      PATH_CONFIG.src,
      PATH_CONFIG.stylesheets.src,
      "**/*.{" + TASK_CONFIG.stylesheets.extensions + "}"
    ),
    dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.stylesheets.dest)
  };

  if (
    TASK_CONFIG.stylesheets.sass &&
    TASK_CONFIG.stylesheets.sass.includePaths
  ) {
    TASK_CONFIG.stylesheets.sass.includePaths = TASK_CONFIG.stylesheets.sass.includePaths.map(
      function(includePath) {
        return projectPath(includePath);
      }
    );
  }

  const cssnanoConfig = TASK_CONFIG.stylesheets.cssnano || {};
  cssnanoConfig.autoprefixer = false; // this should always be false, since we're autoprefixing separately

  return gulp
    .src(paths.src)
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(sass(TASK_CONFIG.stylesheets.sass))
    .on("error", handleErrors)
    .pipe(autoprefixer(TASK_CONFIG.stylesheets.autoprefixer))
    .pipe(gulpif(isProduction, cssnano(cssnanoConfig)))
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
};

// const { alternateTask = () => sassTask } = TASK_CONFIG.stylesheets;
// const stylesheets = alternateTask(gulp, PATH_CONFIG, TASK_CONFIG);

gulp.task('stylesheets', stylesheetsTask);
export default stylesheetsTask;
