import gulp from "gulp";
import path from "path";
import projectPath from "../lib/projectPath";
import TASK_CONFIG from "../lib/get-task-config";
import PATH_CONFIG from "../lib/get-path-config";
import fonts from "./fonts";
import images from "./images";
import svgSprite from "./svgSprite";
import staticTask from "./static";
import html from "./html";
import stylesheets from "./stylesheets";
import task from "./html";

const watchCallbacks = {
  fonts,
  images,
  svgSprite,
  html,
  stylesheets,
  static: staticTask,
};

var watchTask = function(cb) {
  var watchableTasks = [
    "fonts",
    "iconFont",
    "images",
    "svgSprite",
    "html",
    "stylesheets",
    "static"
  ];

  function getTaskPathFor(taskName) {
    switch (taskName) {
      case "iconFont":
        return PATH_CONFIG.icons;
      case "svgSprite":
        return PATH_CONFIG.icons;
      case "html":
        return PATH_CONFIG.html;
      case "static":
        return PATH_CONFIG.static;
      default:
        return PATH_CONFIG[taskName];
    }
  }

  watchableTasks.forEach(function(taskName) {
    var taskConfig = TASK_CONFIG[taskName];
    var taskPath = getTaskPathFor(taskName);
    var watchConfig = {}
    if (TASK_CONFIG.watch && TASK_CONFIG.watch.gulpWatch) {
      watchConfig = TASK_CONFIG.watch.gulpWatch
    }
    if (taskConfig) {
      var srcPath = projectPath(PATH_CONFIG.src, taskPath.src);
      var globPattern =
        "**/*" +
        (taskConfig.extensions
          ? ".{" + taskConfig.extensions.join(",") + "}"
          : "");
      var taskCallback = watchCallbacks[taskName];
      var watchPath = path.join(srcPath, globPattern);
      if (taskCallback) {
        gulp.watch(watchPath, watchConfig, taskCallback);
      }
    }
  });

  cb();
};

export default watchTask;
