import React, { useState, useEffect } from "react";
import { Card, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./app.css";
import axios from "axios";
import { Link } from "react-router-dom";
import HorizontalScroll from "react-scroll-horizontal";

const Populars = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=7f0af2498de1ab41267418410fdbbfb7&language=tr"
      )
      .then(function (response) {
        //console.log(response.data);
        setPopularMovies(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
      axios
      .get(
        "https://api.themoviedb.org/3/trending/tv/day?api_key=7f0af2498de1ab41267418410fdbbfb7&language=tr"
      )
      .then(function (response) {
        //console.log(response.data);
        setPopularTV(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  return (
    <div className="main">
      <h2>Popüler Filmler</h2>
      <div className="Populars-Scroll">
      <HorizontalScroll reverseScroll={true} pageLock={false}>
          <div className="Populars">
            {popularMovies.map((popular) => {
              return (
                <Link to={"/movie/"+popular.id}>
                <div className="movie" key={popular.id}>
                  <Card.Group>
                    <Card>
                      <Image
                        src={
                          "https://image.tmdb.org/t/p/w220_and_h330_face" +
                          popular.poster_path
                        }
                      />
                      <Card.Content>
                        <div className="movie-card-header">{popular.title}</div>
                      </Card.Content>
                    </Card>
                  </Card.Group>
                </div>
                </Link>
              );
            })}
          </div>
          </HorizontalScroll>
          </div>
          <h2>Popüler Diziler</h2>
          <div className="Populars-Scroll">
      <HorizontalScroll reverseScroll={true} pageLock={false}>
          <div className="Populars">
            {popularTV.map((popular) => {
              return (
                <Link to={"/tv/"+popular.id}>
                <div className="movie" key={popular.id}>
                  <Card.Group>
                    <Card>
                      <Image
                        src={
                          "https://image.tmdb.org/t/p/w220_and_h330_face" +
                          popular.poster_path
                        }
                      />
                      <Card.Content>
                        <div className="movie-card-header">{popular.name}</div>
                      </Card.Content>
                    </Card>
                  </Card.Group>
                </div>
                </Link>
              );
            })}
          </div>
        </HorizontalScroll>
        </div>
    </div>
  );
};

export default Populars;
