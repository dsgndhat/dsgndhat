module MetaTagsHelpers
  def meta_tags_page_title
    if current_page.data.page_title
      "#{current_page.data.page_title} | #{data.site.title}"
    else
      data.site.title
    end
  end

  def meta_tags_description
    current_page.data['summary'] || current_page.data.description || data.site.description
  end

  def meta_tags_keywords
    current_page.data.tags
  end

  def meta_tags_name
    data.site.name
  end

  def meta_tags_title
    current_page.data.page_title || data.site.title
  end
end
