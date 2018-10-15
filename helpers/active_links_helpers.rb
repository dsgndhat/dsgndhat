module ActiveLinksHelpers
  def page_active?(page)
    current_page.url == page ? 'active' : ''
  end
end
