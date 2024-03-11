import * as React from "react";
import "./App.css";
import ButtonAppBar from "./AppBar";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, Button } from "@mui/material";
import UserNotes from "./Notes";
import AllNotes from "./AllNotes";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <ButtonAppBar />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "100vh",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="My Notes" {...a11yProps(0)} />
          <Tab label="All Notes" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>         
          <UserNotes />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AllNotes />
        </TabPanel>
      </Box>
    </div>
  );
}

export default App;
