from flask.ext.wtf import Form
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired

class SpeakerForm(Form):
  name = StringField('name', validators=[DataRequired()])
  title = StringField('title', validators=[DataRequired()])
  abstract = StringField('abstract', validators=[DataRequired()])