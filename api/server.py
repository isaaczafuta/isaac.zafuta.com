import arrow
import os
import uuid

from flask import Blueprint, Flask, jsonify, request, url_for
from flask_sqlalchemy import SQLAlchemy

from config import Config

app = Flask(__name__)
app.config.from_object(f'config.{os.environ["MODE"]}')
db = SQLAlchemy(app)


# Define some sqlalchemy models


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


def _not_found_response():
    return jsonify({
        'status': 'failure'
    }), 404


@api.route('/expenses', methods=['GET'])
def get_expenses():
    expenses = Expense.query.all()
    return jsonify({
        'status': 'success',
        'data': [_expense_to_dict(expense) for expense in expenses]
    })


@api.route('/expenses', methods=['PUT'])
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
def delete_expense(expense_id):
    expense = Expense.query.filter(Expense.id == expense_id).first()

    if not expense:
        return _not_found_response()

    db.session.delete(expense)
    db.session.commit()

    return jsonify({
        'status': 'success',
    })


app.register_blueprint(api, url_prefix='/api')


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True, port=5000, host="0.0.0.0")
