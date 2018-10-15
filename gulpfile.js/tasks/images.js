if(!TASK_CONFIG.images) return

var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var imagemin    = require('gulp-imagemin')
var imageminPngquant = require('imagemin-pngquant')
var imageminZopfli = require('imagemin-zopfli')
var imageminMozjpeg = require('imagemin-mozjpeg')
var projectPath = require('../lib/projectPath')

var imagesTask = function() {

  var paths = {
    src: projectPath(PATH_CONFIG.src, PATH_CONFIG.images.src, '**/*.{' + TASK_CONFIG.images.extensions + '}'),
    dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.images.dest)
  }

  return gulp.src([paths.src, , '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(imagemin([
      // png
      imageminPngquant({
        speed: 1,
        quality: 98 //lossy settings
      }),
      imageminZopfli({
        more: true
        // iterations: 50 // very slow but more effective
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
    .pipe(browserSync.stream())
}

gulp.task('images', imagesTask)
module.exports = imagesTask
