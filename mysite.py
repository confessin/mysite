import webapp2
import views


app = webapp2.WSGIApplication([('/', views.MainPage),
                              ('/projects', views.ProjectPage),
                              ('/invitation', views.InvitationPage)],
                              debug=True)
