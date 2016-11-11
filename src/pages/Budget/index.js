import React, { Component } from 'react';

import Body from "../../components/layout/Body";
import Navigation from "../../components/layout/Navigation";
import Page from "../../components/layout/Page";

import './style.css';

class Budget extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      amount: '',
      expenses: []
    }

    fetch('/api/expenses')
    .then((r) => r.json())
    .then((json) => {
      this.setState({expenses: json.data});
    });

  }

  render = () => {
    return (
      <Page>
        <Navigation/>
        <Body>
          <div className="Budget">
            <input type="text"
                   value={this.state.amount}
                   onChange={(e) => this.setState({amount: e.target.value})} />
            <button onClick={this.handleClick}>Submit</button>
            <table>
              {this.state.expenses.map((expense) => {
                return (
                <tr>
                  <td>{expense.timestamp}</td>
                  <td>${expense.amount / 100}</td>
                  <td>{expense.notes}</td>
                </tr>
              );
              })}
            </table>
          </div>
        </Body>
      </Page>
    );
  }

  handleClick = () => {
    var formData = new FormData();

    formData.append('amount', this.state.amount);
    formData.append('notes', 'hi');

    fetch('/api/expenses', {
      method: 'put',
      body: formData
    }).then((r) => {
      window.location.reload();
    })
  }
}

export default Budget;
