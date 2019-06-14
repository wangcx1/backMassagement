import React from 'react';
// import './App.css';
// import 'antd/dist/antd.css'

export default class App extends React.Component{
  render(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
};
