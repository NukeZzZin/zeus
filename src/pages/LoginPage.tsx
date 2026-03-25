import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Box, TextField, Button, Typography, Stack, Alert } from "@mui/material";
import useAuthStore, { useIsLoggedIn } from "@stores/auth_store";
import { routes } from "@utils/endpoint";

const LoginPage = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const setTokenTuple = useAuthStore((state) => state.setTokenTuple);

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!identifier.trim()) errs.push("Username or Email is required.");
    if (!password) errs.push("Password is required.");
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
    const result = await routes.auth.login({ identifier, password });
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
      <Box component="form" onSubmit={handleSubmit} bgcolor="white" p={4} borderRadius={2} boxShadow={3} minWidth={300}>
        <Stack spacing={3}>
          <Typography variant="h5" align="center">Login</Typography>
          {errors.length > 0 && <Alert severity="error">{errors.join(" ")}</Alert>}
          <TextField
            label="Username or Email"
            variant="outlined"
            fullWidth
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            required
            autoFocus
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginPage;
