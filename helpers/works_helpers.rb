# helper for works page
module WorksHelpers
  def page_works
    works = current_page.data.works
    data.pages.works.send(works)
  end
end
