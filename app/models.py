from app import db

def dump_datetime(value):
  """Deserialize datetime object into string form for JSON processing."""
  if value is None:
    return None
  return [value.strftime("%Y-%m-%d"), value.strftime("%H:%M:%S")]

class Submission(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(80))
  abstract = db.Column(db.Text)
  time = db.Column(db.String(5))
  tracks = db.Column(db.String(80))
  firstName = db.Column(db.String(30))
  lastName = db.Column(db.String(30))
  email = db.Column(db.String(80))
  twitter = db.Column(db.String(80))
  bio = db.Column(db.Text)
  comments = db.Column(db.Text)
  timestamp = db.Column(db.DateTime)
  votes = db.relationship('Vote', backref='ballot', lazy='dynamic')

  @property
  def serialize(self):
    return {
      'id' : self.id,
      'title' : self.title,
      'abstract' : self.abstract,
      'time' : self.time,
      'tracks' : self.tracks,
      'firstName' : self.firstName,
      'lastName' : self.lastName,
      'email' : self.email,
      'twitter' : self.twitter,
      'bio' : self.bio,
      'comments' : self.comments,
      'timestamp' : dump_datetime(self.timestamp)
     }

class User(db.Model):
  """An admin user capable of viewing reports.

  :param str email: email address of user
  :param str password: encrypted password for the user

  """
  __tablename__ = 'user'

  email = db.Column(db.String, primary_key=True)
  password = db.Column(db.String)
  authenticated = db.Column(db.Boolean, default=False)
  votes = db.relationship('Vote', backref='voter', lazy='dynamic')

  def is_active(self):
    """True, as all users are active."""
    return True

  def get_id(self):
    """Return the email address to satisfy Flask-Login's requirements."""
    return self.email

  def is_authenticated(self):
    """Return True if the user is authenticated."""
    return self.authenticated

  def is_anonymous(self):
    """False, as anonymous users aren't supported."""
    return False

  @property
  def serialize(self):
    return {
      'email' : self.email
     }

class Vote(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  talkId = db.Column(db.Integer, db.ForeignKey('submission.id'))
  email = db.Column(db.String, db.ForeignKey('user.email'))
  fitsTechfest = db.Column(db.Integer)
  fitsTrack = db.Column(db.Integer)
  expectedAttendance = db.Column(db.Integer)

  @property
  def serialize(self):
    return {
      'id' : self.id,
      'talkId' : self.talkId,
      'email' : self.email,
      'fitsTechfest' : self.fitsTechfest,
      'fitsTrack' : self.fitsTrack,
      'expectedAttendance' : self.expectedAttendance
     }

class Room(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  sortOrder = db.Column(db.Integer)
  roomName = db.Column(db.String(30))

class TimeSlot(db.Model):
  __tablename__ = 'time_slot'
  id = db.Column(db.Integer, primary_key=True)
  sortOrder = db.Column(db.Integer)
  timeSlotName = db.Column(db.String(30))

class ScheduleSlot(db.Model):
  __tablename__ = 'schedule_slot'
  id = db.Column(db.Integer, primary_key=True)
  talkId = db.Column(db.Integer, db.ForeignKey('submission.id'))
  timeSlotId = db.Column(db.Integer, db.ForeignKey('time_Slot.id'))
  roomId = db.Column(db.Integer, db.ForeignKey('room.id'))