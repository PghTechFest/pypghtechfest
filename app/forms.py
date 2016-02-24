from flask.ext.wtf import Form
from wtforms import widgets, StringField, TextAreaField, RadioField, SelectMultipleField, BooleanField, PasswordField
from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired

class MultiCheckboxField(SelectMultipleField):
  widget = widgets.ListWidget(prefix_label=False)
  option_widget = widgets.CheckboxInput()

class LoginForm(Form):
  email = EmailField('email', validators=[DataRequired()])
  password = PasswordField('password', validators=[DataRequired()])
  remember_me = BooleanField('remember_me', default=False)

class ChangePwdForm(Form):
  currentpassword = PasswordField('currentpassword', validators=[DataRequired()])
  newpassword1 = PasswordField('newpassword1', validators=[DataRequired()])
  newpassword2 = PasswordField('newpassword2', validators=[DataRequired()])

class SpeakerForm(Form):
  availableTracks = [
    ('Front', 'Front End'),
    ('Back', 'Back End'),
    ('DevOps', 'DevOps'),
    ('Data', 'Data Science'),
    ('Agile', 'Agile'),
    ('Quality', 'Quality'),
    ('Soft', 'Soft Skills')
  ]

  title = StringField('title', validators=[DataRequired()])
  abstract = TextAreaField('abstract', validators=[DataRequired()])
  time = RadioField('time', choices=[('60','60 Minutes'),('30','30 Minutes')])
  tracks = MultiCheckboxField('tracks', choices=availableTracks)
  firstName = StringField('name', validators=[DataRequired()])
  lastName = StringField('name', validators=[DataRequired()])
  email = EmailField('email', validators=[DataRequired()])
  twitter = StringField('twitter')
  bio = TextAreaField('bio', validators=[DataRequired()])
  comments = TextAreaField('comments')
  agree = BooleanField('agree', validators=[DataRequired(message='You must agree to our code of conduct in order to submit a talk.')])