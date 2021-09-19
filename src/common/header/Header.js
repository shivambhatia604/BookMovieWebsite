import React from "react";
import "./Header.css";
import Logo from "../../assets/logo.svg";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    button:{
        marginRight:theme.spacing(1),
    }
  }));

export const Header = () => {
    const classes = useStyles();

  return (
    <div className="header">
      <img className="svgimg" src={Logo} alt="" />
      <div>
      <Button className={classes.button}variant="contained" color="primary">
          BOOk SHOW
        </Button>
        <Button variant="contained">LOGIN</Button>
        
      </div>
    </div>
  );
};
