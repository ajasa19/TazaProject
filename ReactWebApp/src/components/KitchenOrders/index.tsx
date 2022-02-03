import React from "react";
import Axios from "axios";

import KitchenTable from "./KitchenOrdersTable";

//MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
                "& .super-app-theme--PICKUP": {
                    backgroundColor: getBackgroundColor(theme.palette.success.main),
                    "&:hover": {
                        backgroundColor: getHoverBackgroundColor(
                            theme.palette.success.main
                        ),
                    },
                },
                "& .super-app-theme--MOVING": {
                    backgroundColor: getBackgroundColor(theme.palette.success.main),
                    "&:hover": {
                        backgroundColor: getHoverBackgroundColor(
                            theme.palette.success.main
                        ),
                    },
                },
                "& .super-app-theme--UNREGISTERED": {
                    backgroundColor: getBackgroundColor(theme.palette.error.main),
                    "&:hover": {
                        backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
                    },
                },
                "& .super-app-theme--COOKING": {
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

const Admin = () => {
    const classes = useStyles();
    const [isAdmin, setIsAdmin] = React.useState(false);

    React.useEffect(() => {
        var tempIdString = localStorage.getItem("profileId");
        var profileId;
        if (tempIdString) profileId = JSON.parse(tempIdString || "");

        Axios.get<any>("http://localhost:3001/profile/getIsKitchen", {
            params: {
                profileId: profileId,
            },
        }).then((response) => {
            setIsAdmin(response.data.isAdmin);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isAdmin) {
        return (
            <Box m={2} className={classes.root}>
                <Typography gutterBottom variant="h3" component="div">
                    Orders to process
                </Typography>
                <Divider />
               
                <KitchenTable />

            </Box>
        );
    } else {
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
