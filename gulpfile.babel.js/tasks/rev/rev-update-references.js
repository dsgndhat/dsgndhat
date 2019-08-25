import gulp from "gulp";
import revReplace from "gulp-rev-replace";
import projectPath from "../../lib/projectPath";
import TASK_CONFIG from "../../lib/get-task-config";
import PATH_CONFIG from "../../lib/get-path-config";

// 2) Update asset references with reved filenames in compiled css + js
gulp.task("rev-update-references", function() {
  var manifest = gulp.src(projectPath(PATH_CONFIG.dest, "rev-manifest.json"));

  return gulp
    .src(projectPath(PATH_CONFIG.dest, "**/**.{css,js}"))
    .pipe(revReplace({ manifest: manifest }))
    .pipe(gulp.dest(PATH_CONFIG.dest));
});
