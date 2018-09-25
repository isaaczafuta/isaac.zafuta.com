import classNames from "classnames";
import React from "react";
import moment from "moment";
import 'moment-timezone';
import PropTypes from "prop-types";

import {CurrencyInput} from "../../components/CurrencyInput";
import {Navigation} from "../../components/layout/Navigation";
import {Page} from "../../components/layout/Page";


class ExpenseEditor extends React.Component {
  static propTypes = {
    expense: PropTypes.object.isRequired,
    onEditConfirmed: PropTypes.func.isRequired,
    onEditCanceled: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      amount: this.props.expense.amount,
      notes: this.props.expense.notes,
      submitting: false,
    }
  }

  _saveChanges = () => {
    if (this.state.amount === this.props.expense.amount && this.state.notes === this.props.expense.notes) {
      this.props.onEditCanceled();
    } else {
      const formData = new FormData();
      formData.append("amount", this.state.amount);
      formData.append("notes", this.state.notes);

      this.setState({
        submitting: true
      });

      const url = `/api/expense/${this.props.expense.id}`;
      fetch(url, {
        credentials: 'include',
        method: "PATCH",
        body: formData
      }).then((r) => {
        // TODO: don't mutate
        this.props.expense.amount = this.state.amount;
        this.props.onEditConfirmed(this.props.expense);
      });
    }
  };

  render = () => {
    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Edit Expense</p>
            <button className="delete" onClick={this.props.onCancel} />
          </header>
          <section className="modal-card-body">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Amount</label>
              </div>
              <div className="field-body">
                <div className="field is-expanded">
                  <div className="field has-addons">
                    <p className="control">
                      <button className="button is-static">$</button>
                    </p>
                    <p className="control is-expanded">
                      <CurrencyInput className="input"
                                     type="text"
                                     placeholder="Amount"
                                     value={this.state.amount}
                                     onChange={(amount) => this.setState({amount: amount})} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Notes</label>
              </div>
              <div className="field-body">
                <div className="field is-expanded">
                  <div className="field">
                    <p className="control is-expanded">
                      <input className="input"
                             type="text"
                             placeholder="Notes"
                             value={this.state.notes}
                             onChange={(e) => this.setState({notes: e.target.value})} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className={classNames("button", "is-primary", {"is-loading": this.state.submitting})}
                    onClick={this._saveChanges}>Save changes</button>
            <button className="button"
                    onClick={this.props.onEditCanceled}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }

}

class ExpenseDeleter extends React.Component {
  static propTypes = {
    expense: PropTypes.object.isRequired,
    onDeleteConfirmed: PropTypes.func.isRequired,
    onDeleteCanceled: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
    }
  }

  _handleDeletePressed = (e) => {
    e.preventDefault();
    this.setState({
      submitting: true
    });

    const url = `/api/expense/${this.props.expense.id}`;
    fetch(url, {
      credentials: 'include',
      method: "DELETE",
    }).then((r) => {
      this.props.onDeleteConfirmed(this.props.expense);
    });
  };

  render = () => (
    <div className="modal is-active">
      <div className="modal-background"/>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Delete Expense</p>
          <button className="delete" onClick={this.props.onCancel} />
        </header>
        <section className="modal-card-body">
          <p>Are you sure you want to delete <b>{this.props.expense.notes}</b>?</p>
        </section>
        <footer className="modal-card-foot">
          <button className={classNames("button", "is-danger", {"is-loading": this.state.submitting})}
                  onClick={this._handleDeletePressed}>Delete</button>
          <button className="button"
                  onClick={this.props.onDeleteCanceled}>Cancel</button>
        </footer>
      </div>
    </div>
  );
}

class ExpenseForm extends React.Component {

  static propTypes = {
    onSave: PropTypes.func.isRequired
  };

  constructor(props) {
    super();

    this.state = {
      amount: 0,
      notes: "",
      submitting: false,
    }

  }

  render = () => {
    return (
      <div className="field has-addons has-addons-centered">
        <p className="control">
          <CurrencyInput autoFocus
                         tabIndex="1"
                         className="input"
                         type="text"
                         placeholder="Amount"
                         value={this.state.amount}
                         onChange={amount => this.setState({amount})}/>
        </p>
        <p className="control">
          <input className="input"
                 tabIndex="2"
                 type="text"
                 placeholder="Notes"
                 value={this.state.notes}
                 onChange={(e) => this.setState({notes: e.target.value})} />
        </p>
        <p className="control">
          <button tabIndex="3"
                  className={classNames("button", "is-primary", {"is-loading": this.state.submitting})}
                  onClick={this.saveExpense}>
            Save
          </button>
        </p>
      </div>
    );
  };

  saveExpense = async () => {
    const formData = new FormData();
    formData.append("amount", this.state.amount);
    formData.append("notes", this.state.notes);

    this.setState({
      submitting: true
    });

    const response = await fetch("/api/expenses", {
      credentials: 'same-origin',
      method: "put",
      body: formData
    });
    const newExpense = (await response.json()).data;
    this.setState({
        amount: null,
        notes: "",
        submitting: false,
    });
    this.props.onSave(newExpense);
  }

}


class NotificationBanner extends React.Component {

  static propTypes = {
    remainder: PropTypes.number.isRequired,
  };

