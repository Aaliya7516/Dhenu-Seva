import React, { Component } from 'react';

import FeedbackAlert from '../util/FeedbackAlert';
import FeedbackModal from '../util/FeedbackModal';
import Footer from '../Footer/Footer';
import {
  validateEmptyFields,
  validateInput,
  validateForm,
} from '../util/Validation.js';

import './Login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isRememberMeSelected: false,
    isOpen: false,
    errors: {
      email: '',
      password: '',
    },
  };

  componentDidMount() {
    document.title = 'Dhenu-Seva Login';
  }

  handleChange = (e) => {
    e.preventDefault();
    const target = e.target;
    let { name, value } = e.target;
    value = target.type === 'checkbox' ? target.checked : target.value;
    let errors = this.state.errors;
    errors = validateInput(name, value, errors);
    this.setState({ errors, [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.state.errors;
    errors = validateEmptyFields(this.state, errors);
    this.setState({ errors });
    this.setState({ isOpen: true });
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  FormSubmissionModal = () => {
    if (validateForm(this.state.errors)) {
      return (
        <FeedbackModal isOpen={this.state.isOpen} onClose={this.toggleModal}>
          Form submitted successfully!
        </FeedbackModal>
      );
    } else {
      return (
        <FeedbackModal isOpen={this.state.isOpen} onClose={this.toggleModal}>
          Error in form submission
        </FeedbackModal>
      );
    }
  };

  render() {
    return (
      <div className='authentication-bg'>
        <div className='bg-gradient-primary'>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-md-9 col-lg-12 col-xl-10'>
                <div className='card shadow-lg o-hidden border-0 my-5'>
                  <div className='card-body p-0'>
                    <div className='row'>
                      <div className='col-lg-12'>
                        <div className='p-5'>
                          <h2 className='text-dark mb-4'>Login!</h2>
                          <div className='text-center'>
                            <h4 className='text-dark mb-4'>Welcome Back!</h4>
                          </div>
                          <this.FormSubmissionModal />
                          <form className='user'>
                            <div className='form-group'>
                              <input
                                className='form-control form-control-user'
                                type='email'
                                id='exampleInputEmail'
                                aria-describedby='emailHelp'
                                placeholder='Enter Email Address...'
                                name='email'
                                onChange={(e) => this.handleChange(e)}
                                required
                              />
                              {this.state.errors.email && (
                                <FeedbackAlert
                                  variant='warning'
                                  message={this.state.errors.email}
                                />
                              )}
                            </div>
                            <div className='form-group'>
                              <input
                                className='form-control form-control-user'
                                type='password'
                                id='exampleInputPassword'
                                placeholder='Password'
                                name='password'
                                onChange={(e) => this.handleChange(e)}
                                required
                              />
                              {this.state.errors.password && (
                                <FeedbackAlert
                                  variant='warning'
                                  message={this.state.errors.password}
                                />
                              )}
                            </div>
                            <div className='form-group'>
                              <div className='custom-control custom-checkbox small'>
                                <div className='form-check'>
                                  <input
                                    className='form-check-input custom-control-input'
                                    type='checkbox'
                                    id='formCheck-1'
                                    name='isRememberMeSelected'
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                  <label
                                    className='form-check-label custom-control-label'
                                    htmlFor='formCheck-1'
                                  >
                                    Remember Me
                                  </label>
                                </div>
                              </div>
                            </div>
                            <button
                              className='btn btn-primary btn-block text-white btn-user'
                              type='submit'
                              onClick={this.handleSubmit}
                            >
                              Login
                            </button>
                            <hr />
                            <a
                              className='btn btn-primary btn-block text-white btn-google btn-user'
                              role='button'
                              href='/#'
                            >
                              <i className='fab fa-google'></i>&nbsp; Login with
                              Google
                            </a>
                            <a
                              className='btn btn-primary btn-block text-white btn-facebook btn-user'
                              role='button'
                              href='/#'
                            >
                              <i className='fab fa-facebook-f'></i>&nbsp; Login
                              with Facebook
                            </a>
                            <hr />
                          </form>
                          <div className='text-center'>
                            <a className='small' href='/#'>
                              Forgot Password?
                            </a>
                          </div>
                          <div className='text-center'>
                            <a className='small' href='/register'>
                              Create an Account!
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
