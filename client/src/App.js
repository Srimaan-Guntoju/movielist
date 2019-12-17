import './App.css';
import React from 'react'


class App extends React.Component{
  constructor(props){
    super(props)
    this.state={moviedata:null}
  }

  componentDidMount() {
      console.log('alpha')
        // Call our fetch function below once the component mounts
      this.callBackendAPI()
        .then(res => {
          this.setState({ moviedata: res.data})
        })
        .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('https://yts.lt/api/v2/list_movies.json?limit=20&with_rt_ratings=true&sort_by=date_added');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    const moviedata=this.state.moviedata;
    if(!moviedata) {return null;}
    console.log(moviedata.limit)
    return (
      <div className="App">
         <h1>Movie List</h1>
        <MovieList list={moviedata.movies}/>
      </div>
    );
  }
}

function MovieList(props){
  console.log(props.list)
  return (
    <div className="movie-list">  
      {
        props.list.map(item=>
          <MovieCard details={item}/>)
      } 
        
        </div>
    )
}

function MovieCard(props){
  console.log(props.details)
  const movie=props.details
  return(
    <div className="Movie-card">
          <a href={movie.url}>
          <figure>
            <img src= {movie.medium_cover_image}
              alt={movie.title_long} className="card-img"/>
            <figcaption className="card-hiddeninfo">
            <p>{movie.title}</p>
            <p>{movie.year}</p>
            <p>{movie.rating}/10</p>
            <span class="button-green-download">View Details</span>
            </figcaption>
          </figure>
          </a>
     
        </div>
    )
}

export default App;