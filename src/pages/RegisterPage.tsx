import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Box, TextField, Button, Typography, Stack, Alert } from "@mui/material";
import useAuthStore, { useIsLoggedIn } from "@stores/auth_store";
import { routes } from "@utils/endpoint";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const setTokenTuple = useAuthStore((state) => state.setTokenTuple);

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!username.trim()) errs.push("Username is required.");
    if (!displayName.trim()) errs.push("Display Name is required.");
    if (!email.trim()) errs.push("Email is required.");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push("Email is invalid.");
    if (!password) errs.push("Password is required.");
    else if (password.length < 6) errs.push("Password must be at least 6 characters.");
    return errs;
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    const result = await routes.auth.register({
      username: username.trim(),
      display_name: displayName.trim(),
      email: email.trim(),
      password
    });
    setLoading(false);
    if (!result.success) {
      setErrors(result.errors.map((err) => err.message));
      return;
    }
    if (result.data) setTokenTuple(result.data.access_token, result.data.refresh_token);
    navigate("/");
  };

  if (useIsLoggedIn()) return <Navigate to="/" replace/>;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flex={1} height="100%" bgcolor="#f5f5f5">
      <Box component="form" onSubmit={handleSubmit} bgcolor="white" p={4} borderRadius={2} boxShadow={3} minWidth={350}>
        <Stack spacing={3}>
          <Typography variant="h5" align="center">Register</Typography>
          {errors.length > 0 && <Alert severity="error">{errors.join(" ")}</Alert>}
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            autoFocus
          />
          <TextField
            label="Display Name"
            variant="outlined"
            fullWidth
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            helperText="At least 6 characters"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default RegisterPage;
