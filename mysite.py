import webapp2
import views


app = webapp2.WSGIApplication([('/', views.MainPage),
                              ('/projects', views.ProjectPage),
                              ('/invitation', views.InvitationPage),
                              ('/hena_weds_ali', views.AliInvitationPage)],
                              debug=True)
