module MetaTagsHelpers
  def meta_tag_description
    site_description = data.settings.settings.description
    page_description = current_page.data.description

    if page_description.nil? || page_description.empty?
      description = site_description
    else
      description = page_description
    end

    if description.nil? || description.empty?
      puts "== path:#{current_page.url} meta description is missing on settings.yml"
    elsif description.length > 150
      puts "== path:#{current_page.url} meta description should be between 140-150 characters. You have: #{description.length}"
    else
      description
    end
  end

  def meta_tag_image
    if current_page.data['banner_picture']
      path = page_image_path(current_page.data['banner_picture'])
    elsif current_page.data['cover_picture']
      path = page_image_path(current_page.data['cover_picture'])
    else
      path = image_path('banner-meta.jpg')
    end

    host_url(path)
  end

  def meta_tag_title
    site_title = data.settings.settings.title
    page_title = current_page.data.title
    separator  = data.settings.settings.title_separator

    if page_title.nil? || page_title.empty?
      return title = site_title
    else
      title = page_title
    end

    if title.blank?
      puts "== path:#{current_page.url} title is missing on settings.yml"
    elsif title.length > 70
      puts "== path:#{current_page.url} title should be under 70 characters. You have: #{title.length}"
    else
      title += ' ' + separator + ' '
      title += site_title

      title
    end

  end

  def meta_tag_site_name
    data.settings.settings.name
  end

  def meta_tag_author
    data.settings.settings.author
  end

  def meta_tag_twitter
    "@#{data.settings.settings.twitter}"
  end

  def meta_tag_url
    host_url(current_page.url)
  end
end
