import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import axios from 'axios';

// App components
import SearchForm from './SearchForm';
import Nav from './Nav';
import PhotoContainer from './PhotoContainer';
import ErrorPage from './ErrorPage';

// API key

import apiKey from '../config';

class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      ducks: [],
      spaghetti: [],
      australia: [],
      loading: true,
      query: ''
    };
  }

  componentDidMount() {
    this.performSearch();
    this.performSearch('ducks');
    this.performSearch('spaghetti');
    this.performSearch('australia');
  }

  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&media=photos&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        if (query === 'ducks') {
          this.setState({
            ducks: response.data.photos.photo,
            loading: false
          })
        } else if (query === 'spaghetti') {
          this.setState({
            spaghetti: response.data.photos.photo,
            loading: false
          })
        } else if (query === 'australia') {
          this.setState({
            australia: response.data.photos.photo,
            loading: false
          })
        } else {
          this.setState({
            photos: response.data.photos.photo,
            loading: false
          })
        } 
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      });
  }
  

  render() {

    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch}/>
          <Nav />

          <Routes>
            <Route exact path="/" element={ <PhotoContainer data={this.state.photos} performSearch={this.performSearch} query={'ducks'} loading={this.state.loading}/> } />
            <Route path="/ducks" element={ <PhotoContainer data={this.state.ducks} performSearch={this.performSearch} query={'ducks'} loading={this.state.loading} /> }/>
            <Route path="/spaghetti" element={ <PhotoContainer query={'spaghetti'} data={this.state.spaghetti} performSearch={this.performSearch} loading={this.state.loading} /> }/>
            <Route path="/australia" element={ <PhotoContainer query={'australia'} data={this.state.australia} performSearch={this.performSearch} loading={this.state.loading} /> }/>
            <Route element={<ErrorPage/>}/>
          </Routes>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