  _getNotificationMessage = (remainder) => {
    if (remainder < 0) {
      return `You're over the budget by $${Number(-remainder / 100).toFixed(2)}`;
    } else if (remainder === 0) {
      return `You're right on budget!`;
    } else {
      return `You have $${Number(remainder / 100).toFixed(2)} left to spend`;
    }
  };

  render = () => (
    <div className={classNames({
      'notification': true,
      'has-text-centered': true,
      'is-danger': this.props.remainder < 0,
      'is-info': this.props.remainder > 0,
    })}>
      {this._getNotificationMessage(this.props.remainder)}
    </div>
  );

}

const ExpenseTable = ({expenses, onSelect, onDeletePressed}) => (
  <table className="table is-fullwidth is-striped is-hoverable">
    <thead>
    <tr>
      <th>Amount</th>
      <th>Date</th>
      <th>Notes</th>
      <th />
    </tr>
    </thead>
    <tbody>
    {expenses
      .slice()
      .sort((a, b) => moment(b.timestamp).valueOf() - moment(a.timestamp).valueOf())
      .map(expense => (
      <tr key={expense.id} onClick={e => {
        e.preventDefault();
        onSelect(expense);
      }}>
        <td>${Number(expense.amount / 100).toFixed(2)}</td>
        <td>{moment(expense.timestamp).format("lll")}</td>
        <td>{expense.notes}</td>
        <td>
          <button className="delete"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDeletePressed(expense);
                  }} />
        </td>
      </tr>
    ))}
    </tbody>
  </table>
);


class BudgetPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,

      budgets: null,
      expenses: null,

      expenseBeingDeleted: null,
      expenseBeingEdited: null,
    };

  }

  componentDidMount = () => {
    this._loadInitialData();
  };

  _loadInitialData = async () => {
    try {
      const [budgets, expenses] = await Promise.all([this._loadBudgets(), this._loadExpenses()]);
      this.setState({
        loading: false,
        budgets,
        expenses
      });
    } catch (response) {
      this.setState({
        loading: false,
        error: response.message,
      });
    }
  };

  _loadBudgets = async () => {
    const response = await fetch("/api/budgets", {
      credentials: 'same-origin',
    });
    return (await response.json()).data;
  };

  _loadExpenses = async () => {
    const response = await fetch("/api/expenses", {
      credentials: 'same-origin',
    });
    return (await response.json()).data;
  };

  _handleDeletePressed = (expense) => {
    this.setState({
      expenseBeingDeleted: expense,
    });
  };

  _handleDeleteConfirmed = (deletedExpense) => {
    this.setState(({expenses}) => ({
      expenses: expenses.filter(expense => expense.id !== deletedExpense.id),
      expenseBeingDeleted: null,
    }));
  };

  _handleDeleteCanceled = () => {
    this.setState({
      expenseBeingDeleted: null,
    });
  };

  _handleEditPressed = (expense) => {
    this.setState({
      expenseBeingEdited: expense
    });
  };

  _handleExpenseAdded = (addedExpense) => {
    this.setState(({expenses}) => ({
      expenses: [...expenses, addedExpense]
    }));
  };

  _handleEditedConfirmed = (editedExpense) => {
    this.setState(({expenses}) => ({
      expenses: [editedExpense, ...expenses.filter(expense => expense.id !== editedExpense.id)],
      expenseBeingEdited: null,
    }));
  };

  _handleEditCanceled = () => {
    this.setState({
      expenseBeingEdited: null,
    });
  };

  _getAmountAllowed = (budgets) => {
    return budgets
      .map(budget => {
        const end = moment(budget.end_timestamp).isValid() ? moment(budget.end_timestamp) : moment().tz('America/Los_Angeles');
        const start = moment(budget.start_timestamp);
        return budget.amount * end.diff(start, 'days');
      })
      .reduce(((a, b) => a + b), 0);
  };

  _getAmountSpent = (expenses) => {
    return expenses.map(expense => expense.amount).reduce(((a, b) => a + b), 0);
  };

  render = () => {
    if (this.state.loading) {
      return <div/>;
    }

    const amountAllowed = this._getAmountAllowed(this.state.budgets);
    const totalSpent = this._getAmountSpent(this.state.expenses);
    const budgetRemaining = amountAllowed - totalSpent;

    return (
      <Page title="Budget">
        <Navigation/>
        <div className="container section">
          <h1 className="title has-text-centered">Budget</h1>
          {this.state.expenseBeingDeleted && <ExpenseDeleter expense={this.state.expenseBeingDeleted}
                                                             onDeleteConfirmed={this._handleDeleteConfirmed}
                                                             onDeleteCanceled={this._handleDeleteCanceled}/>
          }
          {this.state.expenseBeingEdited && <ExpenseEditor expense={this.state.expenseBeingEdited}
                                                           onEditConfirmed={this._handleEditedConfirmed}
                                                           onEditCanceled={this._handleEditCanceled}/>}
          <NotificationBanner remainder={budgetRemaining}/>
          <ExpenseForm onSave={this._handleExpenseAdded}/>
          <ExpenseTable expenses={this.state.expenses}
                        onSelect={this._handleEditPressed}
                        onDeletePressed={this._handleDeletePressed}/>
        </div>
      </Page>
    );
  };
}

export {
  BudgetPage,
};
