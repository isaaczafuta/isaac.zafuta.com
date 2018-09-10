import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    SECRET_KEY = os.environ['SECRET_KEY']


class Production(Config):
    CSRF_ENABLED = True
    DEBUG = False


class Development(Config):
    CSRF_ENABLED = False
    DEBUG = True
