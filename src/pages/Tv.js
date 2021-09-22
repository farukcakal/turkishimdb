import React, { useState, useEffect } from "react";
import "../components/app.css";
import { Card, Image, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import nullMovie from "../img/empty1.png";
import HorizontalScroll from "react-scroll-horizontal";
import Comments from "../components/Comments";
import Youtube from "react-lazyload-youtube";
import "react-lazyload-youtube/dist/index.css";

const Tv = () => {
  const params = useParams();
  const [detail, setDetail] = useState([]);
  const [credits, setCredits] = useState([]);
  const [videos, setVideos] = useState([]);
  const [similars, setSimilar] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${params.id}?api_key=7f0af2498de1ab41267418410fdbbfb7&language=tr`
      )
      .then(function (response) {
        console.log(response.data);
        setDetail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${params.id}/credits?api_key=7f0af2498de1ab41267418410fdbbfb7&language=tr`
      )
      .then(function (response) {
        //console.log(response.data);
        setCredits(response.data.cast);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${params.id}/videos?api_key=7f0af2498de1ab41267418410fdbbfb7&language=tr,en-US`
      )
      .then(function (response) {
        //console.log(response.data.results);
        setVideos(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
    axios
      .get(
        `
      https://api.themoviedb.org/3/tv/${params.id}/similar?api_key=7f0af2498de1ab41267418410fdbbfb7&language=tr&page=1`
      )
      .then(function (response) {
        console.log(response.data.results);
        setSimilar(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  }, [params]);
  return (
    <div className="Pages">
      <div className="Movie-Detail">
        <div
          className="Movie-Header"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`,
            backgroundSize: "cover",
          }}
        >
          <div className="Movie-Header-Container">
            <div className="Container">
              <div className="Movie-Header-Detail">
                <Image
                  className="Movie-Poster"
                  src={"https://image.tmdb.org/t/p/w342" + detail.poster_path}
                  onError={(i) => (i.target.src = nullMovie)}
                />
                <div className="Movie-More-Detail">
                  <h1>{detail.name}</h1>
                  <p>
                    {detail.first_air_date} -{" "}
                    {detail.genres?.map((x) => x.name).join(", ")} -{" "}
                    {detail.number_of_episodes} Bölüm
                  </p>
                  <p style={{ fontStyle: "italic", opacity: "0.7" }}>
                    {detail.tagline}
                  </p>
                  <h2>Özet</h2>
                  <p>{detail.overview}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="Container">
            <div className="Movie-Credits">
              <div className="main">
                <h2>Oyuncular</h2>
                <div className="Credits-Scroll">
                  {credits.length > 4 ? (
                    <HorizontalScroll reverseScroll={true} pageLock={false}>
                      {credits.map((credit) => {
                        return (
                          <Link to={"/person/" + credit.id}>
                            <div className="Horizontal-Scroll" key={credit.id}>
                              <Card.Group>
                                <Card>
                                  <Image
                                    src={
                                      "https://image.tmdb.org/t/p/original" +
                                      credit.profile_path
                                    }
                                    onError={(i) => (i.target.src = nullMovie)}
                                  />
                                  <Card.Content>
                                    <div className="movie-card-header">
                                      {credit.name} <br /> {credit.character}
                                    </div>
                                  </Card.Content>
                                </Card>
                              </Card.Group>
                            </div>
                          </Link>
                        );
                      })}
                    </HorizontalScroll>
                  ) : (
                    <Grid>
                      {credits.map((credit) => {
                        return (
                          <Link to={"/person/" + credit.id}>
                            <div className="Horizontal-Scroll" key={credit.id}>
                              <Card.Group>
                                <Card>
                                  <Image
                                    src={
                                      "https://image.tmdb.org/t/p/original" +
                                      credit.profile_path
                                    }
                                    onError={(i) => (i.target.src = nullMovie)}
                                  />
                                  <Card.Content>
                                    <div className="movie-card-header">
                                      {credit.name} <br /> {credit.character}
                                    </div>
                                  </Card.Content>
                                </Card>
                              </Card.Group>
                            </div>
                          </Link>
                        );
                      })}
                    </Grid>
                  )}
                </div>
                <h2>Sezonlar</h2>
                <div className="Seasons">
                  {detail?.seasons?.map((season) => {
                    return (
                      <div className="Season-Poster">
                        <Card>
                          <Image
                            src={
                              "https://image.tmdb.org/t/p/original" +
                              season.poster_path
                            }
                            onError={(i) => (i.target.src = nullMovie)}
                          />
                        </Card>
                        <div className="Season-Detail">
                          <h3>{season.name}</h3>
                          <p></p>
                          {season.air_date}
                          <p></p>
                          {season.episode_count} Bölüm
                        </div>
                        <div className="Season-Overview">{season.overview}</div>
                      </div>
                    );
                  })}
                </div>
                <h2>Videolar</h2>
                <Grid columns="equal">
                  {videos.map((video) => {
                    return (
                      <div className="Movie-Video">
                        <Youtube
                          width="640px"
                          height="480px"
                          videoId={video.key}
                          imgSize="maxresdefault"
                        />
                      </div>
                    );
                  })}
                </Grid>
                <Comments/>
                <h2>Tavsiyeler</h2>
                <div className="Populars-Scroll">
                  <HorizontalScroll reverseScroll={true} pageLock={false}>
                    {similars.map((similar) => {
                      return (
                        <Link to={"/tv/" + similar.id}>
                          <div className="movie" key={similar.id}>
                            <Card.Group>
                              <Card>
                                <Image
                                  src={
                                    "https://image.tmdb.org/t/p/w220_and_h330_face" +
                                    similar.poster_path
                                  }
                                  onError={(i) => (i.target.src = nullMovie)}
                                />
                                <Card.Content>
                                  <div className="movie-card-header">
                                    {similar.name}
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
        </div>
      </div>
    </div>
  );
};

export default Tv;
