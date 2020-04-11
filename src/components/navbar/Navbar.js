import React, {Component} from 'react';
import anime from 'animejs/lib/anime.es.js';
import _ from 'lodash';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  onItemClick = (event) => {
    if (event.target.innerHTML === 'Register' || event.target.innerHTML === 'Sign In') {
      var container1 = document.querySelector('.signin-container');
      var container2 = document.querySelector('.signup-container');
      var signin = document.querySelector('.signin');
      
      setTimeout(() => {
        container1.classList.toggle('hidden');
        container2.classList.toggle('hidden');
      }, 490)
    }

    if (event.target.innerHTML === 'Register') {
      this.props.onNavbarItemClick('Sign In');

      anime({
        targets: '.signin-signup-animation',
        translateX: signin.clientWidth,
        easing: 'easeInOutExpo'
      });
    }
    else if (event.target.innerHTML === 'Sign In') {
      this.props.onNavbarItemClick('Register');

      anime({
        targets: '.signin-signup-animation',
        translateX: 0,
        easing: 'easeInOutExpo'
      });
    }
    else if (event.target.innerHTML === 'Sign Out') {
      this.props.loadUser({user: {}})
      this.props.onNavbarItemClick('Sign In - Register');
    }
    else if (event.target.innerHTML === 'Back to Map') {
      this.props.onNavbarItemClick('Map');
    }
    else if (event.target.innerHTML === 'Back to Menu') {
      this.props.onNavbarItemClick('setting');
    }
    else if (event.target.innerHTML === 'Back to Gallery') {
      this.props.onNavbarItemClick('gallery');
    }
  }

  render() {
    var {items, user} = this.props;
    var title = user.name ? `Hello ${_.startCase(this.props.user.name)}` : '';
    
    return (
      <div className="navbar">
        <ul className="navbar-items" >
          {_.map(items, (item, index) => {
            return (
              <li className="navbar-item" key={index}>
                <button 
                  className="navbar-button" 
                  onClick={(event) => this.onItemClick(event)}
                >{item}
                </button>
              </li>
            )
          })}
          <li className="nav-user">{title}</li>
        </ul>
      </div>
    );
  }
}

export default Navbar;