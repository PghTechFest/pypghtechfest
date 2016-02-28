import datetime
from flask import redirect, jsonify
from app import app, db
from .models import Submission
from config import appConfiguration

@app.route('/submissions', methods=['GET'])
def get_submissions():
  queryResult = Submission.query.all()
  return jsonify(json_list=[i.serialize for i in queryResult])