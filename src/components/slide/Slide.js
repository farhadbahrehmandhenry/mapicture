import React, {Component} from 'react';
import Vectormap from '../vectormap/VectorMap';
import Slideshow from '../slideshow/Slideshow';
import './Slide.css'

class Slide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countryCode: ''
    }
  }

  ChangePage = (page) => {
    this.props.onPageChange(page);
  }

  getCountryCode = (countryCode) => {
    this.setState({countryCode});
  }

  render() {
    var mapClassName = this.props.page === 'map' ? "map-select-container z-index-slide" : "map-select-container hidden-slide"
    var slideshowClassName = this.props.page !== 'map' ? "slideshow-container z-index-slide" : "slideshow-container hidden-slide"
    var countryCode = this.props.countryCode || this.state.countryCode;

    return (
      <div className="slide">
        {
          this.props.page === 'map' ? 
            <div className={mapClassName}>
              <Vectormap onPageChange={this.ChangePage} getCountryCode={this.getCountryCode}/>
            </div>
        : 
          <div className={slideshowClassName}>
            <Slideshow 
              onPageChange={this.ChangePage} 
              option={this.props.option} 
              countryCode= {countryCode}
            />
          </div>
        }
      </div>
    );
  }
}

export default Slide;