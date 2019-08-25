import gulp from "gulp";
import log from "fancy-log";
import colors from "ansi-colors";
import projectPath from "../lib/projectPath";
import merge from "merge-stream";

gulp.task("init-config", function() {
  var configStream = gulp
    .src(["gulpfile.js/path-config.json", "gulpfile.js/task-config.js"])
    .pipe(gulp.dest(projectPath("config")));

  log(
    colors.green(
      "Adding default path-config.json and task-config.js files to ./config/"
    )
  );

  return configStream;
});
