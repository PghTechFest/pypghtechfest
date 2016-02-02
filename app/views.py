from flask import render_template
from app import app

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

@app.route('/callforspeakers')
def talks():
  return render_template("callforspeakers.html")