
import gulp from "gulp";

import logger from "../lib/compileLogger";
import webpack from "webpack";
import webpackConfig from "../lib/webpack-multi-config";

var webpackProductionTask = function(callback) {
  webpack(webpackConfig("production"), function(err, stats) {
    logger(err, stats);
    callback();
  });
};

gulp.task("webpack:production", webpackProductionTask);
export default webpackProductionTask;
