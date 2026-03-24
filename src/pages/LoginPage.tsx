import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  {/* TODO: Lembre-se de fazer toda a parte de lógica de login. */}
  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flex={1} height="100%" bgcolor="#f5f5f5">
      <Box component="form" onSubmit={handleSubmit} bgcolor="white" p={4} borderRadius={2} boxShadow={3} minWidth={300}>
        <Stack spacing={3}>
          {/* TODO: Lembre-se de fazer toda parte de validations e required fields */}
          <Typography variant="h5" align="center">Login</Typography>
          <TextField label="Username or Email" variant="outlined" fullWidth value={identifier} onChange={(e) => setIdentifier(e.target.value)}/>
          <TextField label="Password" variant="outlined" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginPage;
