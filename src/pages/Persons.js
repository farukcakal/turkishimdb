import React, { useState, useEffect } from "react";
import "../components/app.css";
import { Card, Image, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import nullProfile from "../img/empty.png";
import axios from "axios";
import { Link } from "react-router-dom";

const Persons = (pageNumber) => {
  const [people, setPeople] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/popular?api_key=7f0af2498de1ab41267418410fdbbfb7&language=tr&page=1`
      )
      .then(function (response) {
        //console.log(response.data);
        setPeople(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    //console.log(nullProfile);
  }, []);
  return (
    <div className="Pages">
      <div className="Container">
        <div className="Movies">
          <Grid columns="equal">
            {people.map((people) => {
              return (
                <Link to={"/person/" + people.id}>
                  <div className="movie" key={people.id}>
                    <Card.Group>
                      <Card>
                        <Image
                          src={
                            "https://image.tmdb.org/t/p/w220_and_h330_face" +
                            people.profile_path
                          }
                          onError={(i) => (i.target.src = nullProfile)}
                        />
                        <Card.Content>
                          <div className="movie-card-header">{people.name}</div>
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

export default Persons;
