import React, { Component } from 'react';
import './App.css';

class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <p className="App-intro">{this.state.data}</p>
        <div className="movie-list">
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      </div>
    );
  }
}

function MovieCard(){
  return(
    <div className="Movie-card">
          <a href="https://yts.lt/movie/garlic-gunpowder-2017">
          <figure>
            <img src= {"https://yts.lt/assets/images/movies/garlic_gunpowder_2017/medium-cover.jpg"}
              alt="Garlic & Gunpowder" className="card-img"/>
            <figcaption className="card-hiddeninfo">
            <h4>Garlic & Gunpowder</h4>
            <h4>5.1/10</h4>
            <span class="button-green-download">View Details</span>
            </figcaption>
          </figure>
          </a>
     
        </div>
    )
}

export default App;

