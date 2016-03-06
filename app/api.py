import datetime
from flask import redirect, jsonify, Response, json, request, abort
from flask.ext.login import login_required, current_user
from app import app, db
from .models import Submission, Vote
from config import appConfiguration

@app.route('/api/submissions', methods=['GET'])
@login_required
def get_submissions():
  items = Submission.query.all()
  return Response(json.dumps([item.serialize for item in items]), mimetype='application/json')

@app.route('/api/votes', methods=['GET'])
@login_required
def get_votes():
  user = current_user
  items = Vote.query.filter(Vote.email==user.email).all()
  return Response(json.dumps([item.serialize for item in items]), mimetype='application/json')

@app.route('/api/votes/<int:talkId>', methods=['GET'])
@login_required
def get_vote(talkId):
  user = current_user
  vote = Vote.query.filter(Vote.talkId==talkId).filter(Vote.email==user.email).one_or_none()
  return Response(json.dumps(vote.serialize), mimetype='application/json')

@app.route('/api/votes', methods=['POST'])
@login_required
def post_vote():
  user = current_user
  if not request.json or not 'talkId' in request.json:
    abort(400)

  talkId = request.json['talkId']
  vote = db.session.query(Vote).filter(Vote.talkId==talkId).filter(Vote.email==user.email).first()
  if vote == None:
    vote = Vote()
    vote.talkId = request.json['talkId']
    vote.email = user.email
  vote.fitsTechfest = request.json['fitsTechfest']
  vote.fitsTrack = request.json['fitsTrack']
  vote.expectedAttendance = request.json['expectedAttendance']
  db.session.add(vote)
  db.session.commit()
  return json.dumps(vote.serialize), 201