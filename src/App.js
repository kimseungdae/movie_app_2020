import React from 'react';
import axios from 'axios';
import Movie from "./component/Movie";
import './App.css';

class App extends React.Component{
  state = {
    count: 0,
    isLoading: true,
    movies: []
  };
getMovies = async () => {
  const {data:{data:{movies}}} = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating")
  console.log(movies);
  this.setState({movies, isLoading: false})
}

  componentDidMount(){
    this.getMovies();
  }

add = () => {
  this.setState({count:+1})
}

minus = () => {
  this.setState({count:-1})
}

  render(){
    const{ isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
                />
            ))}
          </div>
        )}
        </section>
      );
    }
}

export default App;
