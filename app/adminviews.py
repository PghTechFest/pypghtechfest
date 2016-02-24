import datetime
from flask import render_template, flash, redirect
from flask.ext.login import login_required, login_user, logout_user, current_user
from app import app, db, lm, bcrypt
from .forms import SpeakerForm, LoginForm, ChangePwdForm
from .models import Submission, User
from config import appConfiguration

@app.route('/admin')
@login_required
def admin():
  return render_template("adminindex.html", settings = appConfiguration)

@app.route('/admin/submissions')
@login_required
def adminsubmissions():
  queryResult = Submission.query.all()
  return render_template("adminsubmissions.html",
    settings = appConfiguration,
    submissions = queryResult)

@app.route('/admin/changepwd', methods=["GET", "POST"])
@login_required
def changepwd():
  form = ChangePwdForm()
  if form.validate_on_submit():
    user = current_user
    if user:
      if bcrypt.check_password_hash(user.password, form.currentpassword.data):
        if form.newpassword1.data == form.newpassword2.data:
          user.password = bcrypt.generate_password_hash(newpassword1)
          db.session.add(submission)
          db.session.commit()
          return render_template('adminindex.html', settings = appConfiguration)
        else:
          flash('Passwords do not match')
      else:
        flash('Invalid password')

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
  return render_template("logout.html")

@lm.user_loader
def user_loader(user_id):
  return User.query.get(user_id)