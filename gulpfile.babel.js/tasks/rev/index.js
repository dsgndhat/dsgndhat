import gulp from "gulp";
import TASK_CONFIG from "../../lib/get-task-config";
import PATH_CONFIG from "../../lib/get-path-config";
import "./rev-assets";
import "./rev-update-references";
import "./rev-css";
import "./update-html";

var updateHtml = TASK_CONFIG.html && "update-html";
// If you are familiar with Rails, this task the equivalent of `rake assets:precompile`
var revTask = function(cb) {
  return gulp.series(
    [
      // 1) Add md5 hashes to assets referenced by CSS and JS files
      "rev-assets",
      // 2) Update asset references (images, fonts, etc) with reved filenames in compiled css + js
      "rev-update-references",
      // 3) Rev and compress CSS and JS files (this is done after assets, so that if a referenced asset hash changes, the parent hash will change as well
      "rev-css",
      // 4) Update asset references in HTML
      updateHtml
    ].filter(el => !!el)
  )(cb);
};

gulp.task("rev", revTask);
export default revTask;
