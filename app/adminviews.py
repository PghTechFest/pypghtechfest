import datetime
from flask import render_template, flash, redirect
from app import app, db
from .forms import SpeakerForm
from .models import Submission
from config import appConfiguration

@app.route('/admin')
def admin():
  return render_template("adminindex.html", settings = appConfiguration)

@app.route('/admin/submissions')
def adminsubmissions():
  return render_template("adminsubmissions.html", settings = appConfiguration)