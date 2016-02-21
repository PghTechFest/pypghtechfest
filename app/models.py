from app import db

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

  def __repr__(self):
    return '<User %r %r>' % (self.firstName, self.lastName)

class User(db.Model):
  """An admin user capable of viewing reports.

  :param str email: email address of user
  :param str password: encrypted password for the user

  """
  __tablename__ = 'user'

  email = db.Column(db.String, primary_key=True)
  password = db.Column(db.String)
  authenticated = db.Column(db.Boolean, default=False)

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