import datetime
from flask import redirect, jsonify, Response, json
from flask.ext.login import login_required
from app import app, db
from .models import Submission
from config import appConfiguration

@app.route('/api/submissions', methods=['GET'])
@login_required
def get_submissions():
  items = Submission.query.all()
  return Response(json.dumps([item.serialize for item in items]), mimetype='application/json')