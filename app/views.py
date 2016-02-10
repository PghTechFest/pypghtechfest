from flask import render_template, flash, redirect
from app import app
from .forms import SpeakerForm

@app.route('/')
@app.route('/index')
def index():
  return render_template("index.html")

@app.route('/venue')
def venue():
  return render_template("venue.html")

@app.route('/codeofconduct')
def codeofconduct():
  return render_template("codeofconduct.html")

@app.route('/sponsors')
def sponsors():
  return render_template("sponsors.html")

@app.route('/callforspeakers', methods=['GET', 'POST'])
def talks():
    form = SpeakerForm()
    if form.validate_on_submit():
        flash('Talk submitted from "%s" "%s", called "%s", described as "%s", in tracks "%s"' %
              (form.firstName.data, form.lastName.data, form.title.data, form.abstract.data, form.tracks.data))
        return redirect('/index')
    return render_template('talksubmit.html', 
                           title='Submit Talk',
                           form=form)