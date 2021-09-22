import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Header } from "../../common/header/Header";
import { Fragment } from "react";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {loginModal} from '../../common/Login Modal/loginModal';

const useStyles = makeStyles({
  root: {
    width: "100%",

    display: "flex",
  },
  divOne: {
    width: "20%",
  },
  divTwo: {
    width: "60%",
  },
  divThree: {
    width: "20%",
  },
  home: {
    margin: "8px 0px 0px 5px",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

export const Details = ({ baseUrl, match, history }) => {
  const [movieObj, setMovieObj] = useState({
    title: '',
    genres: [],
    rating: '',
    release_date: '',
    trailer_url: '',
    poster_url:'',
    storyline:'',
    wiki_url:'',
  });

  let newMovArrStr = movieObj.genres.join();

  let substrYoutube = movieObj.trailer_url.substring(32,movieObj.trailer_url.length);
  let embedSubstr = "https://www.youtube.com/"+"embed/"+substrYoutube;

  useEffect(() => {
    fetch(baseUrl + "movies/" + match.params.id)
      .then((res) => res.json())
      .then((obj) => {
        setMovieObj(obj)
        // setNewMovArrStr(obj.genres.join())
      });
  }, []);

  const [starOne, setStarOne] = useState(false);

  const classes = useStyles();
  return (
    <Fragment>
      <Header detailsPage/>
      <div className={classes.home} onClick={()=>history.push("/")}>Back to Home</div>
      <div className={classes.root}>
        <div className={classes.divOne}>
          <div
            style={{
              backgroundImage: `url(${movieObj.poster_url})`,
              width: "200px",
              height: "320px",
              marginLeft: "5px",
              backgroundRepeat: "no-repeat",
            }}
          >
            {" "}
            hey
          </div>
        </div>
        <div className={classes.divTwo}>
          <Typography variant="h6" component="h2" gutterBottom>
            {movieObj.title}
          </Typography>
          <Typography variant="h6" display="block" gutterBottom>
            <span style={{ fontWeight: "bold" }}>Genres:</span> {newMovArrStr}
          </Typography>
          <Typography variant="h6" display="block" gutterBottom>
            <span style={{ fontWeight: "bold" }}>Release Date:</span>{" "}
            {movieObj.release_date}
          </Typography>
          <Typography variant="h6" display="block" gutterBottom>
            <span style={{ fontWeight: "bold" }}>Rating:</span>{" "}
            {movieObj.rating}
          </Typography>
          <Typography
            style={{ marginTop: "16px" }}
            variant="h6"
            display="block"
            gutterBottom
          >
            <span style={{ fontWeight: "bold" }}>
              Plot:<a href={movieObj.wiki_url}>(Wiki Link)</a>
            </span>{" "}
            {movieObj.storyline}
          </Typography>
          <Typography
            style={{ marginTop: "16px" }}
            variant="h6"
            display="block"
            gutterBottom
          >
            <div style={{ fontWeight: "bold" }}>Trailer:</div>
            {/* {console.log(movieObj.trailer_url)}
            {console.log("https://www.youtube.com/"+"embed/"+substrYoutube)} */}
             {movieObj.trailer_url?<iframe title="Inline Frame Example" width="720" height="315" src={embedSubstr}></iframe>:null} 
            
          </Typography>
        </div>
        <div className={classes.divThree}>
        <Typography variant="h6" display="block" gutterBottom>
            <span style={{ fontWeight: "bold" }}>Rate this movie:</span> 
          </Typography>
          <StarBorderIcon style={starOne? {color: "yellow"}: {color: "black"} } /> <StarBorderIcon style={starOne? {color: "yellow"}: {color: "black"} }/> <StarBorderIcon style={starOne? {color: "yellow"}: {color: "black"} }/> <StarBorderIcon style={starOne? {color: "yellow"}: {color: "black"} }/> <StarBorderIcon style={starOne? {color: "yellow"}: {color: "black"} }/>
        </div>
      </div>
      
    </Fragment>
  );
};
