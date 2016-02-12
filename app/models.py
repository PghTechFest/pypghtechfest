from app import db

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(80))
  abstract = db.Column(db.String(80))
  time = db.Column(db.String(80))
  tracks = db.Column(db.String(80))
  firstName = db.Column(db.String(80))
  lastName = db.Column(db.String(80))
  email = db.Column(db.String(80))
  twitter = db.Column(db.String(80))
  bio = db.Column(db.String(80))
  comments = db.Column(db.String(80))

  def __repr__(self):
    return '<User %r %r>' % (self.firstName, self.lastName)