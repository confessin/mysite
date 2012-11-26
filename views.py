import os
import jinja2
import webapp2

# TODO: move em to settings.
DIRNAME = os.path.join(os.path.dirname(__file__), 'templates')
jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(DIRNAME))


class MainPage(webapp2.RequestHandler):
    def get(self):
        template_values = {
            'greetings': 'foo',
            'url': 'foo',
            'url_linktext': '',
        }

        template = jinja_environment.get_template('index.html')
        self.response.out.write(template.render(template_values))


class ProjectPage(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('projects.html')
        self.response.out.write(template.render({}))
