import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { format } from "date-fns";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextFiled from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from "@material-ui/icons/Add";
import {
  Switch,
  FormGroup,
  FormControlLabel,
  Dialog,
  DialogContent,
  MenuItem,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";

import EnhancedTable from "../src/ui/EnhancedTable";

const useStyles = makeStyles((theme) => ({
  service: {
    fontWeight: 300,
  },
  users: {
    marginRight: 0,
  },
  button: {
    color: "#fff",
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

const createData = (
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total,
  search
) => ({
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total,
  search,
});

function ProjectManager() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [rows, setRows] = useState([
    createData(
      "Zachary Reece",
      "11/02/2019",
      "Website",
      "E-Commerce",
      "N/A",
      "N/A",
      "N/A",
      "$1500",
      true
    ),
    createData(
      "Bill Gates",
      "10/17/19",
      "Custom Software",
      "GPS, Push Notifications, Users/Authentication, File Transfer",
      "Medium",
      "Web Application",
      "0-10",
      "$1600",
      true
    ),
    createData(
      "Steve Jobs",
      "02/13/19",
      "Custom Software",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "Web Application",
      "10-100",
      "$1250",
      true
    ),
    createData(
      "Khoa Milan",
      "02/13/19",
      "Mobile App",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "iOS, Android",
      "10-100",
      "$1250",
      true
    ),
    createData(
      "Bailu",
      "02/13/19",
      "Mobile App",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "Android",
      "10-100",
      "$1250",
      true
    ),
  ]);

  const platformsOptions = ["Web", "iOS", "Android"];
  let featuresOptions = [
    "Photo/Video",
    "GPS",
    "File Transfer",
    "Users/Authentication",
    "Biometrics",
    "Push Notifications",
  ];

  const websitesOptions = ["Basic", "Interactive", "E-Commerce"];

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setIOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState("");
  const [service, setService] = useState("");
  const [complexity, setComplexity] = useState("");
  const [users, setUsers] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);

  const [page, setPage] = React.useState(0);

  const [searchValue, setSearchValue] = useState("");

  const addProject = () => {
    setRows([
      ...rows,
      createData(
        name,
        format(date, "MM/dd/yy"),
        service,
        features.join(", "),
        service === "Website" ? "N/A" : complexity,
        service === "Website" ? "N/A" : platforms.join(","),
        service === "Website" ? "N/A" : users,
        `$${total}`,
        true
      ),
    ]);
    setDialogOpen(false);
    setName("");
    setDate(new Date());
    setService("");
    setFeatures([]);
    setComplexity("");
    setPlatforms([]);
    setUsers("");
    setTotal("");
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);

    const rowData = rows.map((row) =>
      Object.values(row).filter((option) => option !== true && option !== false)
    );

    const matches = rowData.map((row) =>
      row.map((option) =>
        option.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    const newRows = [...rows];
    matches.map((row, index) =>
      row.includes(true)
        ? (newRows[index].search = true)
        : (newRows[index].search = false)
    );

    setRows(newRows);
    setPage(0);
  };

  const serviceQuestions = (
    <Grid
      item
      container
      direction="column"
      style={{ marginTop: matchesSM ? 50 : "5em" }}
      alignItems={matchesSM ? "center" : undefined}
    >
      <Grid item>
        <Typography variant="h4" align={matchesSM ? "left" : undefined}>
          Service
        </Typography>
      </Grid>
      <Grid item>
        <RadioGroup
          value={service}
          onChange={(e) => {
            setService(e.target.value);
            setFeatures([]);
          }}
          aria-label="service"
          name="service"
        >
          <FormControlLabel
            classes={{ label: classes.service }}
            value="Website"
            control={<Radio />}
            label="Website"
          />
          <FormControlLabel
            classes={{ label: classes.service }}
            value="Mobile App"
            control={<Radio />}
            label="Mobile App"
          />
          <FormControlLabel
            classes={{ label: classes.service }}
            value="Custom Software"
            control={<Radio />}
            label="Custom Software"
          />
        </RadioGroup>
      </Grid>
    </Grid>
  );

  const userQuestions = (
    <Grid
      item
      container
      direction="column"
      style={{ marginTop: matchesSM ? 50 : "5em" }}
      alignItems={matchesSM ? "center" : undefined}
    >
      <Grid item>
        <Typography variant="h4">Users</Typography>
      </Grid>
      <Grid item>
        <RadioGroup
          value={users}
          onChange={(e) => setUsers(e.target.value)}
          aria-label="users"
          name="users"
        >
          <FormControlLabel
            disabled={service === "Website"}
            classes={{
              label: classes.service,
              root: classes.users,
            }}
            value="0-10"
            control={<Radio />}
            label="0-10"
          />
          <FormControlLabel
            disabled={service === "Website"}
            classes={{
              label: classes.service,
              root: classes.users,
            }}
            value="10-100"
            control={<Radio />}
            label="10-100"
          />
          <FormControlLabel
            disabled={service === "Website"}
            classes={{
              label: classes.service,
              root: classes.users,
            }}
            value="100+"
            control={<Radio />}
            label="100+"
          />
        </RadioGroup>
      </Grid>
    </Grid>
  );

  const complexityQuestions = (
    <Grid
      item
      container
      direction="column"
      style={{ marginTop: matchesSM ? 50 : "5em" }}
      alignItems={matchesSM ? "center" : undefined}
    >
      <Grid item>
        <Typography variant="h4">Complexity</Typography>
      </Grid>
      <Grid item>
        <RadioGroup
          value={complexity}
          onChange={(e) => setComplexity(e.target.value)}
          aria-label="complexity"
          name="complexity"
        >
          <FormControlLabel
            disabled={service === "Website"}
            classes={{ label: classes.service }}
            value="Low"
            control={<Radio />}
            label="Low"
          />
          <FormControlLabel
            disabled={service === "Website"}
            classes={{ label: classes.service }}
            value="Medium"
            control={<Radio />}
            label="Medium"
          />
          <FormControlLabel
            disabled={service === "Website"}
            classes={{ label: classes.service }}
            value="High"
            control={<Radio />}
            label="High"
          />
        </RadioGroup>
      </Grid>
    </Grid>
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid
        container
        direction="column"
        alignItems={matchesMD ? "center" : undefined}
      >
        <Grid
          item
          style={{ marginTop: "2em", marginLeft: matchesSM ? 0 : "5em" }}
        >
          <Typography variant="h1">Project</Typography>
        </Grid>
        <Grid item>
          <TextFiled
            style={{
              width: matchesSM ? "25em" : "35em",
              marginLeft: matchesSM ? 0 : "5em",
            }}
            value={searchValue}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ cursor: "pointer" }}
                  onClick={() => setDialogOpen(true)}
                >
                  <AddIcon color="primary" style={{ fontSize: 30 }} />
                </InputAdornment>
              ),
            }}
            placeholder="Search project details or create a new entry."
          />
        </Grid>
        <Grid
          item
          style={{ marginLeft: matchesSM ? 0 : "5em", marginTop: "2em" }}
        >
          <FormGroup row>
            <Grid container direction={matchesSM ? "column" : "row"}>
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  label="Websites"
                  control={
                    <Switch
                      checked={websiteChecked}
                      onChange={() => setWebsiteChecked(!websiteChecked)}
                      color="primary"
                    />
                  }
                  labelPlacement={matchesMD ? "end" : "start"}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  label="iOS Apps"
                  control={
                    <Switch
                      checked={iOSChecked}
                      onChange={() => setIOSChecked(!iOSChecked)}
                      color="primary"
                    />
                  }
                  labelPlacement={matchesMD ? "end" : "start"}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  label="Anroid Apps"
                  control={
                    <Switch
                      checked={androidChecked}
                      onChange={() => setAndroidChecked(!androidChecked)}
                      color="primary"
                    />
                  }
                  labelPlacement={matchesMD ? "end" : "start"}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  label="Custom Software"
                  control={
                    <Switch
                      checked={softwareChecked}
                      onChange={() => setSoftwareChecked(!softwareChecked)}
                      color="primary"
                    />
                  }
                  labelPlacement={matchesMD ? "end" : "start"}
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>

        <Grid
          item
          style={{ width: "100%", marginTop: "5em", marginBottom: "35em" }}
        >
          <EnhancedTable
            rows={rows}
            setRows={setRows}
            page={page}
            setPage={setPage}
            websiteChecked={websiteChecked}
            iOSChecked={iOSChecked}
            androidChecked={androidChecked}
            softwareChecked={softwareChecked}
          />
        </Grid>
        <Dialog
          style={{ zIndex: 1302 }}
          fullWidth
          maxWidth="md"
          open={dialogOpen}
          fullScreen={matchesSM}
          onClose={() => setDialogOpen(false)}
        >
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h1">Add a new project</Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid
              container
              justify="space-between"
              direction={matchesSM ? "column" : "row"}
              alignItems={matchesSM ? "center" : undefined}
            >
              <Grid item>
                <Grid item container direction="column" sm>
                  <Hidden mdUp>{serviceQuestions}</Hidden>
                  <Hidden mdUp>{userQuestions}</Hidden>
                  <Hidden mdUp>{complexityQuestions}</Hidden>

                  <Grid item style={{ marginTop: matchesSM ? 50 : 0 }}>
                    <TextFiled
                      label="Name"
                      id="name"
                      value={name}
                      style={{ width: matchesSM ? 250 : undefined }}
                      fullWidth={!matchesSM}
                      onChange={(event) => setName(event.target.value)}
                    />
                    <Hidden smDown>{serviceQuestions}</Hidden>
                  </Grid>

                  <Grid item style={{ marginTop: matchesSM ? 50 : "5em" }}>
                    <Select
                      labelId="platforms"
                      id="platforms"
                      multiple
                      style={{ width: matchesSM ? 250 : "12em" }}
                      displayEmpty
                      disabled={service === "Website"}
                      renderValue={
                        platforms.length > 0 ? undefined : () => "Platforms"
                      }
                      value={platforms}
                      onChange={(e) => setPlatforms(e.target.value)}
                    >
                      {platformsOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{ marginTop: 16 }}>
                <Grid
                  item
                  container
                  direction="column"
                  sm
                  alignItems="center"
                  style={{ marginTop: matchesSM ? 50 : 0 }}
                >
                  <Grid item>
                    <KeyboardDatePicker
                      style={{
                        width: matchesSM ? 250 : undefined,
                        zIndex: 1303,
                      }}
                      format="MM/dd/yyyy"
                      value={date}
                      onChange={setDate}
                    />
                  </Grid>
                  <Grid item>
                    <Hidden smDown>{complexityQuestions}</Hidden>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{ marginTop: matchesSM ? 50 : 0 }}>
                <Grid
                  item
                  container
                  direction="column"
                  sm
                  alignItems={matchesSM ? "center" : "flex-end"}
                >
                  <Grid item>
                    <TextFiled
                      style={{ width: matchesSM ? 250 : undefined }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      label="Total"
                      id="toal"
                      value={total}
                      onChange={(event) => setTotal(event.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Hidden smDown>{userQuestions}</Hidden>
                  </Grid>
                </Grid>
                <Grid item style={{ marginTop: matchesSM ? 50 : "5em" }}>
                  <Select
                    labelId="features"
                    id="features"
                    multiple
                    MenuProps={{ style: { zIndex: 1302 } }}
                    style={{ width: matchesSM ? 250 : "12em" }}
                    displayEmpty
                    renderValue={
                      features.length > 0 ? undefined : () => "Features"
                    }
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                  >
                    {service === "Website"
                      ? (featuresOptions = websitesOptions)
                      : null}
                    {featuresOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              style={{ marginTop: matchesSM ? 50 : "3em" }}
            >
              <Grid item>
                <Button
                  onClick={() => setDialogOpen(false)}
                  color="primary"
                  style={{ fontWeight: 300 }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={addProject}
                  variant="contained"
                  className={classes.button}
                  disabled={
                    service === "Website"
                      ? name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        features.length > 1
                      : name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        complexity.length === 0 ||
                        platforms.length === 0 ||
                        users.length === 0 ||
                        service.length === 0
                  }
                >
                  Add Project +
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default ProjectManager;
//216
