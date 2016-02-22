import datetime
from flask import render_template, flash, redirect
from app import app, db
from .forms import SpeakerForm
from .models import Submission
from config import appConfiguration

@app.route('/')
@app.route('/index')
def index():
  return render_template("index.html", settings = appConfiguration)

@app.route('/venue')
def venue():
  return render_template("venue.html", settings = appConfiguration)

@app.route('/codeofconduct')
def codeofconduct():
  return render_template("codeofconduct.html", settings = appConfiguration)

@app.route('/sponsors')
def sponsors():
  return render_template("sponsors.html", settings = appConfiguration)

@app.route('/callforspeakers', methods=['GET', 'POST'])
def talks():
  if not appConfiguration['openSpeakers']:
    return render_template('callforspeakers.html', settings = appConfiguration)

  form = SpeakerForm()
  if form.validate_on_submit():
    submission = Submission(
      title = form.title.data,
      abstract = form.abstract.data,
      time = form.time.data,
      tracks = ','.join(form.tracks.data),
      firstName = form.firstName.data,
      lastName = form.lastName.data,
      email = form.email.data,
      twitter = form.twitter.data,
      bio = form.bio.data,
      comments = form.comments.data,
      timestamp = datetime.datetime.utcnow())

    db.session.add(submission)
    db.session.commit()
    return render_template('thanksforsubmitting.html', settings = appConfiguration)

  return render_template('talksubmit.html',
                         settings = appConfiguration,
                         title='Submit Talk',
                         form=form)