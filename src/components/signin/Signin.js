import React, {Component} from 'react';
import './Signin.css';

class Signin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 'login',
      signinUsername: '',
      signinPassword: '',
      signupName: '',
      signupUsername: '',
      signupPassword: '',
      signupPasswordConfirm: '',
      errorMessage: ''
    }
  }


  register = (event) => {
    event.preventDefault();
    this.setState({errorMessage: ''});

    fetch('https://my-mapicture-api.herokuapp.com/register', { //https://my-mapicture-api.herokuapp.com
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        email: this.state.signupUsername,
        password: this.state.signupPassword,
        name: this.state.signupName,
        confirmPassword: this.state.signupPasswordConfirm,
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser({user});
        this.props.onPageChange('setting');
      }
      else {
        this.setState({errorMessage: 'username or password is wrong'});
      }
    })
    .catch(err => this.setState({errorMessage: err.message}));
  }

  signin = (event) => {
    event.preventDefault();
    this.setState({errorMessage: ''});

    fetch('https://my-mapicture-api.herokuapp.com/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        email: this.state.signinUsername,
        password: this.state.signinPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser({user});
        this.props.onPageChange('setting');
      }
      else {
        this.setState({errorMessage: 'username or password is wrong'});
      }
    })
    .catch(err => this.setState({errorMessage: err.message}));
  }

  render() {
    return (
      <div className="signin-signup">
        <div className="signin-signup-container">
          <div className="signin">
            <form className="signin-container">
              {/* <h5 className="error"> { this.props.error ? this.state.errorMessage : ''} </h5> */}
              <input 
                className="signin-username" 
                type="text" 
                placeholder="Username or Email" 
                onChange={(event) => this.setState({signinUsername: event.target.value})}
              ></input>
              <input 
                className="signin-password" 
                type="password" 
                placeholder="Password" 
                autoComplete="off"
                onChange={(event) => this.setState({signinPassword: event.target.value})}
              ></input>
              <button className="signin-login" onClick={this.signin}>Login</button>
            </form>
          </div>
          <div className="signin-signup-animation"></div>
          <div className="signup">
            <form className="signup-container hidden">
              <input 
                className="signup-name" 
                type="text" 
                placeholder="Name"
                onChange={(event) => this.setState({signupName: event.target.value})}
              ></input>
              <input 
                className="signup-username" 
                type="text" 
                placeholder="Username or Email"
                onChange={(event) => this.setState({signupUsername: event.target.value})}
              ></input>
              <input 
                className="signup-password" 
                type="password" 
                placeholder="Password" 
                autoComplete="off"
                onChange={(event) => this.setState({signupPassword: event.target.value})}
              ></input>
              <input 
                className="signup-password-confirm" 
                type="password" 
                placeholder="Confirm Password" 
                autoComplete="off"
                onChange={(event) => this.setState({signupPasswordConfirm: event.target.value})}
              ></input>
              <button className="signup-login" onClick={this.register}>Register</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;