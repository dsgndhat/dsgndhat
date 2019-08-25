import gulp from "gulp";
import del from "del";
import projectPath from "../lib/projectPath";
import TASK_CONFIG from "../lib/get-task-config";
import PATH_CONFIG from "../lib/get-path-config";

const cleanTask = function() {
  var patterns =
    TASK_CONFIG.clean && TASK_CONFIG.clean.patterns
      ? TASK_CONFIG.clean.patterns
      : projectPath(PATH_CONFIG.dest);

  return del(patterns, { force: true });
};

gulp.task("clean", cleanTask);
export default cleanTask;
