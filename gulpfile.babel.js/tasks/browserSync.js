import browserSync from "browser-sync";

import gulp from "gulp";
import webpack from "webpack";
import webpackMultiConfig from "../lib/webpack-multi-config";
import pathToUrl from "../lib/pathToUrl";
import projectPath from "../lib/projectPath";
import TASK_CONFIG from "../lib/get-task-config";
import PATH_CONFIG from "../lib/get-path-config";

var browserSyncTask = function(cb) {
  var webpackConfig = webpackMultiConfig("development");
  var compiler = webpack(webpackConfig);
  var proxyConfig = TASK_CONFIG.browserSync.proxy || null;

  if (typeof proxyConfig === "string") {
    TASK_CONFIG.browserSync.proxy = {
      target: proxyConfig
    };
  }

  // Resolve path from project
  if (
    TASK_CONFIG.browserSync.server &&
    TASK_CONFIG.browserSync.server.baseDir
  ) {
    TASK_CONFIG.browserSync.server.baseDir = projectPath(
      TASK_CONFIG.browserSync.server.baseDir
    );
  }

  // Resolve files from project
  if (TASK_CONFIG.browserSync.files) {
    TASK_CONFIG.browserSync.files = TASK_CONFIG.browserSync.files.map(function(
      glob
    ) {
      return projectPath(glob);
    });
  }

  var server = TASK_CONFIG.browserSync.proxy || TASK_CONFIG.browserSync.server;

  server.middleware =
    server.middleware ||
    [
      require("webpack-dev-middleware")(compiler, {
        stats: "errors-only",
        watchOptions: TASK_CONFIG.browserSync.watchOptions || {},
        publicPath: pathToUrl("/", webpackConfig.output.publicPath)
      }),
      require("webpack-hot-middleware")(compiler)
    ].concat(server.extraMiddlewares || []);

  browserSync.init(TASK_CONFIG.browserSync);

  cb();
};

gulp.task('browserSync', browserSyncTask)
export default browserSyncTask;
