import gulp from "gulp";
import sizereport from "gulp-sizereport";
import projectPath from "../lib/projectPath";
import TASK_CONFIG from "../lib/get-task-config";
import PATH_CONFIG from "../lib/get-path-config";

export default function sizeReport() {
  return gulp
    .src([projectPath(PATH_CONFIG.dest, "**/*"), "*!rev-manifest.json"])
    .pipe(
      sizereport({
        gzip: true
      })
    );
}
