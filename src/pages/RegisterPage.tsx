import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  {/* TODO: Lembre-se de fazer toda a parte de lógica de registro. */}
  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flex={1} height="100%" bgcolor="#f5f5f5">
      <Box component="form" onSubmit={handleSubmit} bgcolor="white" p={4} borderRadius={2} boxShadow={3} minWidth={350}>
        <Stack spacing={3}>
          {/* TODO: Lembre-se de fazer toda parte de validations e required fields */}
          <Typography variant="h5" align="center">Register</Typography>
          <TextField label="Username" variant="outlined" fullWidth value={username} onChange={(e) => setUsername(e.target.value)}/>
          <TextField label="Display Name" variant="outlined" fullWidth value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
          <TextField label="Email" type="email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)}/>
          <TextField label="Password" type="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default RegisterPage;
