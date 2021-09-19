import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      // minHeight: "250px",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    heading:{
      backgroundColor: "#ff9999",
      fontSize: "1rem",
      textAlign: "center",
      padding: "8px",
      boxSizing: "border-box",
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
  
  export const useStyles2 = makeStyles((theme) => ({
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
  export const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };