import classNames from 'classnames';
import React, { Component } from 'react';
import moment from 'moment';

import Navigation from "../../components/layout/Navigation";
import Page from "../../components/layout/Page";

class Budget extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      amount: '',
      notes: '',
      submitting: false,
      notificationDismissed: false,
      expenses: [{
        id: 1,
        timestamp: moment.now(),
        amount: 65,
        notes: 'This is some shit',
      },{
        id: 2,
        timestamp: moment.now(),
        amount: 65,
        notes: 'This is some shit',
      }]
    };

    fetch('/api/expenses')
    .then((r) => r.json())
    .then((json) => {
      json.data.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
      this.setState({expenses: json.data});
    });

  }

  render = () => {
    const numDays = moment().diff(moment("20170502", "YYYYMMDD"), 'days');
    const amounts = this.state.expenses.map((expense) => expense.amount);
    const remainder = (6400 * numDays) - amounts.reduce(((a, b) => a + b), 0);

    let notification = null;
    if (remainder < 0 && !this.state.notificationDismissed) {
      notification = (
        <div className="notification is-danger has-text-centered">
          <button className="delete" onClick={e => this.setState({notificationDismissed: true})} />
          Slow down there buddy! You're over budget by ${Number(-remainder / 100).toFixed(2)}!
        </div>
      );
    } else if (!this.state.notificationDismissed) {
      notification = (
        <div className="notification has-text-centered">
          <button className="delete" onClick={e => this.setState({notificationDismissed: true})} />
          You have ${Number(remainder / 100).toFixed(2)} left to spend!
        </div>
      );
    }

    return (
      <Page>
        <Navigation/>
        <div className="container">
          <h1 className="title has-text-centered">Budget</h1>
          {notification}
          <div className="field has-addons has-addons-centered">
            <p className="control">
              <input autoFocus
                     tabIndex="1"
                     className="input"
                     type="text"
                     placeholder="Amount"
                     value={this.state.amount}
                     onChange={(e) => this.setState({amount: e.target.value})} />
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
                      className={classNames('button', 'is-primary', {'is-loading': this.state.submitting})}
                      onClick={this.handleClick}>
                Save
              </button>
            </p>
          </div>

          <table className="table is-striped">
            <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Notes</th>
            </tr>
            </thead>
            <tbody>
            {this.state.expenses.map(expense => {
              return (
                <tr key={expense.id}>
                  <td>${Number(expense.amount / 100).toFixed(2)}</td>
                  <td>{moment(expense.timestamp).format('lll')}</td>
                  <td>{expense.notes}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      </Page>
    );
  };

  handleClick = () => {
    const formData = new FormData();

    formData.append('amount', this.state.amount);
    formData.append('notes', this.state.notes);

    this.setState({
      submitting:true
    });

    fetch('/api/expenses', {
      method: 'put',
      body: formData
    }).then((r) => {
      window.location.reload();
    })
  }
}

export default Budget;
