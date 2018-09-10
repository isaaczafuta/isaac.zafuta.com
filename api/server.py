import arrow
import bcrypt
import os
import uuid

from flask import Blueprint, Flask, jsonify, request, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import login_user, login_required, LoginManager, UserMixin

from config import Config

login_manager = LoginManager()

app = Flask(__name__)
app.config.from_object(f'config.{os.environ["MODE"]}')


login_manager.init_app(app)
db = SQLAlchemy(app)


# Define some sqlalchemy models


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String(length=36), primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.Binary(60), nullable=False)

    def __init__(self, username, password):
        self.id = str(uuid.uuid4())
        self.username = username
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash)


class Expense(db.Model):
    __tablename__ = 'expenses'

    id = db.Column(db.String(length=36), primary_key=True)
    timestamp = db.Column(db.DateTime(timezone=True), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.String)

    def __init__(self, timestamp, amount, notes):
        self.id = str(uuid.uuid4())
        self.timestamp = timestamp
        self.amount = amount
        self.notes = notes


# Define an API and register it with the app
api = Blueprint('api', __name__)


def _expense_to_dict(expense):
    return {
        'id': expense.id,
        'timestamp': arrow.get(expense.timestamp).isoformat(),
        'amount': expense.amount,
        'notes': expense.notes,
    }


def _bad_parameters_response():
    return jsonify({
        'status': 'failure',
    }), 400


def _unauthorized_response():
    return jsonify({
        'status': 'failure',
    }), 401


def _not_found_response():
    return jsonify({
        'status': 'failure'
    }), 404


@api.route('/expenses', methods=['GET'])
@login_required
def get_expenses():
    expenses = Expense.query.all()
    return jsonify({
        'status': 'success',
        'data': [_expense_to_dict(expense) for expense in expenses]
    })


@api.route('/expenses', methods=['PUT'])
@login_required
def create_expense():
    timestamp = request.form.get('timestamp')
    amount = request.form.get('amount')
    notes = request.form.get('notes')

    try:
        if timestamp:
            parsed_timestamp = arrow.get(timestamp)
        else:
            parsed_timestamp = arrow.utcnow()
        parsed_amount = int(amount)
    except (TypeError, ValueError, arrow.parser.ParserError):
        return _bad_parameters_response()
    else:
        expense = Expense(
            timestamp=parsed_timestamp.datetime,
            amount=parsed_amount,
            notes=notes
        )
        db.session.add(expense)
        db.session.commit()

        return jsonify({
            'status': 'success',
            'data': _expense_to_dict(expense)
        })


@api.route('/expense/<expense_id>', methods=['PATCH'])
@login_required
def update_expense(expense_id):
    amount = request.form.get('amount')
    notes = request.form.get('notes')

    expense = Expense.query.filter(Expense.id == expense_id).first()

    if not expense:
        return _not_found_response()

    if amount is not None:
        expense.amount = amount
    if notes is not None:
        expense.notes = notes

    if amount is not None or notes is not None:
        db.session.add(expense)
        db.session.commit()

    return jsonify({
        'status': 'success',
        'data': _expense_to_dict(expense)
    })


@api.route('/expense/<expense_id>', methods=['DELETE'])
@login_required
def delete_expense(expense_id):
    expense = Expense.query.filter(Expense.id == expense_id).first()

    if not expense:
        return _not_found_response()

    db.session.delete(expense)
    db.session.commit()

    return jsonify({
        'status': 'success',
    })


class UserIdentity(UserMixin):

    def __init__(self, id):
        self.id = id


@login_manager.user_loader
def load_user(user_id):
    user = User.filter(User.id == user_id).first()
    return UserIdentity(user.id)


# @api.route('/create_user', methods={'PUT'})
# def create_user():
#     username = request.form.get('username')
#     password = request.form.get('password')
#
#     db.session.add(User(username=username, password=password))
#     db.session.commit()
#
#     return jsonify({
#         'status': 'success',
#     })


@api.route('/signin', methods={'POST'})
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    if not username or not password:
        return _bad_parameters_response()

    user = User.query.filter(username == username).first()

    if not user or not user.check_password(password):
        return _unauthorized_response()

    login_user(UserIdentity(user.id))

    return jsonify({
        'status': 'success',
    })


app.register_blueprint(api, url_prefix='/api')


if __name__ == '__main__':
    db.create_all()
    app.run(port=5000, host="0.0.0.0")
