import browserSync from "browser-sync";

import gulp from "gulp";
import svgstore from "gulp-svgstore";
import projectPath from "../lib/projectPath";
import TASK_CONFIG from "../lib/get-task-config";
import PATH_CONFIG from "../lib/get-path-config";

const svgSpriteTask = function() {
  const settings = {
    src: projectPath(PATH_CONFIG.src, PATH_CONFIG.icons.src, "*.svg"),
    dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.icons.dest)
  };

  return gulp
    .src(settings.src)
    .pipe(svgstore(TASK_CONFIG.svgSprite.svgstore))
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream());
};

const { alternateTask = () => svgSpriteTask } = TASK_CONFIG.svgSprite;
const task = alternateTask(gulp, PATH_CONFIG, TASK_CONFIG);
gulp.task("svgSprite", task);
export default task;
