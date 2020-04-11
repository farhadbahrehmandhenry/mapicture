import React, {Component} from 'react';
import './Setting.css';

class Setting extends Component {
  constructor() {
    super();

    this.state = {
      option: '',
      page: 'setting'
    }
  }

  startSlide = () => {
    if (this.state.option) this.props.onPageChange('map');
  }

  ChangePage = (page) => {
    this.setState({page})
  }

  changeOption = (event) => {
    this.props.optionChange(event.target.value);
    this.setState({option: event.target.value});
  }

  render() {
    return (
      <div className="setting">
        <div className="setting-container">
          <select onChange={(event) => this.changeOption(event)}>
            <option>Select an Item</option>
            <option>Cars</option>
          </select>
          <button className="setting-button" onClick={() => this.startSlide()}>Start</button>
        </div>
      </div>
    );
  }
}

export default Setting;