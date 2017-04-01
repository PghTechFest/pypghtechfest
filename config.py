import os
import logging
basedir = os.path.abspath(os.path.dirname(__file__))

logger = logging.getLogger()
handler = logging.StreamHandler()
formatter = logging.Formatter(
        '%(asctime)s %(name)-12s %(levelname)-8s %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

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

if os.environ.get('CALL_FOR_SPEAKERS_OPEN') is not None and str.lower(str(os.environ['CALL_FOR_SPEAKERS_OPEN'])) == 'true':
  CALL_FOR_SPEAKERS_OPEN = True
else:
  CALL_FOR_SPEAKERS_OPEN = False

appConfiguration = { "openSpeakers":False,
  "openVolunteers":False,
  "openRegistration":True,
  "showSessions":True }