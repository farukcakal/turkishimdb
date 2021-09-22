import React, { useState, useEffect } from "react";
import "../components/app.css";
import Comments from "../components/Comments";
import { Card, Image, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import nullMovie from "../img/empty1.png";
import NumberFormat from "react-number-format";
import HorizontalScroll from "react-scroll-horizontal";
import Youtube from "react-lazyload-youtube";
import "react-lazyload-youtube/dist/index.css";

const Movie = () => {
  const params = useParams();

  const [detail, setDetail] = useState([]);
  const [credits, setCredits] = useState([]);
  const [videos, setVideos] = useState([]);
  const [similars, setSimilar] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=7f0af2498de1ab41267418410fdbbfb7&language=tr`
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
        `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=7f0af2498de1ab41267418410fdbbfb7&language=tr`
      )
      .then(function (response) {
        //console.log(response.data.cast);
        setCredits(response.data.cast);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=7f0af2498de1ab41267418410fdbbfb7`
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
      https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=7f0af2498de1ab41267418410fdbbfb7&language=tr&page=1`
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
            backgroundPosition: "center center",
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
                  <h1>{detail.title}</h1>
                  <p>
                    {detail.release_date} -{" "}
                    {detail.genres?.map((x) => x.name).join(", ")} -{" "}
                    {detail.runtime} dakika
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
                <Comments />
                <h2>Tavsiyeler</h2>
                <div className="Populars-Scroll">
                  <HorizontalScroll reverseScroll={true} pageLock={false}>
                    {similars.map((similar) => {
                      return (
                        <Link to={"/movie/" + similar.id}>
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
                                    {similar.title}
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
              <div className="sub">
                <h3>Orjinal İsmi</h3>
                <p style={{ fontSize: "16px", fontFamily: "arial" }}>
                  {detail.original_title}
                </p>
                <h3>Bütçe</h3>
                <p style={{ fontSize: "16px", fontFamily: "arial" }}>
                  <NumberFormat
                    value={detail.budget}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$ "}
                  />
                </p>
                <h3>Gelir</h3>
                <p style={{ fontSize: "16px", fontFamily: "arial" }}>
                  <NumberFormat
                    value={detail.revenue}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$ "}
                  />
                </p>
                <h3>Ortalama Puan</h3>
                <p style={{ fontSize: "16px", fontFamily: "arial" }}>
                  {detail.vote_average}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Movie;
