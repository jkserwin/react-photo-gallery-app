import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Navigate,
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
      loading: true,
      query: ''
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&media=photos&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          loading: false
        })
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
            <Route exact path="/" element={ <Navigate to={"/ducks"}/> }/>
            <Route path="/ducks" element={ <PhotoContainer query='ducks' performSearch={this.performSearch} data={this.state.photos} loading={this.state.loading} title='Photo Results for: Ducks'/> }/>
            <Route path="/spaghetti" element={ <PhotoContainer query='spaghetti' performSearch={this.performSearch} data={this.state.photos} loading={this.state.loading} /> }/>
            <Route path="/australia" element={ <PhotoContainer query='australia' performSearch={this.performSearch} data={this.state.photos} loading={this.state.loading} /> }/>
            <Route element={<ErrorPage/>}/>
          </Routes>


          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
