#!/usr/bin/env python
"""Create a new admin user able to view the /reports endpoint."""
from getpass import getpass
import sys

from flask import current_app
from app import app, bcrypt, db
from app.models import User

def main():
    """Main entry point for script."""
    with app.app_context():
        db.metadata.create_all(db.engine)

        email = sys.argv[1]
        password = sys.argv[2]

        user = User(email=email, password=bcrypt.generate_password_hash(password))
        db.session.add(user)
        db.session.commit()

if __name__ == '__main__':
    sys.exit(main())