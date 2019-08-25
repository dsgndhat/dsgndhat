
import browserSync from 'browser-sync';

import changed from 'gulp-changed';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminZopfli from 'imagemin-zopfli';
import imageminMozjpeg from 'imagemin-mozjpeg';
import projectPath from '../lib/projectPath';
import TASK_CONFIG from '../lib/get-task-config';
import PATH_CONFIG from '../lib/get-path-config';

var imagesTask = function() {
  var paths = {
    src: projectPath(
      PATH_CONFIG.src,
      PATH_CONFIG.images.src,
      "**/*.{" + TASK_CONFIG.images.extensions + "}"
    ),
    dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.images.dest)
  };

  return gulp
    .src([paths.src, "*!README.md"])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(imagemin([
      // png
      imageminPngquant({
        speed: 1,
        quality: [0.95, 1] //lossy settings
      }),
      imageminZopfli({
        more: true
        // iterations: 50 // very slow but more effective
      }),
      //svg
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      }),
      //jpg lossless
      imagemin.jpegtran({
        progressive: true
      }),
      //jpg very light lossy, use vs jpegtran
      imageminMozjpeg({
        quality: 90
      })
    ]))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
};

gulp.task("images", imagesTask);
export default imagesTask;
