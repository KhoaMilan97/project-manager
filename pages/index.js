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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FilterListIcon from "@material-ui/icons/FilterList";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

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
      "Custom Software",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "Web Application",
      "10-100",
      "$1250",
      true
    ),
    createData(
      "Bailu",
      "02/13/19",
      "Custom Software",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "Web Application",
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

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container direction="column">
        <Grid item style={{ marginTop: "2em", marginLeft: "5em" }}>
          <Typography variant="h1">Project</Typography>
        </Grid>
        <Grid item>
          <TextFiled
            style={{ width: "35em", marginLeft: "5em" }}
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
        <Grid item style={{ marginLeft: "5em", marginTop: "2em" }}>
          <FormGroup row>
            <FormControlLabel
              style={{ marginRight: "5em" }}
              label="Websites"
              control={
                <Switch
                  checked={websiteChecked}
                  onChange={() => setWebsiteChecked(!websiteChecked)}
                  color="primary"
                />
              }
              labelPlacement="start"
            />
            <FormControlLabel
              style={{ marginRight: "5em" }}
              label="iOS Apps"
              control={
                <Switch
                  checked={iOSChecked}
                  onChange={() => setIOSChecked(!iOSChecked)}
                  color="primary"
                />
              }
              labelPlacement="start"
            />
            <FormControlLabel
              style={{ marginRight: "5em" }}
              label="Anroid Apps"
              control={
                <Switch
                  checked={androidChecked}
                  onChange={() => setAndroidChecked(!androidChecked)}
                  color="primary"
                />
              }
              labelPlacement="start"
            />
            <FormControlLabel
              label="Custom Software"
              control={
                <Switch
                  checked={softwareChecked}
                  onChange={() => setSoftwareChecked(!softwareChecked)}
                  color="primary"
                />
              }
              labelPlacement="start"
            />
          </FormGroup>
        </Grid>

        <Grid item style={{ marginTop: "5em", marginBottom: "15em" }}>
          <EnhancedTable
            rows={rows}
            setRows={setRows}
            page={page}
            setPage={setPage}
          />
        </Grid>
        <Dialog
          // style={{ zIndex: 1302 }}
          fullWidth
          maxWidth="md"
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        >
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h1">Add a new project</Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container justify="space-between">
              <Grid item>
                <Grid item container direction="column" sm>
                  <Grid item>
                    <TextFiled
                      label="Name"
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    style={{ marginTop: "5em" }}
                  >
                    <Grid item>
                      <Typography variant="h4">Service</Typography>
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
                  <Grid item style={{ marginTop: "5em" }}>
                    <Select
                      labelId="platforms"
                      id="platforms"
                      multiple
                      style={{ width: "12em" }}
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
                <Grid item container direction="column" sm alignItems="center">
                  <Grid item>
                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      value={date}
                      onChange={setDate}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      direction="column"
                      style={{ marginTop: "5em" }}
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
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  sm
                  alignItems="flex-end"
                >
                  <Grid item>
                    <TextFiled
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
                    <Grid
                      item
                      container
                      direction="column"
                      style={{ marginTop: "5em" }}
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
                  </Grid>
                </Grid>
                <Grid item style={{ marginTop: "5em" }}>
                  <Select
                    labelId="features"
                    id="features"
                    multiple
                    MenuProps={{ style: { zIndex: 1302 } }}
                    style={{ width: "12em" }}
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
            <Grid container justify="center" style={{ marginTop: "3em" }}>
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
//205
