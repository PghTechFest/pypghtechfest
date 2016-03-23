import sys
import datetime
from flask import redirect, jsonify, Response, json, request, abort
from flask.ext.login import login_required, current_user
from app import app, db
from .models import Submission, Vote
from config import appConfiguration, logger

@app.route('/api/submissions', methods=['GET'])
@login_required
def get_submissions():
  items = Submission.query.all()
  return Response(json.dumps([item.serialize for item in items]), mimetype='application/json')

@app.route('/api/votes', methods=['GET'])
@login_required
def get_votes():
  user = current_user
  logger.debug('Getting votes for user {}.'.format(user.email))
  sys.stdout.flush()
  items = Vote.query.filter(Vote.email==user.email).all()
  logger.debug('Found {} votes entered by user {}.'.format(len(items), user.email))
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

  try:
    vote = db.session.query(Vote).filter(Vote.talkId==talkId).filter(Vote.email==user.email).first()
  except:
    logger.error("Unexpected error loading the vote:", sys.exc_info()[0])
    raise

  try:
    if vote == None:
      vote = Vote()
      vote.talkId = talkId
      vote.email = user.email
    vote.fitsTechfest = request.json['fitsTechfest']
    vote.fitsTrack = request.json['fitsTrack']
    vote.expectedAttendance = request.json['expectedAttendance']
    db.session.add(vote)
    db.session.commit()
    logger.debug('User {} voted on talkId {} - {}/{}/{}.'.format(user.email,
      talkId, vote.fitsTechfest, vote.fitsTrack, vote.expectedAttendance))
  except:
    logger.error("Unexpected error saving the vote:", sys.exc_info()[0])
    raise

  return json.dumps(vote.serialize), 201