import os
basedir = os.path.abspath(os.path.dirname(__file__))

if os.environ.get('DATABASE_URL') is None:
  SQLALCHEMY_DATABASE_URI = ('sqlite:///' + os.path.join(basedir, 'app.db') +
                             '?check_same_thread=False')
else:
  SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']

SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')
SQLALCHEMY_RECORD_QUERIES = True
SQLALCHEMY_TRACK_MODIFICATIONS = False

WTF_CSRF_ENABLED = True
if os.environ.get('XSS_TOKEN') is None:
  SECRET_KEY = 'you-will-never-guess'
else:
  SECRET_KEY = os.environ['XSS_TOKEN']

if os.environ.get('CALL_FOR_SPEAKERS_OPEN') is None:
  CALL_FOR_SPEAKERS_OPEN = False
else:
  CALL_FOR_SPEAKERS_OPEN = os.environ['CALL_FOR_SPEAKERS_OPEN']


appConfiguration = { "openSpeakers":CALL_FOR_SPEAKERS_OPEN,
  "openVolunteers":False,
  "openRegistration":False,
  "showSessions":False }