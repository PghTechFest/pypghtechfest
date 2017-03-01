#!flask/bin/python
"""Create a new admin user able to view the /reports endpoint."""
from getpass import getpass
import sys

from app import app, bcrypt

def main():
    """Main entry point for script."""
    password = sys.argv[1]

    return bcrypt.generate_password_hash(password)

if __name__ == '__main__':
    sys.exit(main())