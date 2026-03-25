import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router";

import { useIsLoggedIn } from "@stores/auth_store";

const Navbar = () => {
  const isLoggedIn = useIsLoggedIn();
  return (
    <AppBar className="select-none" position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography fontFamily="bold" variant="h6">portfólio • prometheus</Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          {isLoggedIn && (
            <React.Fragment>
              <Button color="inherit" component={Link} to="/create">Create</Button>
              <Button color="inherit" component={Link} to="/logout">Logout</Button>
            </React.Fragment>
          )}
          {!isLoggedIn && (
            <React.Fragment>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </React.Fragment>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
