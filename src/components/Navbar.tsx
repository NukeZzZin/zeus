import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <AppBar className="select-none" position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">portfólio • prometheus</Typography>
        <Box>
          <Button color="inherit" component={Link} to="/create">Create</Button>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/register">Register</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
