import datetime
from flask import render_template, flash, redirect
from app import app, db
from .forms import SpeakerForm
from .models import Submission
import config

settings = { "openSpeakers":config.CALL_FOR_SPEAKERS_OPEN,
  "openVolunteers":False,
  "openRegistration":False }

@app.route('/')
@app.route('/index')
def index():
  return render_template("index.html", settings = settings)

@app.route('/venue')
def venue():
  return render_template("venue.html", settings = settings)

@app.route('/codeofconduct')
def codeofconduct():
  return render_template("codeofconduct.html", settings = settings)

@app.route('/sponsors')
def sponsors():
  return render_template("sponsors.html", settings = settings)

@app.route('/callforspeakers', methods=['GET', 'POST'])
def talks():
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
      return render_template('thanksforsubmitting.html', settings = settings)

    return render_template('talksubmit.html',
                           settings = settings,
                           title='Submit Talk',
                           form=form)