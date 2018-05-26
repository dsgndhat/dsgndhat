# helper for works page
module WorksHelpers
  def page_works
    works = current_page.data.works
    data.works.send(works)
  end
end
