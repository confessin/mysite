import webapp2
import views


app = webapp2.WSGIApplication([('/', views.MainPage),
                              ('/projects', views.ProjectPage)],
                              debug=True)
