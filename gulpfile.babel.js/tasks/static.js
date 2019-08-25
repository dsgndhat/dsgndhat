import changed from "gulp-changed";

import gulp from "gulp";
import path from "path";
import projectPath from "../lib/projectPath";
import TASK_CONFIG from "../lib/get-task-config";
import PATH_CONFIG from "../lib/get-path-config";

const staticTask = function() {
  const srcPath = projectPath(PATH_CONFIG.src, PATH_CONFIG.static.src);
  const defaultSrcOptions = { dot: true, allowEmpty: true };
  const options = Object.assign(
    defaultSrcOptions,
    TASK_CONFIG.static.srcOptions || {}
  );

  const paths = {
    src: [
      path.join(srcPath, "**/*"),
      projectPath("!" + PATH_CONFIG.src, PATH_CONFIG.static.src, "README.md")
    ],
    dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.static.dest)
  };

  return gulp.src(paths.src, options).pipe(gulp.dest(paths.dest));
};

// gulp.task('static', staticTask)
export default staticTask;
