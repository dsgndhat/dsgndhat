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

# tell Middleman to ignore the template
ignore '/templates/*'

activate :pagination

# proxy projects aka works items
data.works.projects.each do |data|
  data.projects.each do |project|
    proxy '/works/#{project.path}/.html', '/templates/works-list.html', locals: { project: project }
  end

  paginate data.projects.sort_by(), '/works', '/templates/works-list.html', suffix: '/page/:num/index', per_page: 10
end
