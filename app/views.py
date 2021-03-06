import datetime
from flask import render_template, flash, redirect
from sqlalchemy.dialects import postgresql
from app import app, db
from .forms import SpeakerForm
from .models import Submission, ScheduleSlot, Room, TimeSlot
from config import appConfiguration, logger

@app.route('/')
@app.route('/index')
def index():
  logger.debug('Rendering index.')
  return render_template("index.html", settings = appConfiguration)

@app.route('/venue')
def venue():
  return render_template("venue.html", settings = appConfiguration)

@app.route('/sessions')
def sessions():
  q = ScheduleSlot.query.\
  join(TimeSlot, ScheduleSlot.timeSlotId==TimeSlot.id).\
  join(Submission).\
  join(Room).\
  add_columns(TimeSlot.timeSlotName,
    Room.roomName,
    Submission.title,
    Submission.abstract,
    Submission.firstName,
    Submission.lastName).\
  order_by(TimeSlot.sortOrder, Room.sortOrder)

  #logger.debug(str(q.statement.compile(dialect=postgresql.dialect())))

  items = q.all()

  return render_template('sessions.html',
                          items = items,
                          settings = appConfiguration)

@app.route('/codeofconduct')
def codeofconduct():
  return render_template("codeofconduct.html", settings = appConfiguration)

@app.route('/sponsors')
def sponsors():
  return render_template("sponsors.html", settings = appConfiguration)

@app.route('/speakers')
def speakers():
  return render_template("speakers.html", settings = appConfiguration)

@app.route('/soldout')
def soldout():
  return render_template("soldout.html", settings = appConfiguration)

@app.route('/callforspeakers', methods=['GET', 'POST'])
def talks():
  return redirect("https://www.papercall.io/pghtechfest2018", code=302)
  if not appConfiguration['openSpeakers']:
    return render_template('callforspeakers.html',
      settings = appConfiguration)
  else:
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
