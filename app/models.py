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