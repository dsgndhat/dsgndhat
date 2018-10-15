# encoding: utf-8
require 'lib/reading_time'

# protect emails
activate :protect_emails

# permalinks
activate :directory_indexes

# activate :i18n
set :relative_links, true

# per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

set :css_dir, 'assets/stylesheets'
set :fonts_dir, 'assets/fonts'
set :images_dir, 'assets/images'
set :js_dir, 'assets/javascripts'

# markdown
set :markdown_engine, :redcarpet

set :markdown,
    autolink: true,
    fenced_code_blocks: true,
    disable_indented_code_blocks: true,
    footnotes: true,
    highlight: true,
    smartypants: true,
    strikethrough: true,
    tables: true,
    with_toc_data: true
activate :syntax, line_numbers: false

# activate blog section
activate :blog do |blog|
  blog.name = 'notes'
  blog.sources = 'articles/{year}-{month}-{day}-{title}.html'
  blog.prefix = 'notes'
  blog.layout = 'post'
  blog.permalink = '{title}'
  blog.default_extension = '.md'

  # enable pagination
  blog.paginate = true
  #blog.per_page = 6
  #blog.page_link = 'page/{num}'
end

configure :build do
  # initialise ext pipeline when running `middleman build`
  activate :external_pipeline,
         name: :gulp,
         command: 'yarn prod',
         source: 'build',
         latency: 1

  # favicons
  activate :favicon_maker do |fav|
    fav.template_dir = File.join(root, 'source/assets/images/favicons/')
    fav.output_dir = File.join(root, 'build')
    fav.icons = {
      '_favicon_base.png' => [
        { icon: 'chrome-touch-icon-192x192.png' },
        { icon: 'apple-touch-icon.png', size: '152x152' },
        { icon: 'apple-touch-icon-114x114-precomposed.png' },
        { icon: 'apple-touch-icon-72x72-precomposed.png' },
        { icon: 'apple-touch-icon-precomposed.png', size: '57x57' },
        { icon: 'apple-touch-icon.png', size: '57x57' },
        { icon: 'mstile-150x150.png', size: '150x150' },
        { icon: 'ms-touch-icon-144x144-precomposed.png', size: '144x144' },
        { icon: 'favicon-196x196.png' },
        { icon: 'favicon-160x160.png' },
        { icon: 'favicon-96x96.png' },
        { icon: 'favicon-32x32.png' },
        { icon: 'favicon-16x16.png' },
        { icon: 'favicon.ico', size: '64x64,32x32,24x24,16x16' },
      ]
    }
  end

  activate :gzip

  # html optimisation
  activate :minify_html do |html|
    html.remove_quotes = false
    html.remove_intertag_spaces = true
  end

  # ignore css and js
  ignore 'assets/javascripts/app'
  ignore 'assets/stylesheets/app'

  # sitemap
  activate :sitemap, hostname: @app.data.settings.settings.url

  activate :robots,
    rules: [{:user_agent => '*', :allow => %w(/)}],
    sitemap: @app.data.settings.settings.url+'/sitemap.xml'

end

# activate the middleman-search extension and customise it.
# activate :search do |search|
  # specifiy searchers.
  # search.resources = ['']

  # search fields are indexed by default, but not stored. storing takes up
  # space, so we should only store what is needed to render search results: the
  # title, the date, and the URL. we'll index the content but no store it.
  # additionally, we apply a 'boost' to the title and content fields.
  # search.fields = {
  #  title:   { boost: 100, store: true, required: true },
  #  date:    { index: false, store: true },
  #  content: { boost: 50 },
  #  url:     { index: false, store: true }
  # }
# end
