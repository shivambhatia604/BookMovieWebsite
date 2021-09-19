import React, { useEffect, useState } from "react";
import "./Home.css";
import { Header } from "../../common/header/Header";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // minHeight: "250px",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: "nowrap",
    // minHeight: "250px",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  imageListItem: {
    minHeight: "250px",
    maxWidth: "16.6%",
  },
  title: {
    color: "white",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

const useStyles2 = makeStyles((theme) => ({
  root: {
    display: "flex",
    //   flexWrap: 'wrap',
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: "76%",
    //   height: 450,
  },
  imageListItem: {
    maxWidth: "25%",
    minHeight: 350,
    "&:hover": {
      cursor: "pointer",
    },
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  card: {
    width: "24%",
  },
  title: {
    fontSize: 14,
    color: theme.palette.primary.light,
  },
  form: {
    margin: theme.spacing(1),

    // width: '35ch',
  },
  txtfld: {
    width: "80%",
  },
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 120,
    // maxWidth: 300,
    width: "75%",
  },
  date: {
    marginLeft: "8px",
  },
  btn: {
    display: "flex",
    justifyContent: "center",
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Home = ({ baseUrl }) => {
  const [movieList, setMovieList] = useState([]);
  const [filtermovieList, setfilterMovieList] = useState([]);
  useEffect(() => {
    fetch(baseUrl + "movies?page=1&limit=20")
      .then((res) => res.json())
      .then((obj) => {
        setMovieList(obj.movies);
        setfilterMovieList(obj.movies);
      });
    fetch(baseUrl + "genres")
      .then((res) => res.json())
      .then((obj) => setGenre(obj.genres));

    fetch(baseUrl + "artists?page=1&limit=20")
      .then((res) => res.json())
      .then((obj) => setArtist(obj.artists));
  }, []);

  const classes = useStyles();
  const classes2 = useStyles2();

  const [genre, setGenre] = useState([]);
  const [artist, setArtist] = useState([]);
  const [genresNameValue, setGenresNameValue] = useState([]);
  const [artistNameValue, setArtistNameValue] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const handleChange = (event) => {
    setGenresNameValue(event.target.value);
  };
  const handleChange2 = (event) => {
    setArtistNameValue(event.target.value);
  };

  const [selectedDateStart, setSelectedDateStart] = useState(
    new Date("1950-01-18T21:11:54")
  );
  const [selectedDateEnd, setSelectedDateEnd] = useState(
    new Date("2020-01-18T21:11:54")
  );
  const handleDateChangeStart = (date) => {
    setSelectedDateStart(date);
  };
  const handleDateChangeEnd = (date) => {
    setSelectedDateEnd(date);
  };
  const handleNameChange = (e) => {
    setNameFilter(e.target.value);
  };
  const handleFilterApply = () => {
    let newFilteredList = movieList.filter((item) => {
      let flag = true;
      if (nameFilter !== "" && !item.title.toLowerCase().includes(nameFilter)) {
        return false;
      }

      if (genresNameValue.length !== 0) {
        let genresString = item.genres.toString();

        function check(genresStr, genresNameValue) {
          for (let i = 0; i < genresNameValue.length; i++) {
            if (!genresStr.includes(genresNameValue[i])) {
              return false;
            }
          }
          return true;
        }
        flag = check(genresString, genresNameValue);
        if (flag === false) {
          return false;
        }
      }

      if (artistNameValue.length !== 0) {
        let artistArray = item.artists;

        if (artistArray !== null) {
          let artistFullNameArray = artistArray.map(
            (itm) => `${itm.first_name} ${itm.last_name}`
          );
          let artistFullNameArrayString = artistFullNameArray.toString();

          function check(artistStr, artistNameValue) {
            for (let i = 0; i < artistNameValue.length; i++) {
              if (!artistStr.includes(artistNameValue[i])) {
                return false;
              }
            }
            return true;
          }
          flag = check(artistFullNameArrayString, artistNameValue);
          if (flag === false) {
            return false;
          }
        }
      }

      if(!(new Date(item.release_date)>selectedDateStart&&new Date(item.release_date)<selectedDateEnd)){
          return false;
      }

      return flag;
    });

    setfilterMovieList(newFilteredList);
  };
  return (
    <div>
      <Header />
      <div className="heading">Upcoming Movies</div>
      <div className={classes.root}>
        <ImageList className={classes.imageList} cols={2.5}>
          {movieList
            .filter((item) => item.status === "PUBLISHED")
            .map((item) => (
              <ImageListItem key={item.id} className={classes.imageListItem}>
                <img
                  style={{ objectFit: "contain" }}
                  src={item.poster_url}
                  alt={item.title}
                />
                <ImageListItemBar
                  title={item.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </ImageListItem>
            ))}
        </ImageList>
      </div>

      <div className={classes2.root}>
        <ImageList
          rowHeight={180}
          className={classes2.imageList}
          style={{ margin: "16px" }}
        >
          {filtermovieList
            .filter((item) => item.status === "RELEASED")
            .map((item) => (
              <ImageListItem key={item.id} className={classes2.imageListItem}>
                <img src={item.poster_url} alt={item.title} />
                <ImageListItemBar
                  title={item.title}
                  subtitle={<span>Release Date: {item.release_date}</span>}
                />
              </ImageListItem>
            ))}
        </ImageList>

        <Card className={classes2.card}>
          <CardContent>
            <Typography className={classes2.title} gutterBottom>
              FIND MOVIES BY:
            </Typography>
          </CardContent>
          <form className={classes2.form} noValidate autoComplete="off">
            <TextField
              id="standard-basic"
              label="Movie Name"
              className={classes2.txtfld}
              onChange={handleNameChange}
              value={nameFilter}
            />
          </form>
          {/* {console.log(genresNameValue)} */}
          {console.log(artistNameValue)}
          <FormControl className={classes2.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Genres</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={genresNameValue}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {genre.map((name) => (
                <MenuItem key={name.id} value={name.genre}>
                  <Checkbox
                    checked={genresNameValue.indexOf(name.genre) > -1}
                  />
                  <ListItemText primary={name.genre} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes2.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Artists</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={artistNameValue}
              onChange={handleChange2}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {artist.map((name) => (
                <MenuItem
                  key={name.id}
                  value={`${name.first_name} ${name.last_name}`}
                >
                  <Checkbox
                    checked={
                      artistNameValue.indexOf(
                        `${name.first_name} ${name.last_name}`
                      ) > -1
                    }
                  />
                  <ListItemText
                    primary={`${name.first_name} ${name.last_name}`}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container className={classes2.date}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDateStart}
                onChange={handleDateChangeStart}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />

              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="date-picker-inline2"
                label="Date picker inline"
                value={selectedDateEnd}
                onChange={handleDateChangeEnd}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <div className={classes2.btn}>
            <Button
              onClick={handleFilterApply}
              variant="contained"
              color="primary"
            >
              Apply
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Home;
