import React, {Component} from 'react';
import {VectorMap} from 'react-jvectormap';
import {getCode, getName} from 'country-list';
import anime from 'animejs/lib/anime.es.js';
import {cars} from './data';
import _ from 'lodash';
import './VectorMap.css';

class Vectormap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: {},
      option: '', 
      countryCode: '',
      selectOptions: []
    }
  }

  componentDidMount() {
    var countries = {};

    _.forEach(cars, (carNames, country) => countries[`${getCode(country)}`] = 1);

    this.setState({countries});
  }

  changeOption = (event) => {
    this.setState({option: event.target.value});
  }

  showGallery = () => {
    var selectItems = document.getElementsByClassName('select-input');
    var selectedItem = _.find(selectItems, item => item.checked);

    if (selectedItem) {
      this.props.onPageChange('gallery');
    }
  }

  handleClick = (e, countryCode) => {
    var lables = document.getElementsByClassName('jvectormap-tip');
    var selectContainer = document.querySelector('.select');

    _.forEach(lables, lable => lable.style.display = 'none');

    this.props.getCountryCode(countryCode);

    var carList = cars[`${getName(countryCode)}`];

    if (window.innerWidth > 760) {
      if (carList && carList.length > 0) {
        anime({
          targets: '.vectormap',
          translateX: selectContainer.clientWidth,
          easing: 'easeInOutExpo'
        });
      }
      else {
        anime({
          targets: '.vectormap',
          translateX: 0,
          easing: 'easeInOutExpo'
        });
      }
    }
    else {
      if (carList && carList.length > 0) {
        anime({
          targets: '.vectormap',
          translateY: 0,
          easing: 'easeInOutExpo'
        });
      }
      else {
        anime({
          targets: '.vectormap',
          translateY: selectContainer.clientHeight,
          easing: 'easeInOutExpo'
        });
      }
    }

    this.setState({selectOptions: carList})
    this.setState({countryCode});
  };
  
  render() {
    var {selectOptions} = this.state;

    return (
      <div className="map-select">
        <div className="select-container">
          <div className ="select">
            {_.map(selectOptions, (option, i) => (
              <div className="pretty p-icon p-curve p-jelly" key={i}>
                <input className="select-input" type="radio" id="car" name="car" value={option}/>
                <div className="state p-warning">
                  <i className="icon mdi mdi-check"></i>
                  <label>{option}</label>
                </div>
              </div>
            ))}
            {(selectOptions && selectOptions.length > 0) ? 
              <button className="select-button-" onClick={this.showGallery}>Show Pictures</button>
             : ''
            }
          </div>
        </div>
        <div className="vectormap">
          <VectorMap
            map="world_mill"
            backgroundColor="transparent"
            zoomOnScroll={true}
            onRegionClick={this.handleClick}
            containerClassName="map"
            regionStyle={{
              initial: {
                fill: "#996000",
                "fill-opacity": 0.9,
                stroke: "black",
                "stroke-width": 0,
                "stroke-opacity": 0
              },
              hover: {"fill-opacity": 1, cursor: "pointer", fill: "#ab7003"},
              selected: {fill: "#2520bc"},
              selectedHover: {}
            }}
            regionsSelectable={true}
            series={{
              regions: [{
                values: this.state.countries,
                scale: ["#ff6a00", "#146804"],
                normalizeFunction: "polynomial"
              }]
            }}
          />
        </div>
      </div>
    );
  }
}

export default Vectormap;