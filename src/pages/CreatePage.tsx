import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  {/* TODO: Lembre-se de fazer toda a parte de lógica da criação de posts. */}
  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flex={1} height="100%" bgcolor="#f5f5f5">
      <Box component="form" onSubmit={handleSubmit} bgcolor="white" p={4} borderRadius={2} boxShadow={3} minWidth={400}>
        <Stack spacing={3}>
          {/* TODO: Lembre-se de fazer toda parte de validations e required fields */}
          <Typography variant="h5" align="center">Create Post</Typography>
          <TextField label="Title" variant="outlined" fullWidth value={title} onChange={(e) => setTitle(e.target.value)}/>
          <TextField label="Content" variant="outlined" fullWidth multiline rows={5} value={content} onChange={(e) => setContent(e.target.value)}/>
          <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CreatePage;
