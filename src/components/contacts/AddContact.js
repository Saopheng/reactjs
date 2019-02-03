import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import uuid from 'uuid';
import axios from 'axios';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }

  onSubmit = async (dispatch,e) => {
    e.preventDefault();
    // console.log(this.state);

    const { name, email, phone } = this.state;

    // Check for errors
    if(name === '') {
      this.setState({errors: {
        name: 'Name is required'
      }});
      // return to stop setState
      return;
    }

    if(email === '') {
      this.setState({errors: {
        email: 'Email is required'
      }});
      return;
    }

    if(phone === '') {
      this.setState({errors: {
        phone: 'Phone is required'
      }});
      return;
    }

    const newContact = {
      // id: uuid(),
      name,
      email,
      phone
    }

    const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
      // .then(res => dispatch({type: 'ADD_CONTACT', playload: res.data }));

    dispatch({type: 'ADD_CONTACT', payload: res.data });

    // dispatch({ type: 'ADD_CONTACT', payload: newContact });

    // clear state
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    // redirect to home
    this.props.history.push('/');
  }

  onChange = e => this.setState({[e.target.name]: e.target.value});
  // onEmailChange = e => this.setState({email: e.target.value});
  // onPhoneChange = e => this.setState({phone: e.target.value});

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-header">Add Content</div>
              <div className="card-body">
                <form action="" onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup 
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  {/* 
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                    type="text" 
                    name="name"
                    className="form-control form-control-md"
                    placeholder="Enter Name..." 
                    value={name}
                    onChange={this.onChange}
                    />
                  </div> */}
                  <TextInputGroup 
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  {/* <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email" 
                    name="email"
                    className="form-control form-control-md"
                    placeholder="Enter Email..." 
                    value={email}
                    onChange={this.onChange}
                    />
                  </div> */}
                  <TextInputGroup 
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  {/* <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input 
                    type="number" 
                    name="phone"
                    className="form-control form-control-md"
                    placeholder="Enter Phone..." 
                    value={phone}
                    onChange={this.onChange}
                    />
                  </div> */}
                  <input 
                    type="submit" 
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default AddContact
