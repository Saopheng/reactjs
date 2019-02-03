import React, { Component } from 'react'

class Test extends Component {
  state = {
    title: '',
    body: ''
  };

  componentDidMount() {
    console.log('componentDidMount...');
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => this.setState({
        title: data.title,
        body: data.body
      }));
  }

  // componentEillMount() {
  //   console.log('componentWillMount...');
  // }

  // componentDidUpdate() {
  //   console.log('componentDidUpdate...');
  // }

  // componentWillReceiveProps(newxtProps, nextState) {
  //   console.log('componentWillReceiveProps...');
  // }

  // static getDerivedStateFromProps(newxtProps, prevState) {
  //   console.log('getDerivedStateFromProps...');
  //   this.setState();
  //   // return null;
    
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log('getSnapshotBeforeUpdate...');
  // }

  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    )
  }
}

export default Test;