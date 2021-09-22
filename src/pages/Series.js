import React, { useState, useEffect } from "react";
import "../components/app.css";
import { Card, Image, Grid, Pagination } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import nullTV from "../img/empty1.png";
import { Link } from "react-router-dom";

const Movie = () => {
  const [tv, setTV] = useState([]);
  const [pagination, setPagination] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/tv?api_key=7f0af2498de1ab41267418410fdbbfb7&language=tr&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate"
      )
      .then(function (response) {
        //console.log(response.data);
        setTV(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/tv?api_key=7f0af2498de1ab41267418410fdbbfb7&language=tr&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate"
      )
      .then(function (response) {
        //console.log(response.data);
        setPagination(response.data);
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
    <div className="Pages">
      <div className="Container">
        <div className="Movies">
          <Grid columns="equal">
            {tv.map((tv) => {
              return (
                <Link to={"/tv/"+tv.id}>
                <div className="movie" key={tv.id}>
                  <Card.Group>
                    <Card>
                      <Image
                        src={
                          "https://image.tmdb.org/t/p/w220_and_h330_face" +
                          tv.poster_path
                        }
                        onError={i => i.target.src=nullTV} 
                      />
                      <Card.Content>
                        <div className="movie-card-header">{tv.name}</div>
                      </Card.Content>
                    </Card>
                  </Card.Group>
                </div>
                </Link>
              );
            })}
          </Grid>
        </div>
        <div className="pagination">
          <Pagination defaultActivePage={1} totalPages={pagination.total_pages} />
        </div>
      </div>
    </div>
  );
};

export default Movie;
