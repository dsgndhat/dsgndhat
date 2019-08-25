export default {
  html: false,
  images: true,
  fonts: true,
  static: true,
  svgSprite: true,
  stylesheets: true,

  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: ['./app.js']
    },

    provide: {
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    },

    rules: [{
      test: require.resolve('jquery'),
      use: [{
        loader: 'expose-loader',
        options: 'jQuery'
      },{
        loader: 'expose-loader',
        options: '$'
      }]
    }]
  },

  browserSync: {
    proxy: 'http://localhost:4567',
    reloadDelay: 700,
    files: ['./source/**/*.{erb,html,md,yml}']
  },

  production: {
    rev: false
  }
};
