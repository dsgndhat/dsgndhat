import gulp from "gulp";
import getEnabledTasks from "../lib/getEnabledTasks";
import os from "os";
import fs from "fs";
import del from "del";
import path from "path";
import projectPath from "../lib/projectPath";
import TASK_CONFIG from "../lib/get-task-config";
import PATH_CONFIG from "../lib/get-path-config";
import staticTask from "./static";
import sizeReport from "./size-report";
import replaceFiles from "./replace-files";
import revTask from "./rev";
import clean from "./clean";
import fonts from "./fonts";
// import iconFont from './iconFont'
import images from "./images";
import svgSprite from "./svgSprite";
import html from "./html";
import stylesheets from "./stylesheets";
import isProduction from "../lib/isProduction";
import webpackProductionTask from "./webpackProduction";

const getProductionTasks = (function() {
  const tasks = getEnabledTasks("production");
  const staticSeriesTask = TASK_CONFIG.static ? staticTask : false;
  const parallelAssetTasks = [TASK_CONFIG.fonts && fonts, /*iconFont,*/ TASK_CONFIG.images && images, TASK_CONFIG.svgSprite && svgSprite].filter(el => !!el);
  var assetTasks = parallelAssetTasks.length && gulp.parallel(
    ...parallelAssetTasks
  );
  const parallelCodeTasks = [TASK_CONFIG.html && html, TASK_CONFIG.stylesheets && stylesheets, isProduction && TASK_CONFIG.javascripts && webpackProductionTask].filter(
    el => !!el
  );
  var codeTasks = parallelCodeTasks.length && gulp.parallel(
    ...parallelCodeTasks
  );
  const { prebuild, postbuild } = TASK_CONFIG.additionalTasks.production;
  const seriesTasks = [
    prebuild,
    assetTasks.length && assetTasks,
    codeTasks.length && codeTasks,
    TASK_CONFIG.production.rev && revTask,
    sizeReport,
    staticSeriesTask,
    postbuild,
    replaceFiles
  ].filter(task => !!task);

  return seriesTasks;
})();

const prepProductionPaths = function(cb) {
  // Build to a temporary directory, then move compiled files as a last step
  PATH_CONFIG.finalDest = PATH_CONFIG.dest;
  PATH_CONFIG.dest = PATH_CONFIG.temp
    ? projectPath(PATH_CONFIG.temp)
    : path.join(os.tmpdir(), "gulp-starter");

  // Make sure the temp directory exists and is empty
  del.sync(PATH_CONFIG.dest, { force: true });
  fs.mkdirSync(PATH_CONFIG.dest);
  cb();
};

const productionSeries = gulp.series(
  prepProductionPaths,
  ...getProductionTasks
);

// gulp.task('build', productionSeries)
export default productionSeries;
