import React, {Component} from 'react';
import Signin from '../components/signin/Signin.js';
import Setting from '../components/setting/Setting.js';
import Navbar from '../components/navbar/Navbar.js';
import Slide from '../components/slide/Slide';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      page: 'signin',
      items: ['Register'],
      option: '',
      photos: [],
      countryCode: '',
      user: {}
    }
  }

  ChangePage = (page) => {
    var items = [];

    if (page === 'setting') items.push('Sign Out');
    if (page === 'gallery') {
      items.push('Sign Out');
      items.push('Back to Map');
    }
    if (page === 'map') {
      items.push('Sign Out');
      items.push('Back to Menu');
    }

    this.setState({page, items});
  }

  optionChange = (option) => {
    this.setState({option});
  }

  onNavbarItemClick = (page) => {
    var items = [];
    var newPage = 'signin';

    if (page === 'Sign In') items.push('Sign In');
    if (page === 'Sign In - Register') items.push('Register');
    if (page === 'Register') {
      newPage = 'register';

      items.push('Register');
    }  
    if (page === 'Map') {
      newPage = 'map';

      items.push('Sign Out');
      items.push('Back to Menu');
    }
    if (page === 'setting') {
      newPage = 'setting';

      items.push('Sign Out');
    }

    this.setState({items, page: newPage});
  }

  loadUser = ({user}) => {
    this.setState({user});
  }

  render() {
    var {page, items, user} = this.state;

    return (
      <div className="App">
        <Navbar items={items} onNavbarItemClick={this.onNavbarItemClick} loadUser={this.loadUser} user={user}/>
        {
          page === 'signin' || page === 'register' ? 
            <Signin onPageChange={this.ChangePage} loadUser={this.loadUser}/> 
          : 
          page === 'setting' ?
            <Setting onPageChange={this.ChangePage} optionChange={this.optionChange} />
          :
          <Slide onPageChange={this.ChangePage} option={this.state.option} page={this.state.page}/>
        }
      </div>
    );
  }
}

export default App;
