import React, { Component } from 'react';
import asyncRoute from '../router/asyncRoute'
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';

export default class Layout extends Component {
  state = {
    tabs: []
  };

  componentDidMount() {
    axios.get('/tabs.json')
        .then(({ data }) => this.setState({ tabs: data }))
        .catch(err => console.log(err));
  }

  render() {
    const { tabs } = this.state;

    return (
        <div>
          <nav>
            {tabs.map(tab => <NavLink key={tab.id} to={`/${tab.id}`}>{tab.title}&nbsp;</NavLink>)}
          </nav>
          <main>
            {
              tabs.length <= 0
              ? null
              : <Route exact path='/' key='1' component={asyncRoute(() => System.import(`../components/${tabs[0].id}`))}/>
            }
            {tabs.map(tab => <Route path={`/${tab.id}`} key={tab.id} component={asyncRoute(() => System.import(`../components/${tab.id}`))}/>)}
          </main>
        </div>
    );
  }
};