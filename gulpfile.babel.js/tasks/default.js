import gulp from "gulp";
import getEnabledTasks from "../lib/getEnabledTasks";
import TASK_CONFIG from "../lib/get-task-config";
import PATH_CONFIG from "../lib/get-path-config";
import staticTask from "./static";
import watch from "./watch";
import browserSyncTask from "./browserSync";
import clean from "./clean";
import fonts from "./fonts";
// import iconFont from './iconFont'
import images from "./images";
import svgSprite from "./svgSprite";
import html from "./html";
import stylesheets from "./stylesheets";
import isProduction from "../lib/isProduction";
import webpackProductionTask from "./webpackProduction";

// var assetTasks = ['fonts', 'iconFont', 'images', 'svgSprite']
// var codeTasks = ['html', 'stylesheets', 'javascripts']

var getDefaultTasks = function(cb) {
  var tasks = getEnabledTasks("watch");
  const { prebuild, postbuild } = TASK_CONFIG.additionalTasks.development;

  const parallelAssetTasks = [TASK_CONFIG.fonts && fonts, /*iconFont,*/ TASK_CONFIG.images && images, TASK_CONFIG.svgSprite && svgSprite].filter(el => !!el)
  var assetTasks = parallelAssetTasks.length && gulp.parallel(
    ...parallelAssetTasks
  );

  const parallelCodeTasks = [TASK_CONFIG.html && html, TASK_CONFIG.stylesheets && stylesheets, isProduction && TASK_CONFIG.javascripts && webpackProductionTask].filter(
    el => !!el
  )

  var codeTasks = parallelCodeTasks.length && gulp.parallel(
    ...parallelCodeTasks
  );
  var seriesArgs = [
    clean,
    prebuild,
    assetTasks.length && assetTasks,
    codeTasks.length && codeTasks,
    TASK_CONFIG.static && staticTask,
    postbuild,
    browserSyncTask
  ].filter(task => !!task);

  return seriesArgs;
};

const defaultSeries = gulp.series(...getDefaultTasks(), watch);
export default defaultSeries;
