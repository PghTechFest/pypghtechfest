import datetime
from flask import render_template, flash, redirect
from flask.ext.login import login_required, login_user, logout_user, current_user
from app import app, db, lm, bcrypt
from .forms import SpeakerForm, LoginForm, ChangePwdForm
from .models import Submission, User, Vote
from config import appConfiguration, logger
from sqlalchemy import func

@app.route('/admin')
@login_required
def admin():
  return render_template("adminindex.html",
    settings = appConfiguration)

@app.route('/admin/submissions')
@login_required
def adminsubmissions():
  queryResult = Submission.query.all()
  return render_template("adminsubmissions.html",
    settings = appConfiguration,
    submissions = queryResult)

@app.route('/admin/config')
@login_required
def adminconfig():
  return render_template("adminconfig.html",
    settings = appConfiguration)

@app.route('/admin/changepwd', methods=["GET", "POST"])
@login_required
def changepwd():
  form = ChangePwdForm()
  if form.validate_on_submit():
    user = current_user
    if user:
      if bcrypt.check_password_hash(user.password, form.currentpassword.data):
        if form.newpassword1.data == form.newpassword2.data:
          user.password = bcrypt.generate_password_hash(form.newpassword1.data)
          db.session.add(user)
          db.session.commit()
          return render_template('adminindex.html', settings = appConfiguration)
        else:
          statusmessage = 'Passwords do not match'
      else:
        statusmessage = 'Invalid password'
    else:
      statusmessage = 'No user'
    flash(statusmessage)

  return render_template('changepwd.html',
                         settings = appConfiguration,
                         form=form)

@app.route("/login", methods=["GET", "POST"])
def login():
  form = LoginForm()
  if form.validate_on_submit():
    user = User.query.get(form.email.data)
    if user:
      if bcrypt.check_password_hash(user.password, form.password.data):
        user.authenticated = True
        db.session.add(user)
        db.session.commit()
        login_user(user, remember=True)
        return redirect("admin")
  return render_template("login.html", form=form)

@app.route("/logout", methods=["GET"])
@login_required
def logout():
  user = current_user
  user.authenticated = False
  db.session.add(user)
  db.session.commit()
  logout_user()
  return redirect("/")

@lm.user_loader
def user_loader(user_id):
  return User.query.get(user_id)

@app.route('/admin/speakers', methods=['GET'])
@login_required
def get_speakers():
  items = db.session.query(Submission.email, func.count(Submission.email)).group_by(Submission.email).order_by(Submission.email).all()
  totalSubmissions = 0
  totalSpeakers = 0
  for item in items:
    totalSpeakers += 1
    totalSubmissions += item[1]
  logger.info('Found {} speakers with {} submissions.'.format(totalSpeakers, totalSubmissions))
  return render_template("adminspeakers.html",
    items = items,
    totalSpeakers = totalSpeakers,
    totalSubmissions=totalSubmissions)

@app.route('/admin/votetotals', methods=['GET'])
@login_required
def get_votetotals():
  items = db.session.query(Submission.title,
    Submission.firstName,
    Submission.lastName,
    Submission.time,
    func.count(Vote.id).label("voteCount"),
    func.avg(Vote.fitsTechfest).label("avgFitsTechfest"),
    func.avg(Vote.fitsTrack).label("avgIWouldGo"),
    func.avg(Vote.expectedAttendance).label("avgExpectedAttendance")).\
    join(Vote).\
    group_by(Submission.title).\
    group_by(Submission.firstName).\
    group_by(Submission.lastName).\
    group_by(Submission.time).\
    order_by(Submission.title).\
    all()
  return render_template("adminvotetotals.html",
    items = items)