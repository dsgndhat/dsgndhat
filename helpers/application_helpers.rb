module ApplicationHelpers
  def markdown(contents)
    renderer = Redcarpet::Render::HTML
    markdown = Redcarpet::Markdown.new(
      renderer,
      autolink: true,
      fenced_code_blocks: true,
      footnotes: true,
      highlight: true,
      smartypants: true,
      strikethrough: true,
      tables: true,
      with_toc_data: true
    )
    markdown.render(contents)
  end

  def svg(name)
    root = Middleman::Application.root
    images_path = config[:images_dir]
    file_path = "#{root}/source/#{images_path}/#{name}.svg"

    return File.read(file_path) if File.exist?(file_path)
    '(SVG not found)'
  end

  def page_active?(page)
    current_page.url == page ? 'active' : ''
  end
end
