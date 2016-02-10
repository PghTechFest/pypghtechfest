from flask.ext.wtf import Form
from wtforms import widgets, StringField, TextAreaField, RadioField, SelectMultipleField
from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired

class MultiCheckboxField(SelectMultipleField):
    widget = widgets.ListWidget(prefix_label=False)
    option_widget = widgets.CheckboxInput()

class SpeakerForm(Form):
  availableTracks = [
    ('Front', 'Front End'),
    ('Back', 'Back End'),
    ('DevOps', 'DevOps'),
    ('Data', 'Data Science'),
    ('Agile', 'Agile'),
    ('Business', 'Business of Software')
  ]

  title = StringField('title', validators=[DataRequired()])
  abstract = TextAreaField('abstract', validators=[DataRequired()])
  time = RadioField('time', choices=[('60','60 Minutes'),('30','30 Minutes')])
  tracks = MultiCheckboxField('tracks', choices=availableTracks)
  name = StringField('name', validators=[DataRequired()])
  email = EmailField('email', validators=[DataRequired()])
  twitter = StringField('twitter')
  bio = TextAreaField('bio', validators=[DataRequired()])
  comments = TextAreaField('comments')