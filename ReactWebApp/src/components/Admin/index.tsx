import React from "react";
import Axios from "axios";

import KitchenTable from "./KitchenTable";
import DriverTable from "./DriverTable";
import ProfileTable from "./ProfileTable";

//MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import { createTheme, darken, lighten } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) => {
    const getBackgroundColor = (color) =>
      theme.palette.mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

    const getHoverBackgroundColor = (color) =>
      theme.palette.mode === "dark" ? darken(color, 0.4) : lighten(color, 0.4);

    return {
      root: {
        "& .super-app-theme--APPROVED": {
          backgroundColor: getBackgroundColor(theme.palette.success.main),
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(
              theme.palette.success.main
            ),
          },
        },
        "& .super-app-theme--DENIED": {
          backgroundColor: getBackgroundColor(theme.palette.error.main),
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
          },
        },
        "& .super-app-theme--PENDING": {
          backgroundColor: getBackgroundColor(theme.palette.warning.main),
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(
              theme.palette.warning.main
            ),
          },
        },
      },
    };
  },
  { defaultTheme }
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Admin = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    var tempIdString = localStorage.getItem("profileId");
    var profileId;
    if (tempIdString) profileId = JSON.parse(tempIdString || "");

    Axios.get<any>("http://localhost:3001/profile/getIsAdmin", {
      params: {
        profileId: profileId,
      },
    }).then((response) => {
      setIsAdmin(response.data.isAdmin);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  if(isAdmin){
    return (
      <Box m={2} className={classes.root}>
        <Typography gutterBottom variant="h2" component="div">
          Administration
        </Typography>
        <Divider />
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Kitchens" />
          <Tab label="Drivers" />
          <Tab label="Profiles" />
        </Tabs>
        <Divider />
        <TabPanel value={value} index={0}>
          <KitchenTable {...props}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DriverTable {...props}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ProfileTable />
        </TabPanel>
      </Box>
    );
  }else{
    return (
      <Box m={2} className={classes.root}>
        <Typography gutterBottom variant="h5" component="div">
          Access Denied
        </Typography>
      </Box>
    );
  }
};

export default Admin;
