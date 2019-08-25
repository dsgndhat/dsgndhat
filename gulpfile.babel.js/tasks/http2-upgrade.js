import gulp from "gulp";
import log from "fancy-log";
import colors from "ansi-colors";
import mergeStream from "merge-stream";
import del from "del";
import projectPath from "../lib/projectPath";

gulp.task("http2-upgrade", function() {
  del([projectPath(PATH_CONFIG.src, PATH_CONFIG.stylesheets.src)], {
    force: true
  });
  log(colors.green("Cleaned stylesheets directory"));

  const configStream = gulp
    .src("extras/http2/**/*")
    .pipe(gulp.dest(projectPath()));

  const srcStream = gulp
    .src(["src/stylesheets", "src/javascripts", "src/html"])
    .pipe(gulp.dest(projectPath(PATH_CONFIG.src)));

  log(colors.green("Created HTTP/2 ready stylesheets directory"));
  log(colors.green("Added some HTTP/2 helpers to the html directory"));
  log(colors.green("Created config/path-config.json"));

  return mergeStream(configStream, srcStream);
});
