import React, { Component } from 'react';
import moment from 'moment';

import Body from "../../components/layout/Body";
import Navigation from "../../components/layout/Navigation";
import Page from "../../components/layout/Page";

import './style.css';

class Budget extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      amount: '',
      notes: '',
      expenses: []
    };

    fetch('/api/expenses')
    .then((r) => r.json())
    .then((json) => {
      json.data.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
      this.setState({expenses: json.data});
    });

  }

  render = () => {
    const numDays = moment().diff(moment("20170502", "YYYYMMDD"), 'days');
    const amounts = this.state.expenses.map((expense) => expense.amount);
    let remainder = (5000 * numDays) - amounts.reduce(((a, b) => a + b), 
0);

    return (
      <Page>
        <Navigation/>
        <Body>
          <div className="Budget">
            <input type="text"
                   placeholder="amount"
                   value={this.state.amount}
                   onChange={(e) => this.setState({amount: e.target.value})} />
            <input type="text"
                   placeholder="notes"
                   value={this.state.notes}
                   onChange={(e) => this.setState({notes: e.target.value})} />
            <button onClick={this.handleClick}>Submit</button>
            <div>
              Remaining: ${Number(remainder / 100).toFixed(2)}
            </div>
            <table>
              <tbody>
                {this.state.expenses.map((expense) => {
                  return (
                  <tr key={expense.id}>
                    <td>{expense.timestamp}</td>
                    <td>${Number(expense.amount / 100).toFixed(2)}</td>
                    <td>{expense.notes}</td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Body>
      </Page>
    );
  };

  handleClick = () => {
    const formData = new FormData();

    formData.append('amount', this.state.amount);
    formData.append('notes', this.state.notes);

    fetch('/api/expenses', {
      method: 'put',
      body: formData
    }).then((r) => {
      window.location.reload();
    })
  }
}

export default Budget;
