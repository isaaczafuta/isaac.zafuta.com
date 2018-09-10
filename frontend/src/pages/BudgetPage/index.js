import classNames from "classnames";
import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

import {CurrencyInput} from "../../components/CurrencyInput";
import {Navigation} from "../../components/layout/Navigation";
import {Page} from "../../components/layout/Page";


class ExpenseEditor extends React.Component {
  static propTypes = {
    expense: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      amount: this.props.expense.amount,
      notes: this.props.expense.notes,
      submitting: false,
    }
  }

  saveChanges = () => {
    if (this.state.amount === this.props.expense.amount && this.state.notes === this.props.expense.notes) {
      this.props.onClose(false);
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
        this.props.onClose(true);
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
            <button className="delete" onClick={() => this.props.onClose(false)} />
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
                    onClick={() => this.saveChanges()}>Save changes</button>
            <button className="button"
                    onClick={() => this.props.onClose()}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }

}

class ExpenseDeleter extends React.Component {
  static propTypes = {
    expense: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      submitting: false,
    }
  }

  deleteExpense = () => {
    this.setState({
      submitting: true
    });

    const url = `/api/expense/${this.props.expense.id}`;
    fetch(url, {
      credentials: 'include',
      method: "DELETE",
    }).then((r) => {
      this.props.onClose(true);
    });

  };

  render = () => {
    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Delete Expense</p>
            <button className="delete" onClick={() => this.props.onClose(false)} />
          </header>
          <section className="modal-card-body">
            <p>Are you sure you want to delete <b>{this.props.expense.notes}</b>?</p>
          </section>
          <footer className="modal-card-foot">
            <button className={classNames("button", "is-danger", {"is-loading": this.state.submitting})}
                    onClick={() => this.deleteExpense()}>Delete</button>
            <button className="button"
                    onClick={() => this.props.onClose(false)}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }

}

class ExpenseForm extends React.Component {

  static propTypes = {
    onSave: PropTypes.func.isRequired
  };

  constructor(props, context) {
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

  saveExpense = () => {
    const formData = new FormData();
    formData.append("amount", this.state.amount);
    formData.append("notes", this.state.notes);

    this.setState({
      submitting: true
    });

    fetch("/api/expenses", {
      credentials: 'same-origin',
      method: "put",
      body: formData
    }).then((r) => {
      this.setState({
        amount: null,
        notes: "",
        submitting: false,
      });
      this.props.onSave();
    })
  }

}

class BudgetPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      notificationDismissed: false,
      expenses: [],
      selectedExpense: null,
      deletingExpense: null,
    };

    this.loadExpenses();
  }

  loadExpenses = () => {
    fetch("/api/expenses", {
      credentials: 'same-origin',
    })
      .then((r) => r.json())
      .then((json) => {
        json.data.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
        this.setState({expenses: json.data});
      });
  };

  closeExpenseEditor = (changed) => {
    this.setState({
      selectedExpense: null,
    });

    if (changed) {
      this.clearAndReloadExpenses();
    }
  };

  closeExpenseDeleter = (changed) => {
    this.setState({
      deletingExpense: null,
    });

    if (changed) {
      this.clearAndReloadExpenses();
    }
  };

  clearAndReloadExpenses = () => {
    this.setState({
      expenses: [],
    });
    this.loadExpenses();
  };

  render = () => {
    const numDays = moment().diff(moment("20170502", "YYYYMMDD"), "days");
    const amounts = this.state.expenses.map((expense) => expense.amount);
    const remainder = (8300 * numDays) - amounts.reduce(((a, b) => a + b), 0);

    let notification = null;
    if (this.state.expenses.length > 0 && remainder < 0) {
      notification = (
        <div className="notification is-danger has-text-centered">
          Slow down there buddy! You"re over budget by ${Number(-remainder / 100).toFixed(2)}!
        </div>
      );
    } else if (this.state.expenses.length > 0) {
      notification = (
        <div className="notification has-text-centered">
          You have ${Number(remainder / 100).toFixed(2)} left to spend!
        </div>
      );
    }

    let expenseEditor = null;
    if (this.state.selectedExpense) {
      expenseEditor = (
        <ExpenseEditor expense={this.state.selectedExpense}
                       onClose={(changed) => this.closeExpenseEditor(changed)} />
      );
    }

    let expenseDeleter = null;
    if (this.state.deletingExpense) {
      expenseDeleter = (
        <ExpenseDeleter expense={this.state.deletingExpense}
                        onClose={(changed) => this.closeExpenseDeleter(changed)} />
      );
    }

    return (
      <Page title="Budget">
        <Navigation/>
        <div className="container">
          <h1 className="title has-text-centered">Budget</h1>
          {expenseEditor}
          {expenseDeleter}
          {notification}

          <ExpenseForm onSave={() => this.clearAndReloadExpenses()}/>

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
            {this.state.expenses.map(expense => {
              return (
                <tr key={expense.id} onClick={() => this.setState({selectedExpense: expense})}>
                  <td>${Number(expense.amount / 100).toFixed(2)}</td>
                  <td>{moment(expense.timestamp).format("lll")}</td>
                  <td>{expense.notes}</td>
                  <td>
                    <button className="delete"
                            onClick={(e) => {e.stopPropagation(); this.setState({deletingExpense: expense})}} />
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      </Page>
    );
  };
}

export {
  BudgetPage,
};
