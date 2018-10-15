module UrlHelpers
  def host_url(url)
    URI.join(data.settings.settings.url, url)
  end
end
