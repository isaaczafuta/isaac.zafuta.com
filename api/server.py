import arrow
import os
import uuid

from flask import Blueprint, Flask, jsonify, request, url_for
from flask_sqlalchemy import SQLAlchemy

from config import Config

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
db = SQLAlchemy(app)


# Define some sqlalchemy models


class Expense(db.Model):
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
            'data': [_expense_to_dict(expense)]
        })


app.register_blueprint(api, url_prefix='/api')


if __name__ == '__main__':
    app.run(debug=True, port=9000)
