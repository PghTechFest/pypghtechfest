from flask.ext.wtf import Form
from wtforms import StringField, TextAreaField, RadioField
from wtforms.validators import DataRequired

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
  tracks = StringField('tracks')
  name = StringField('name', validators=[DataRequired()])
  email = StringField('email', validators=[DataRequired()])
  twitter = StringField('twitter')
  bio = TextAreaField('bio', validators=[DataRequired()])
  comments = TextAreaField('comments')