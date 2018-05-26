# encoding: utf-8
require 'lib/reading_time'

# protect emails
activate :protect_emails

# permalinks
activate :directory_indexes

set :relative_links, true

# per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page '/404.html', directory_index: false
page '/sitemap.html', layout: false
page '/feed.xml', layout: false

set :css_dir, 'assets/stylesheets'
set :fonts_dir, 'assets/fonts'
set :images_dir, 'assets/images'
set :js_dir, 'assets/javascripts'

# markdown
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
set :markdown_engine, :redcarpet
activate :syntax, line_numbers: false

# activate notes aka blog section
activate :blog do |blog|
  blog.name = 'notes'
  blog.prefix = 'notes'
  blog.layout = 'post'
  blog.permalink = '{title}'
  blog.default_extension = '.md'
  blog.tag_template = 'tag.html'

  # Enable pagination
  blog.paginate = true
  blog.per_page = 6
  blog.page_link = 'page/{num}'
end

# proxy projects aka works items
# data.works.projects.each do |project|
#  proxy '/works/#{project.path}/.html', '/works/works-list.html', locals: {
#    project: project,
#    work_pages: data.works.projects,
#    path: 'works'
#  }, ignore: true
# end

# production
configure :build do
  activate :external_pipeline,
           name: :gulp,
           command: 'yarn prod',
           source: 'dist',
           latency: 1

  ignore 'assets/javascripts/app.js'
  ignore 'assets/stylesheets/app'

  activate :gzip

  activate :minify_html do |html|
    html.remove_quotes = false
    html.remove_intertag_spaces = true
  end

  activate :favicon_maker, :icons => {
    '_favicon_template.png' => [
      { icon: 'apple-touch-icon-180x180-precomposed.png' },
      { icon: 'apple-touch-icon-152x152-precomposed.png' },
      { icon: 'apple-touch-icon-144x144-precomposed.png' },
      { icon: 'apple-touch-icon-114x114-precomposed.png' },
      { icon: 'apple-touch-icon-72x72-precomposed.png' },
      { icon: 'apple-touch-icon-precomposed.png', size: '57x57' },
      { icon: 'apple-touch-icon.png', size: '57x57' },
      { icon: 'favicon-32x32.png' },
      { icon: 'favicon.png', size: '16x16' },
      { icon: 'favicon.ico', size: '64x64,32x32,24x24,16x16' },
      { icon: 'mstile-150x150.png', size: '150x150' },
    ]
  }
end
