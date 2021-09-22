import React, { useState, useEffect } from "react";
import "../components/app.css";
import { Card, Image, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import nullMovie from "../img/empty1.png";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasMore, setHasMore]     = React.useState(true);
  const [pages, setPages]         = React.useState(1);
  useEffect(() => {
    getMovies(pages);
    setPages((pages) => pages + 1);
  }, []);
  const getMovies = async (page) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1));

    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=7f0af2498de1ab41267418410fdbbfb7&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&language=tr"
      )
      .then(function (response) {
        console.log(response.data);
        setMovies(response.data.results);
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  return (
    <div className="Pages">
      <div className="Container">
        <div className="Movies">
          <Grid columns="equal">
              {movies.map((movie) => {
                return (
                  <Link to={"/movie/" + movie.id}>
                    <div className="movie" key={movie.id}>
                      <Card.Group>
                        <Card>
                          <Image
                            src={
                              "https://image.tmdb.org/t/p/w220_and_h330_face" +
                              movie.poster_path
                            }
                            onError={(i) => (i.target.src = nullMovie)}
                          />
                          <Card.Content>
                            <div className="movie-card-header">
                              {movie.title}
                            </div>
                          </Card.Content>
                        </Card>
                      </Card.Group>
                    </div>
                  </Link>
                );
              })}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default App;
