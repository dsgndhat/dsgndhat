import gulp from "gulp";

import revReplace from "gulp-rev-replace";
import projectPath from "../../lib/projectPath";
import TASK_CONFIG from "../../lib/get-task-config";
import PATH_CONFIG from "../../lib/get-path-config";

// 4) Update asset references in HTML
gulp.task("update-html", function() {
  var manifest = gulp.src(projectPath(PATH_CONFIG.dest, "rev-manifest.json"));
  return gulp
    .src(projectPath(PATH_CONFIG.dest, PATH_CONFIG.html.dest, "**/*.html"))
    .pipe(revReplace({ manifest: manifest }))
    .pipe(gulp.dest(projectPath(PATH_CONFIG.dest, PATH_CONFIG.html.dest)));
});
