import React, { useState, useEffect } from "react";
import "../components/app.css";
import { Card, Image } from "semantic-ui-react";
import axios from "axios";
import nullProfile from "../img/empty.png";
import nullMovie from "../img/empty1.png";
import { Link, useParams } from "react-router-dom";
import HorizontalScroll from "react-scroll-horizontal";

const App = () => {
  const params = useParams();
  const [detail, setDetail] = useState([]);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${params.id}?api_key=7f0af2498de1ab41267418410fdbbfb7&language=tr`
      )
      .then(function (response) {
        //console.log(response.data);
        setDetail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
    axios
      .get(
        `https://api.themoviedb.org/3/person/${params.id}/movie_credits?api_key=7f0af2498de1ab41267418410fdbbfb7&language=tr`
      )
      .then(function (response) {
        //console.log(response.data.cast);
        setJobs(response.data.cast);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  }, []);
  return (
    <div className="Container">
      <div className="Person">
        <div className="Person-Left">
          <div className="Person-Photo">
            <Image
              className="Movie-Poster"
              src={
                "https://image.tmdb.org/t/p/w300_and_h450_bestv2" +
                detail.profile_path
              }
              onError={(i) => (i.target.src = nullProfile)}
            />
            <h2>Kişisel Bilgi</h2>

            <h3>Bilinen İşi</h3>
            <p>{detail.known_for_department}</p>
            <h3>Doğum Günü</h3>
            <p>{detail.birthday}</p>
            <h3>Doğum Yeri</h3>
            <p>{detail.place_of_birth}</p>
          </div>
        </div>
        <div className="Person-Right">
          <div className="Person-Right-Header">
            <h1>{detail.name}</h1>
            <p>{detail.biography}</p>
          </div>
          <h2>Bilinen İşi</h2>
          <div className="Job-Scroll">
            <HorizontalScroll reverseScroll={true} pageLock={false}>
              {jobs?.map((job) => {
                return (
                  <Link to={"/movie/" + job.id}>
                    <div className="movie" key={job.id}>
                      <Card.Group>
                        <Card>
                          <Image
                            src={
                              "https://image.tmdb.org/t/p/w220_and_h330_face" +
                              job.poster_path
                            }
                            onError={(i) => (i.target.src = nullMovie)}
                          />
                          <Card.Content>
                            <div className="movie-card-header">
                              {job.title} <br /> {job.character}
                            </div>
                          </Card.Content>
                        </Card>
                      </Card.Group>
                    </div>
                  </Link>
                );
              })}
            </HorizontalScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
