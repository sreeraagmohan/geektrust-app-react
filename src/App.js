import React, { Component } from 'react';
import {connect} from 'react-redux';
import {initApp} from './actions';
import Container from './components/Container/Container';

class App extends Component {
  componentDidMount() {
      this.props.dispatch(initApp())
  }

  render() {
    return (
      <div className="app-root">
        <Container/>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return{
        state: state
    }
}

export default connect(mapStateToProps)(App);