import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Box, TextField, Button, Typography, Stack, Alert, CircularProgress } from "@mui/material";
import { routes } from "@utils/endpoint";
import type { CreatePostType } from "@utils/endpoint";

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!title) errs.push("Title is required.");
    if (!content) errs.push("Content is required.");
    return errs;
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    setSuccess(null);

    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const payload: CreatePostType = { title: title, content: content };
    const result = await routes.posts.create(payload);
    setLoading(false);

    if (result.success) {
      setSuccess("Post created successfully!");
      console.log(result.data?.post_id);
      setTimeout(() => {
        navigate(`/posts/${result.data?.post_id}`);
      }, 1200);
    } else {
      setErrors(result.errors.map((err) => err.message));
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" flex={1} minHeight="100vh" bgcolor="#f5f5f5" p={4}>
      <Box component="form" onSubmit={handleSubmit} bgcolor="white" p={4} borderRadius={2} boxShadow={3} minWidth={350} maxWidth={600} width="100%">
        <Stack spacing={3}>
          <Typography variant="h5" align="center">Create Post</Typography>
          {errors.length > 0 && <Alert severity="error">{errors.join(" ")}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            autoFocus
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            multiline
            minRows={4}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Create"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CreatePostPage;
