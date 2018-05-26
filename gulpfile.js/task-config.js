module.exports = {
  images      : true,
  fonts       : true,
  static      : true,
  svgSprite   : true,
  stylesheets : true,

  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: ['./app.js']
    }
  },

  browserSync: {
    proxy: 'http://localhost:4567',
    reloadDelay: 700,
    files: ['./source/**/*.{erb,html,md,yml}']
  },

  production: {
    rev: false
  }
}
