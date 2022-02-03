import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import TazaLogo from "./taza.png";
import EditLocationIcon from "@mui/icons-material/EditLocation";

import AppDrawer from "./AppDrawer";

import { BrowserRouter as Router, withRouter } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";

import Axios from "axios";

//import DeliveryAddressButton from './DeliveryAddressButton';

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

const Search = styled("div")(({ theme }) => ({
  borderColor: "white",
  borderStyle: "solid",
  borderWidth: "1px",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "65%",
  flexGrow: 2,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
interface Profile {
  id: number;
  userName: string;
}

const Header = (props) => {
  const [value, setValue] = React.useState<PlaceType | null>(null);
  const [isDiabled, setisDiabled] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("add address"); //To be changes to database call of users address
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const loaded = React.useRef(false);

  const { history } = props;

  const [open, setOpen] = React.useState(false); //Drawer opening state

  const [prevLocation, setPrevLocation] = React.useState("");
  const [profile, setprofile] = React.useState<Profile | null>();

  React.useEffect(() => {

    var tempIdString = localStorage.getItem("profileId");
    var profileId;
    if(tempIdString)
      profileId = JSON.parse(tempIdString || '');

    Axios.get<Profile>("http://localhost:3001/profile/getProfile", {
      params: {
        profileId: profileId,
      },
    }).then((response) => {
      setprofile(response.data[0]);
      //console.log(response.data[0].address);
      if(response.data[0].address)
        setInputValue(response.data[0].address);
    });
  }, []);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDil-3IWcSyAlxOT1PHnspDpYaFryxeA8Y&libraries=places",
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          );
        },
        200
      ),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const handleLinkClick = (pageURL) => {
    history.push(pageURL);
  };

  const handleClickOpen = () => {
    //console.log("location: " + inputValue)
    setPrevLocation(inputValue);

    if(inputValue === '' || !inputValue)
      setisDiabled(true);
    else
      setisDiabled(false);
    setOpen(true);
  };

  const handleClose = () => {
    setInputValue(prevLocation);
    setOpen(false);
  };
  const handleCloseSubmit = (event) => {
    if(inputValue !== ''){
      Axios.post("http://localhost:3001/profile/changeProfileAddress", {
          profileId: profile!.id,
          address: inputValue
      });
    }
    setOpen(false);
  };

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <AppDrawer {...props} />

            <img
              src={TazaLogo}
              alt="logo"
              height="30px"
              width="40px"
              style={{ marginLeft: 5 }}
              onClick={() => handleLinkClick("/")}
            ></img>

            <Button
              sx={{
                color: "white",
                flexGrow: 1,
                marginLeft: 5,
                marginRight: 5,
              }}
              size="large"
              startIcon={<EditLocationIcon />}
              onClick={handleClickOpen}
            >
              {inputValue}
            </Button>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>
                Would you like to change your Delivery Address?
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter your current delivery address.
                </DialogContentText>
                <Autocomplete
                  id="google-map"
                  sx={{ width: 300 }}
                  getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.description
                  }
                  filterOptions={(x) => x}
                  options={options}
                  autoComplete
                  includeInputInList
                  filterSelectedOptions
                  value={value}
                  onChange={(event: any, newValue: PlaceType | null) => { //Runs when a adress is selected in the menu
                    setOptions(newValue ? [newValue, ...options] : options); 
                    setValue(newValue);
                  }}
                  onInputChange={(event, newInputValue) => { //runs on each character typed in the textbox
                    if(newInputValue === '')
                      setisDiabled(true);
                    else
                      setisDiabled(false);
                    setInputValue(newInputValue);
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  renderOption={(props, option) => {
                    const matches =
                      option.structured_formatting.main_text_matched_substrings;
                    const parts = parse(
                      option.structured_formatting.main_text,
                      matches.map((match: any) => [
                        match.offset,
                        match.offset + match.length,
                      ])
                    );

                    return (
                      <li {...props}>
                        <Grid container alignItems="center">
                          <Grid item>
                            <Box
                              component={LocationOnIcon}
                              sx={{ color: "text.secondary", mr: 2 }}
                            />
                          </Grid>
                          <Grid item xs>
                            {parts.map((part, index) => (
                              <span
                                key={index}
                                style={{
                                  fontWeight: part.highlight ? 700 : 400,
                                }}
                              >
                                {part.text}
                              </span>
                            ))}
                            <Typography variant="body2" color="text.secondary">
                              {option.structured_formatting.secondary_text}
                            </Typography>
                          </Grid>
                        </Grid>
                      </li>
                    );
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCloseSubmit} disabled={isDiabled}>Submit</Button>
              </DialogActions>
            </Dialog>

            <Search>
              <SearchIconWrapper sx={{ color: "white" }}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Button
              sx={{ color: "white" }}
              size="large"
              startIcon={<AccountCircleIcon />}
              onClick={() => handleLinkClick("/profile")}
            >
              {profile && profile!.userName}
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />{" "}
        {/* Keep empty toolbar, adjust body height from under app bar*/}
      </Box>
    </Router>
  );
};

export default withRouter(Header);
