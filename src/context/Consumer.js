import React, { Component } from 'react';
import { Context } from './';

class Consumer extends Component {
  render() {
    const { children } = this.props;

    return (
      <Context.Consumer>
        {(props) => React.Children.map(children, (child) => React.cloneElement(child, { ...props }))}
      </Context.Consumer>
    );
  }
}

export { Consumer };
