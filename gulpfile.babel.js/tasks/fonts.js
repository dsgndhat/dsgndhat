
import browserSync from "browser-sync";

import changed from "gulp-changed";
import gulp from "gulp";
import projectPath from "../lib/projectPath";
import TASK_CONFIG from "../lib/get-task-config";
import PATH_CONFIG from "../lib/get-path-config";

var fontsTask = function() {
  var paths = {
    src: projectPath(
      PATH_CONFIG.src,
      PATH_CONFIG.fonts.src,
      "**/*.{" + TASK_CONFIG.fonts.extensions + "}"
    ),
    dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.fonts.dest)
  };

  return gulp
    .src([paths.src, "*!README.md"])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
};

gulp.task("fonts", fontsTask);
export default fontsTask;
