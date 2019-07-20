import React from 'react';
import { Context } from './';

export const Provider = (props) => (
  <Context.Provider value={props.value}>
    {this.props.children}
  </Context.Provider>
)



