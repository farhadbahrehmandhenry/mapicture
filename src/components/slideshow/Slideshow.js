import React, {Component} from 'react';
import Unsplash from 'unsplash-js';
import {cars} from '../vectormap/data';
import {getName} from 'country-list';
import _ from 'lodash';
import './Slideshow.css'

class Slideshow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      data: {},
      selectedPhoto: {},
      imageSelected: false
    }
  }

  componentDidMount() {
    const unsplash = new Unsplash({ accessKey: '15SvzNJh3Gasndc_V81hAu5Bg5t6ulABBPMnLgBxcuk' });
    var carList = cars[`${getName(this.props.countryCode)}`];
    var car = carList[Math.ceil(Math.random() * (carList.length - 1))];

    unsplash.search.photos(car, 1, 30, { orientation: "portrait" })
    .then(response => response.json())
    .then(data =>  this.setState({data}))
    .catch(error => console.log(error))
  }

  showImage(id) {
    var fullImageContainer= document.querySelector('.full-image');

    if (!this.state.imageSelected) {
      fullImageContainer.classList.remove('hide-image');
      fullImageContainer.style.zIndex = 100;
    }

    var selectedPhoto = _.find(this.state.data.results, photo => {
      console.log(photo)
      return photo.id === id
    }).urls.regular;

    this.setState({selectedPhoto, imageSelected: true});
  }

  closeImage() {
    var fullImageContainer= document.querySelector('.full-image');

    if (this.state.imageSelected) {
      fullImageContainer.classList.add('hide-image');
      fullImageContainer.style.zIndex = 0;
    }

    this.setState({selectedPhoto: {}, imageSelected: false});
  }

  render() {
    var photos = _.map(this.state.data.results, photo => ({src: photo.urls.full, id: photo.id}));

    return (
      <div className="images-container">
        {_.map(photos, (photo, i) => {
          return (
            <div className="image-container" key={i} id={photo.id} onClick={() => this.showImage(photo.id)}>
              <img src={photo.src} alt="" width='290px' height="290px" ></img>
            </div>
          )
        })}
        <div className="full-image hide-image">
          <button onClick={() => this.closeImage()}>Back to Images</button>
          {this.state.selectedPhoto ? <img src={this.state.selectedPhoto} alt=""></img> : ''}
        </div>
      </div>
    );
  }
}

export default Slideshow;