import { Box, CircularProgress, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <CircularProgress/>
      <Typography variant="h6" mt={2}>Loading...</Typography>
    </Box>
  );
};

export default Loading;
