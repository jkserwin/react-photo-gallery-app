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
      ducks: [],
      spaghetti: [],
      australia: [],
      loading: true,
      query: ''
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query, list) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&media=photos&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          list: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      });
  }
  

  render() {

    this.performSearch('ducks', this.state.ducks);
    this.performSearch('spaghetti', this.state.spaghetti);
    this.performSearch('australia', this.state.australia);

    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch(this.state.query, this.state.photos)}/>
          <Nav />

          <Routes>
            <Route exact path="/" element={ <Navigate to={"/ducks"}/> }/>
            <Route path="/ducks" element={ <PhotoContainer data={this.state.ducks} loading={this.state.loading} title='Photo Results for: Ducks'/> }/>
            <Route path="/spaghetti" element={ <PhotoContainer data={this.state.spaghetti} loading={this.state.loading} /> }/>
            <Route path="/australia" element={ <PhotoContainer data={this.state.australia} loading={this.state.loading} /> }/>
            <Route element={<ErrorPage/>}/>
          </Routes>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
